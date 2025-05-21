<script lang="ts">
	import type { Broker } from "$types/Broker";
	import { onMount, type Snippet } from "svelte";
    import { MediaQuery } from "svelte/reactivity";
    import MapPin from "@lucide/svelte/icons/map-pin";
    import Provider from "@lucide/svelte/icons/life-buoy";
    import DealSize from "@lucide/svelte/icons/circle-dollar-sign"
    import Chart from "@lucide/svelte/icons/chart-column"
    import Info from "@lucide/svelte/icons/info";
    import Chevron from "@lucide/svelte/icons/chevron-left";
	import { Button } from "$components/ui/button";
	import { AspectRatio } from "$components/ui/aspect-ratio";
	import maplibregl from "maplibre-gl";
    import * as Popover from "$components/ui/popover";
    import * as Drawer from "$components/ui/drawer";
    import * as Sheet from "$components/ui/sheet";
    import { generateFakeBroker } from "$types/Broker";
    import { FloatingPanelState } from "$states/FloatingPanel.svelte";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";

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

    let brokers = $state<Broker[]>([]);

    onMount(() => {
		if (!map || !container) return;
        
		const marker = new maplibregl.Marker({ element: container })
			.setLngLat(broker.lngLat)
			.addTo(map);

        for (let index = 0; index < 8; index++) {
            brokers?.push(generateFakeBroker(-86.75, -86.45, 34.65, 34.85))
        }

        return () => marker.remove();
	});

    const isDesktop = new MediaQuery("(min-width: 768px)");    
    let drawerOpen = $state(false);
    let DrawerSnippet = $state<Snippet>(MarkerContent);

    $effect(() => {
        if(drawerOpen == false) {
            DrawerSnippet = MarkerContent;
        }
    })
</script>

{#snippet MarkerContent()}
    <button onclick={() => {
        FloatingPanelState.open = true;
        drawerOpen = false;
        FloatingPanelState.displaySnippet("brokers");
    }} class="flex pb-5 pt-1 text-left hover:text-foreground/80 duration-200 flex-row gap-2 font-medium items-center justify-center">
        <Chevron size={18} />
        Show All
    </button>

    <header>
        <h1 class="font-semibold py-1 text-2xl">
            {broker.name}
        </h1>
        <h2 class="flex flex-row text-muted-foreground font-medium gap-2 items-center">
            {broker.title} <span class="text-muted-foreground/60">at</span> {broker.company}
        </h2>
    </header>

    <div class="grid grid-rows-3 grid-cols-[auto,1fr] py-5 gap-y-4 gap-x-4 items-center">
        <div class="flex items-center gap-2 text-muted-foreground font-medium">
            <MapPin size={18} />
            Location:
        </div>
        <div class="text-left font-medium">{broker.address}</div>

        <div class="flex items-center gap-2 text-muted-foreground font-medium">
            <Provider size={18} />
            Market:
        </div>
        <div class="text-left font-medium">{broker.market}</div>

        <div class="flex items-center gap-2 text-muted-foreground font-medium">
            <DealSize size={18} />
            Deal Size:
        </div>
        <div class="text-left font-medium">
            {formatCurrency(broker.stats.dealSizeRng[0])} – {formatCurrency(broker.stats.dealSizeRng[1])}
        </div>
    </div>

    <div class="flex items-center gap-2 mt-2 text-muted-foreground font-medium">
        <Chart size={18} />
        Key Stats:
    </div>

    <div class="flex flex-row gap-4 py-12 w-full px-0 justify-between">
        <div class="flex flex-col text-center gap-1 items-center w-full justify-center h-6">
            <h1 class="text-2xl text-primary font-semibold">{broker.stats.yrsInSphere}yrs</h1>
            <h2 class="text-muted-foreground">in sphere</h2>
        </div>
        <div class="flex flex-col text-center gap-1 items-center w-full justify-center h-6 border-l border-opacity-80 border-r">
            <h1 class="text-2xl text-primary font-semibold">{broker.stats.dealsClosed}</h1>
            <h2 class="text-muted-foreground">deals closed</h2>
        </div>
        <div class="flex flex-col text-center gap-1 items-center w-full justify-center h-6">
            <h1 class="text-2xl text-primary font-semibold">${broker.stats.wentThrough}M</h1>
            <h2 class="text-muted-foreground">went through</h2>
        </div>
    </div>

    <div class="flex items-center gap-2 mt-2 text-muted-foreground font-medium">
        <Info size={18} />
        Services:
    </div>

    <div class="w-full max-h-64 py-4 pb-6 overflow-y-auto pl-6 hide-scrollbar flex flex-col">
        {#each broker.services as service}
            <h1 class="py-3 border-b font-medium">
                {service}
            </h1>
        {/each}
    </div>

    <footer class="w-full flex flex-row justify-end gap-2">
        <Button class="w-2/5">
            Request Contact
        </Button>
    </footer>
{/snippet}

{#snippet Marker()}
    <div class={`h-9 w-9 flex items-center justify-center rounded-full transition-all duration-300 ${FloatingPanelState.open == true && FloatingPanelState.snippet == MarkerContent ? 'scale-90' : 'scale-[0.85] bg-white'}`}>
        <div class={`${FloatingPanelState.open == true && FloatingPanelState.snippet == MarkerContent ? 'bg-orange' : 'bg-chip-red'} w-6 h-6 flex items-center justify-center rounded-full`}>
            <div class="bg-white h-4 w-4 flex items-center justify-center rounded-full" />
        </div>
    </div>
{/snippet}

<div bind:this={container} class="absolute">
    {#if isDesktop.current}
        <button onclick={() => {
            FloatingPanelState.open = true
            FloatingPanelState.snippet = MarkerContent
        }}>
            {@render Marker()}
        </button>
    {:else}
        <Drawer.Root bind:open={drawerOpen}>
            <Drawer.Trigger>
                {@render Marker()}
            </Drawer.Trigger>
            <Drawer.Content class="px-4 shadow-ui">
                <div class="mt-2 mb-4">
                    {@render DrawerSnippet?.()}
                </div>
            </Drawer.Content>
        </Drawer.Root>
    {/if}
</div>