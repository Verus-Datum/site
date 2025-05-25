<script lang="ts">
    import { Button } from "$components/ui/button";
    import MapPin from "@lucide/svelte/icons/map-pin";
    import Provider from "@lucide/svelte/icons/life-buoy";
    import Plus from "@lucide/svelte/icons/plus";
    import Phone from "@lucide/svelte/icons/phone";
    import Eye from "@lucide/svelte/icons/eye";
    import EllipisVertical from "@lucide/svelte/icons/ellipsis-vertical";
    import ArrowRight from "@lucide/svelte/icons/arrow-right";
    import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right"
    import { currentUser } from "$states/CurrentUser.svelte";
    import { onMount } from "svelte";
    import type { Business } from "$types/Business";
	import { Badge } from "$components/ui/badge";
    
    type Props = {
        listing: Business;
    };

    let { listing }: Props = $props();

    const formatCurrency = (num: number) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0
		}).format(num);

    let images = [
        "https://www.petitpalais.paris.fr/sites/default/files/content/images/274a7179_0.jpg",
        "https://builtin.com/sites/www.builtin.com/files/styles/ckeditor_optimize/public/inline-images/Favor%203.jpeg",
        "https://k2space.imgix.net/app/uploads/2023/06/K2-Criteo-Office-Curator-LARGE-102-scaled.jpg?auto=format&fit=max&w=5000&q=90",
        "https://www.cmswire.com/-/media/96e6aad4e98842abb94d1bba60317770.ashx",
        "https://media.wired.com/photos/6667528bbbc4a40373aab2af/master/pass/Everything-Apple-Announced-WWDC-2024-GettyImages-2156398720.jpg",
        "https://fiu-original.b-cdn.net/fontsinuse.com/use-images/121/121154/121154.png?filename=Screenshot_2020-09-10%20Develop%20Preview%20Ship%20For%20the%20best%20frontend%20teams%20%E2%80%93%20Vercel(3).png"
    ];
</script>

<div class="rounded-xl relative border w-full p-6 flex flex-col md:flex-row gap-6 shadow-ui">
    <img src={images[Math.floor(Math.random() * images.length)]} alt="Image" class="w-full md:w-80 shrink-0 object-cover rounded-lg" />
    <header class="flex flex-col justify-between w-full relative">
        <h1 class="text-2xl font-semibold w-full flex flex-col items-start">
            {listing.name}
            <span class="text-primary text-xl py-2 flex flex-col lg:hidden">
                {formatCurrency(listing.asking_price)}
                <p class="text-muted-foreground font-medium text-sm">
                    asking price
                </p>
            </span>
            <span class="text-primary flex-col items-end absolute self-end hidden lg:flex">
                {formatCurrency(listing.asking_price)}
                <p class="text-muted-foreground font-medium text-base">
                    asking price
                </p>
            </span>
        </h1>

        <div class="h-full flex flex-col gap-2 py-4">
            <div class="flex flex-col">
                <span class="text-sm text-muted-foreground font-medium">Market</span>
                <p class="font-medium">
                    {listing.market}
                </p>
            </div>
            <div class="flex flex-col">
                <span class="text-sm text-muted-foreground font-medium">Contact Method</span>
                <p class="font-medium">
                    {listing.contact_method}
                </p>
            </div>
        </div>

        <div class="w-full flex flex-row gap-6 truncate md:whitespace-normal md:overflow-visible overflow-x-auto hide-scrollbar">
            <div class="flex flex-col">
                <span class="text-sm text-muted-foreground font-medium">Revenue / Yr</span>
                <p class="font-medium">
                    {formatCurrency(listing.revenue_per_yr)}
                </p>
            </div>
            <div class="flex flex-col">
                <span class="text-sm text-muted-foreground font-medium">Gross / Yr</span>
                <p class="font-medium">
                    {formatCurrency(listing.gross_per_yr)}
                </p>
            </div>
            <div class="flex flex-col">
                <span class="text-sm text-muted-foreground font-medium">Profit / Yr</span>
                <p class="font-medium">
                    {formatCurrency(listing.profit_per_yr)}
                </p>
            </div>

            <div class="right-0 ml-auto bottom-0 hidden lg:flex">
                <Button class="text-base font-normal">
                    View Listing
                </Button>
            </div>
        </div>

        <Button class="text-base font-normal w-full lg:hidden flex mt-4">
            View Listing
        </Button>
    
    </header>
</div>