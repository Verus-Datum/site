<script lang="ts">
	import type { Business } from '$types/Business';
	import type { PageProps } from './$types';
	import { fly } from 'svelte/transition';
	import * as Carousel from '$components/ui/carousel';
    import * as Card from "$components/ui/card";
	import { type CarouselAPI } from '$components/ui/carousel/context';
	import { Badge } from '$components/ui/badge';
	import { formatCurrency } from '$utils/currency';
	import Button from '$components/ui/button/button.svelte';
	import type { Broker } from '$types/Broker';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import type { Listing } from '$models/Listing';
    import Building from "@lucide/svelte/icons/building-2"
    import Eye from "@lucide/svelte/icons/eye";
    import Calendar from "@lucide/svelte/icons/calendar";
    import Phone from '@lucide/svelte/icons/phone';
    import Mail from "@lucide/svelte/icons/mail";
    import User from '@lucide/svelte/icons/user';
    import Heart from "@lucide/svelte/icons/heart";
    import Share from "@lucide/svelte/icons/share-2";
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
    import TrendingUp from "@lucide/svelte/icons/trending-up";

	let { data }: PageProps = $props();

	let listing = $derived<Listing>(data.listing);
	// let broker = $derived<Broker>(listing.broker);
	let carouselAPI = $state<CarouselAPI>();
	let current = $state(0);

	$effect(() => {
		if (carouselAPI) {
			current = carouselAPI.selectedScrollSnap() + 1;
			carouselAPI.on('select', () => {
				current = carouselAPI!.selectedScrollSnap() + 1;
			});
		}
	});

	let images = [
		'https://www.upmenu.com/wp-content/uploads/2022/08/Small-Cafe-Interior-Design.jpg',
		'https://weadesign.com/wp-content/uploads/2024/01/office-interior-designs.webp',
		'https://www.avantisystemsusa.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-08-at-3.08.52-PM.png',
		'https://images.squarespace-cdn.com/content/v1/5d6d67f2387da800015dc00e/e242ea2f-e67f-4991-85bc-6c07b48bcc73/Jude_WetCoffee_-6.jpg',
		'https://www.blankcreatives.com.au/wp-content/uploads/2022/12/Wonderwood-cafe_09_WEB.jpg'
	];

    function formatMargin(profit: number, revenue: number): { text: string; color: string } {
		const margin = (profit / revenue) * 100;
		const rounded = margin.toFixed(1);
		const color = margin >= 0 ? 'text-green-600' : 'text-red-600';
        return { text: `${rounded}% margin`, color };
	}

	const { text: marginText, color: marginColor } = $derived(formatMargin(listing.profit_per_yr, listing.revenue_per_yr))
</script>

<main
	in:fly={{ y: 20, duration: 500 }}
	class="width mx-auto flex flex-col gap-8 mt-4 pb-12 px-4"
>
	<nav class="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex flex-row gap-4">
            <button onclick={() => history.back()} class="flex flex-row items-center gap-2 font-medium">
                <ArrowLeft size={16} />
            </button>
            <header>
                <h1 class="font-semibold">Business Details</h1>
                <h1 class="text-sm text-muted-foreground">{listing.name}</h1>
            </header>
        </div>
        <div class="flex flex-row gap-3 items-center">
            <button class="py-2 px-4 h-8 hover:bg-secondary/60 font-medium duration-200 flex flex-row gap-2 items-center bg-secondary border rounded-md text-xs">
                <Heart size={12} />
                Save
            </button>
            <button class="py-2 px-4 h-8 hover:bg-secondary/60 font-medium duration-200 flex flex-row gap-2 items-center bg-secondary border rounded-md text-xs">
                <Share size={12} />
                Share
            </button>
            <button>
                <Ellipsis size={16} />
            </button>
        </div>
	</nav>

    <section class="w-full flex flex-col lg:flex-row gap-6">
        <section class="w-full lg:w-[70%] relative flex flex-col gap-4 flex-shrink-0">
            <div class="w-full relative">
                <Badge variant="secondary" class="border shadow-md absolute z-50 top-4 right-8 h-6 border-border">
                    {images.length} Photos
                </Badge>
                <Carousel.Root setApi={(emblaApi) => (carouselAPI = emblaApi)}>
                    <Carousel.Content class="h-full ml-0 lg:-ml-4 rounded-lg w-full">
                        {#each images as img}
                            <Carousel.Item>
                                <Card.Root>
                                    <Card.Content class="flex aspect-video h-full items-center justify-center p-0">
                                        <img
                                            src={img}
                                            alt="Company"
                                            class="h-full w-full shrink-0 rounded-sm object-cover"
                                        />
                                    </Card.Content>
                                </Card.Root>
                            </Carousel.Item>
                        {/each}
                    </Carousel.Content>
                </Carousel.Root>
                <div class="w-full pr-8 absolute top-1/2 left-0 px-4 transform -translate-y-1/2 flex flex-row justify-between">
                    <Button
                        size="icon"
                        onclick={carouselAPI?.scrollPrev}
                        variant="outline"
                        class="rounded-full size-8 shadow-md hover:bg-muted">
                        <ArrowLeft />
                    </Button>
                    <Button
                        size="icon"
                        onclick={carouselAPI?.scrollNext}
                        variant="outline"
                        class="rounded-full size-8 shadow-md hover:bg-muted">
                        <ArrowRight />
                    </Button>
                </div>
            </div>

            <div class="w-full border rounded-lg p-5">
                <header class="flex flex-col md:flex-row justify-between gap-4">
                    <div class="flex-shrink-0">
                        <h1 class="text-2xl font-semibold flex flex-row items-center gap-3">
                            {listing.name}
                            {#if listing.status === 'sold'}
                                <Badge class="font-medium" variant="destructive">
                                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                </Badge>
                            {:else if listing.status === 'pending'}
                                <Badge class="bg-yellow-500 font-medium">
                                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                </Badge>
                            {:else if listing.status === 'off_market'}
                                <Badge class="font-medium opacity-50">
                                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                </Badge>
                            {:else if listing.status === 'available'}
                                <Badge class="font-medium bg-blue-flat text-blue-foreground">
                                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                </Badge>
                            {/if}
                        </h1>
                        <p class="text-sm font-medium text-muted-foreground">
                            {listing.contact_method} Contact
                        </p>
                    </div>

                    <div class="w-full md:flex md:flex-col md:items-end">
                        <h1 class="text-2xl font-bold text-primary">
                            {formatCurrency(listing.asking_price)}
                        </h1>
                        <p class="text-sm font-medium text-muted-foreground">asking price</p>
                    </div>
                </header>

                <div class="py-6 mt-2 sm:flex flex-wrap sm:justify-evenly grid grid-cols-2 justify-center gap-8">
                    <div class="flex flex-col gap-1 items-center">
                        <Building size={22} class="text-muted-foreground/80" />
                        <h1 class="font-semibold">{listing.market}</h1>
                        <h2 class="text-sm text-muted-foreground">Market</h2>
                    </div>
                    <div class="flex flex-col gap-1 items-center">
                        <Eye size={22} class="text-muted-foreground/80" />
                        <h1 class="font-semibold">{listing.views}</h1>
                        <h2 class="text-sm text-muted-foreground">Views</h2>
                    </div>
                    <div class="flex flex-col gap-1 items-center">
                        <Calendar size={22} class="text-muted-foreground/80" />
                        <h1 class="font-semibold">{listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}</h1>
                        <h2 class="text-sm text-muted-foreground">Status</h2>
                    </div>
                    <div class="flex flex-col gap-1 items-center">
                        <Building size={22} class="text-muted-foreground/80" />
                        <h1 class="font-semibold">{((listing.profit_per_yr / listing.revenue_per_yr) * 100).toFixed(1)}%</h1>
                        <h2 class="text-sm text-muted-foreground">Profit Margin</h2>
                    </div>
                </div>
            </div>

            <div class="rounded-lg border p-5 flex flex-col gap-4 w-full">
                <h1 class="flex flex-row gap-3 text-xl font-semibold items-center">
                    <TrendingUp size={20} />
                    Financial Performance
                </h1>

                <div class="flex flex-col sm:flex-row gap-5">
                    <div class="w-full p-5 items-center gap-0.5 justify-center text-center flex flex-col bg-blue-flat rounded-lg">
                        <h1 class="text-primary font-bold text-xl">{formatCurrency(listing.revenue_per_yr)}</h1>
                        <h2 class="text-sm font-medium">Annual Revenue</h2>
                        <p class="text-sm text-muted-foreground">Gross income per year</p>
                    </div>
                    <div class="w-full p-5 items-center gap-0.5 bg-secondary rounded-lg justify-center text-center flex flex-col">
                        <h1 class="font-bold text-xl">{formatCurrency(listing.gross_per_yr)}</h1>
                        <h2 class="text-sm font-medium">Gross Income</h2>
                        <p class="text-sm text-muted-foreground">Total yearly gross</p>
                    </div>
                    <div class="w-full p-5 items-center gap-0.5 justify-center text-center flex flex-col bg-green-flat rounded-lg">
                        <h1 class="text-green-600 font-bold text-xl">{formatCurrency(listing.profit_per_yr)}</h1>
                        <h2 class="text-sm font-medium">Annual Profit</h2>
                        <p class="text-sm text-muted-foreground">Net profit per year</p>
                    </div>
                </div>
            </div>

            <div class="rounded-lg border p-5 flex flex-col gap-2 w-full">
                <h1 class="text-xl font-semibold">Business Description</h1>
                <p class="text-muted-foreground text-sm">
                    Established coffee shop business with consistent revenue and loyal clientele. 
                    Sale includes all operational assets: branding, equipment, processes, and vendor relationships. 
                    Proven track record of profitability with potential for franchise expansion or product line growth. 
                    Positioned in a dense consumer market with strong foot traffic and brand recognition. 
                    Includes ancillary workspace adaptable for administrative, consulting, or remote service functions.
                </p>
            </div>
        </section>

        <aside class="w-full lg:w-[30%] flex flex-col gap-5">
            <div class="border rounded-lg p-5 w-full flex flex-col gap-3">
                <h1 class="font-semibold text-lg">Get in touch</h1>
                <div class="flex flex-row items-center gap-2">
                    <img src="https://i.guim.co.uk/img/media/9d9759a25269ff4dd7f4c41bde320c4928bdfb65/0_24_3000_1800/master/3000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=e4916223d76a56180788e7bfc1d25b02"
                        class="size-11 rounded-full border object-cover" />
                    <header class="flex flex-col">
                        <h1 class="font-semibold text-sm">Felix Edwards</h1>
                        <h2 class="font-medium text-muted-foreground text-sm">Direct Owner</h2>
                    </header>
                </div>
                <Button class="h-9 text-xs"><Phone size={14} />Call Owner</Button>
                <Button class="h-9 text-xs" variant="outline"><Mail size={14} />Send Message</Button>
                <Button class="h-9 text-xs" variant="outline"><User size={14} />Schedule Meeting</Button>
            </div>

            <div class="border rounded-lg p-5 w-full flex flex-col gap-3">
                <h1 class="font-semibold text-lg">Quick Actions</h1>
                <Button class="h-9 text-xs justify-start pl-3 gap-3" variant="outline"><Heart size={14} />Add to Watchlist</Button>
                <Button class="h-9 text-xs justify-start pl-3 gap-3" variant="outline"><Share size={14} />Share Property</Button>
                <Button class="h-9 text-xs justify-start pl-3 gap-3" variant="outline"><TrendingUp size={14} />Request Analysis</Button>
            </div>

            <div class="border rounded-lg p-5 w-full flex flex-col gap-3">
                <h1 class="font-semibold text-lg">Business Insights</h1>
                <div class="flex flex-row justify-between items-center w-full"><h1 class="text-sm text-muted-foreground">Days Listed</h1><h2 class="text-sm font-semibold">12 days</h2></div>
                <div class="flex flex-row justify-between items-center w-full"><h1 class="text-sm text-muted-foreground">Price / Rev.</h1><h2 class="text-sm font-semibold">2.4x</h2></div>
                <div class="flex flex-row justify-between items-center w-full"><h1 class="text-sm text-muted-foreground">Employees</h1><h2 class="text-sm font-semibold">36 staff</h2></div>
                <div class="flex flex-row justify-between items-center w-full"><h1 class="text-sm text-muted-foreground">Years Operating</h1><h2 class="text-sm font-semibold">9 years</h2></div>
                <div class="flex flex-row justify-between items-center w-full"><h1 class="text-sm text-muted-foreground">Ownership Type</h1><h2 class="text-sm font-semibold">LLC</h2></div>
                <div class="flex flex-row justify-between items-center w-full"><h1 class="text-sm text-muted-foreground">Sale Type</h1><h2 class="text-sm font-semibold">Full Asset Sale</h2></div>
                <div class="flex flex-row justify-between items-center w-full"><h1 class="text-sm text-muted-foreground">Confidential</h1><h2 class="text-sm font-semibold">Yes</h2></div>
            </div>
        </aside>
    </section>
</main>