<script lang="ts">
	import type { Broker } from "$types/Broker";
	import { onMount, type Snippet } from "svelte";
    import { MediaQuery } from "svelte/reactivity";
    import MapPin from "@lucide/svelte/icons/map-pin";
    import Provider from "@lucide/svelte/icons/life-buoy";
    import DealSize from "@lucide/svelte/icons/circle-dollar-sign"
	import { Button } from "$components/ui/button";
	import { AspectRatio } from "$components/ui/aspect-ratio";
	import maplibregl from "maplibre-gl";
    import * as Popover from "$components/ui/popover";
    import * as Drawer from "$components/ui/drawer";
    import * as Sheet from "$components/ui/sheet";
    import * as FloatingPanel from "$components/ui/floating-panel";

    type Props = {
        broker: Broker;
        map: maplibregl.Map;
    }

    let { broker, map }: Props = $props();

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
			.setLngLat(broker.lngLat)
			.addTo(map);

		return () => marker.remove();
	});

    const isDesktop = new MediaQuery("(min-width: 768px)");
</script>

{#snippet MarkerContent()}
    <header>
        <h1 class="font-semibold py-1 text-lg">
            {broker.name}
        </h1>
        <h2 class="flex flex-row text-muted-foreground font-medium gap-2 items-center">
            {broker.title} <span class="text-muted-foreground/60">at</span> {broker.company}
        </h2>
    </header>

    <div class="grid grid-rows-3 grid-cols-[auto,1fr] py-5 gap-y-3 gap-x-3 items-center">
        <div class="flex items-center gap-2 text-muted-foreground font-medium">
            <MapPin size={16} />
            Location:
        </div>
        <div class="text-left">{broker.address}</div>

        <div class="flex items-center gap-2 text-muted-foreground font-medium">
            <Provider size={16} />
            Market:
        </div>
        <div class="text-left">{broker.market}</div>

        <div class="flex items-center gap-2 text-muted-foreground font-medium">
            <DealSize size={16} />
            Deal Size:
        </div>
        <div class="text-left">
            {formatCurrency(broker.stats.dealSizeRng[0])} – {formatCurrency(broker.stats.dealSizeRng[1])}
        </div>
    </div>

    <footer class="w-full flex flex-row gap-2">
        <Button class="w-full font-semibold bg-primaryFlat text-primary hover:bg-primary/20">
            Learn More
        </Button>
        <Button class="w-full">
            Request Contact
        </Button>
    </footer>
{/snippet}

{#snippet Marker()}
    <div class="bg-white scale-80 h-8 w-8 flex items-center justify-center rounded-full">
        <div class="bg-chip-red w-6 h-6 flex items-center justify-center rounded-full">
            <div class="bg-white h-4 w-4 flex items-center justify-center rounded-full" />
        </div>
    </div>
{/snippet}

<div bind:this={container} class="absolute">
    {#if isDesktop.current}
        <FloatingPanel.Root>
            <FloatingPanel.Trigger>
                {@render Marker()}
            </FloatingPanel.Trigger>
            <svelte:fragment>
                <FloatingPanel.Content>
                    {@render MarkerContent()}
                </FloatingPanel.Content>
            </svelte:fragment>
        </FloatingPanel.Root>
    {:else}
        <Drawer.Root>
            <Drawer.Trigger>
                {@render Marker()}
            </Drawer.Trigger>
            <Drawer.Content class="px-4 shadow-ui">
                <div class="mt-2 mb-4">
                    {@render MarkerContent()}
                </div>
            </Drawer.Content>
        </Drawer.Root>
    {/if}
</div>