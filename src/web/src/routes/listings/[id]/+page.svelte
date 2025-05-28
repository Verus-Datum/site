<script lang="ts">
	import type { Business } from '$types/Business';
	import type { PageProps } from './$types';
    import { fly } from 'svelte/transition';
    import * as Carousel from "$components/ui/carousel";
	import { type CarouselAPI } from '$components/ui/carousel/context';
	import { Badge } from '$components/ui/badge';
    import { formatCurrency } from '$utils/currency';
	import Button from '$components/ui/button/button.svelte';
	import type { Broker } from '$types/Broker';
    import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';

    let { data }: PageProps = $props();

    let listing = $derived<Business>(data.listing);
    let broker = $derived<Broker>(listing.broker);
    let carouselAPI = $state<CarouselAPI>();
    const count = $derived(carouselAPI ? carouselAPI.scrollSnapList().length : 0);
    let current = $state(0);

    $effect(() => {
        if (carouselAPI) {
            current = carouselAPI.selectedScrollSnap() + 1;
            carouselAPI.on("select", () => {
                current = carouselAPI!.selectedScrollSnap() + 1;
            });
        }
    });

    let images = [
        "https://www.upmenu.com/wp-content/uploads/2022/08/Small-Cafe-Interior-Design.jpg",
        "https://weadesign.com/wp-content/uploads/2024/01/office-interior-designs.webp",
        "https://www.avantisystemsusa.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-08-at-3.08.52-PM.png",
        "https://images.squarespace-cdn.com/content/v1/5d6d67f2387da800015dc00e/e242ea2f-e67f-4991-85bc-6c07b48bcc73/Jude_WetCoffee_-6.jpg",
        "https://www.blankcreatives.com.au/wp-content/uploads/2022/12/Wonderwood-cafe_09_WEB.jpg"
    ]
</script>

<main in:fly={{ y: 20, duration: 650 }} class="pt-28 w-full md:w-[100%] lg:w-[80%] 2xl:w-[60%] 3xl:w-[50%] px-4 mx-auto flex-col gap-8 flex items-start justify-start">
    <nav class="w-full relative flex flex-row justify-between items-center">
        <button onclick={() => history.back()} class="font-medium flex flex-row gap-2 items-center">
            <ArrowLeft size={20} class="" />
            Back
        </button>
        <h1 class="absolute left-1/2 font-semibold transform -translate-x-1/2">
            View Listing
        </h1>
        <button>
            <Ellipsis size={24} class="" />
        </button>
    </nav>

    <Carousel.Root setApi={(emblaApi) => (carouselAPI = emblaApi)}>
        <Carousel.Content>
            {#each images as img, i}
                <Carousel.Item class="lg:basis-1/2 3xl:basis-1/3">
                    <img src={img} alt="Image" class="w-full h-72 shrink-0 object-cover rounded-lg" />
                </Carousel.Item>
            {/each}
        </Carousel.Content>
        <Badge class="absolute lg:hidden bottom-4 right-4">
            {current} / {images.length}
        </Badge>
    </Carousel.Root>

    <div class="flex flex-col gap-8 md:flex-row w-full md:justify-between">
        <header class="w-full">
            <h1 class="text-3xl font-bold w-full flex flex-col items-start">
                {listing.name}
                <p class="text-base font-medium text-muted-foreground">
                    Broker {broker.name}
                </p>
            </h1>
        </header>

        <div class="w-full md:flex md:items-end md:flex-col">
            <h1 class="text-3xl text-primary font-bold">
                {formatCurrency(listing.asking_price)}
            </h1>
            <p class="text-muted-foreground font-medium text-base">
                asking price
            </p>
        </div>
    </div>

    <div class="w-full flex md:flex-row flex-col gap-2 md:gap-6">
        <div class="flex flex-col">
            <span class="text-base text-muted-foreground font-medium">Location</span>
            <p class="text-lg font-semibold">
                {listing.address}
            </p>
        </div>
        <div class="flex flex-col">
            <span class="text-base text-muted-foreground font-medium">Market</span>
            <p class="text-lg font-semibold">
                {listing.market}
            </p>
        </div>
    </div>

    <div class="w-full flex flex-row gap-6">
        <div class="flex flex-col">
            <span class="text-base text-muted-foreground font-medium">Revenue / Yr</span>
            <p class="text-lg font-semibold">
                {formatCurrency(listing.revenue_per_yr)}
            </p>
        </div>
        <div class="flex flex-col">
            <span class="text-base text-muted-foreground font-medium">Gross / Yr</span>
            <p class="text-lg font-semibold">
                {formatCurrency(listing.gross_per_yr)}
            </p>
        </div>
        <div class="flex flex-col">
            <span class="text-base text-muted-foreground font-medium">Profit / Yr</span>
            <p class="text-lg font-semibold">
                {formatCurrency(listing.profit_per_yr)}
            </p>
        </div>
    </div>
    
    <section class="w-full flex flex-col gap-8 border-t pt-6 mt-4">
        <header>
            <h1 class="font-semibold py-1 text-2xl">
                {broker.name}
            </h1>
            <h2 class="flex flex-row text-muted-foreground font-medium gap-2 items-center">
                {broker.title} <span class="text-muted-foreground/60">at</span> {broker.company}
            </h2>
        </header>

        <div class="w-full flex flex-col md:flex-row gap-6">
            <div class="flex flex-col">
                <span class="text-base text-muted-foreground font-medium">Market</span>
                <p class="text-lg font-semibold">
                    {broker.market}
                </p>
            </div>
            <div class="flex flex-col">
                <span class="text-base text-muted-foreground font-medium">Address</span>
                <p class="text-lg font-semibold">
                    {broker.address}
                </p>
            </div>
            <div class="flex flex-col">
                <span class="text-base text-muted-foreground font-medium">Deal Size</span>
                <p class="text-lg font-semibold">
                    {formatCurrency(broker.stats.dealSizeRng[0])} – {formatCurrency(broker.stats.dealSizeRng[1])}
                </p>
            </div>
        </div>

        <div class="flex items-center gap-2 text-muted-foreground font-medium">
            Key Stats:
        </div>

        <div class="flex flex-row gap-4 py-4 w-full px-0 justify-between">
            <div class="flex flex-col text-center gap-1 items-center w-full justify-center h-6">
                <h1 class="text-2xl text-primary font-semibold">{broker.stats.yrsInSphere}yrs</h1>
                <h2 class="text-muted-foreground font-medium">in sphere</h2>
            </div>
            <div class="flex flex-col text-center gap-1 items-center w-full justify-center h-6 border-l border-opacity-80 border-r">
                <h1 class="text-2xl text-primary font-semibold">{broker.stats.dealsClosed}</h1>
                <h2 class="text-muted-foreground font-medium">deals closed</h2>
            </div>
            <div class="flex flex-col text-center gap-1 items-center w-full justify-center h-6">
                <h1 class="text-2xl text-primary font-semibold">${broker.stats.wentThrough}M</h1>
                <h2 class="text-muted-foreground font-medium">went through</h2>
            </div>
        </div>

        <div class="flex items-center gap-2 mt-2 text-muted-foreground font-medium">
            Services:
        </div>

        <div class="w-full max-h-64 overflow-y-auto pl-6 hide-scrollbar flex flex-col">
            {#each broker.services as service}
                <h1 class="py-3 border-b font-medium">
                    {service}
                </h1>
            {/each}
        </div>
    </section>

    <footer class="w-full flex flex-row gap-4 pb-12 lg:w-1/2 2xl:w-1/3 lg:ml-auto">
        <Button class="w-full py-6 font-semibold bg-blue-flat hover:bg-blue-flat/70 text-blue-foreground">
            Watch Listing
        </Button>
        <Button class="w-full py-6 font-medium">
            Request Contact
        </Button>
    </footer>
</main>