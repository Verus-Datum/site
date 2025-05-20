<script lang="ts">
	import type { Business } from "$types/Business";
	import { onMount, type Snippet } from "svelte";
    import MapPin from "@lucide/svelte/icons/map-pin";
    import Provider from "@lucide/svelte/icons/life-buoy";
	import { Button } from "$components/ui/button";
	import { AspectRatio } from "$components/ui/aspect-ratio";
	import maplibregl from "maplibre-gl";
    import * as Popover from "$components/ui/popover";

    type Props = {
        business: Business;
        map: maplibregl.Map;
    }

    let { business, map }: Props = $props();

    let container = $state<HTMLDivElement | undefined>();

    const formatCurrency = (num: number) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0
		}).format(num);

    onMount(() => {
		if (!map || !container) return;
        
		const marker = new maplibregl.Marker({ element: container })
			.setLngLat(business.lngLat)
			.addTo(map);

		return () => marker.remove();
	});
</script>

<div bind:this={container}>
    <Popover.Root>
        <Popover.Trigger>
            <div class="bg-white scale-75 h-8 w-8 flex items-center justify-center rounded-full">
                <div class="bg-primary w-6 h-6 flex items-center justify-center rounded-full">
                    <div class="bg-white h-4 w-4 flex items-center justify-center rounded-full" />
                </div>
            </div>
        </Popover.Trigger>
        <Popover.Content class="bg-white p-4 rounded-xl shadow-ui w-[27rem] relative">
            <header>
                <h1 class="font-semibold py-2 text-lg">
                    {business.name}
                </h1>
                <h2 class="flex flex-row font-medium text-primary py-1 gap-1 items-center">
                    <MapPin size={16} />
                    {business.address}
                </h2>
                <h2 class="flex flex-row font-medium text-primary py-1 gap-1 items-center">
                    <Provider size={16} />
                    {business.market}
                </h2>
            </header>

            <section class="py-5">
                <h1 class="font-semibold text-primary text-2xl">
                    {formatCurrency(business.financials.askingPrice)}
                </h1>
                <p class="font-semibold text-muted-foreground/65">
                    asking price
                </p>
            </section>

            <footer class="w-full flex flex-row gap-2">
                <Button class="w-full font-semibold bg-primaryFlat text-primary hover:bg-primary/20">
                    Learn More
                </Button>
                <Button class="w-full">
                    Request Contact
                </Button>
            </footer>
        </Popover.Content>
    </Popover.Root>
</div>