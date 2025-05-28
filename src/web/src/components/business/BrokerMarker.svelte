<script lang="ts">
	import type { Broker } from '$types/Broker';
	import { onMount, type Snippet } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Provider from '@lucide/svelte/icons/life-buoy';
	import DealSize from '@lucide/svelte/icons/circle-dollar-sign';
	import Chart from '@lucide/svelte/icons/chart-column';
	import { Button } from '$components/ui/button';
	import maplibregl from 'maplibre-gl';
	import * as Drawer from '$components/ui/drawer';
	import { generateFakeBroker } from '$types/Broker';
	import { FloatingPanelState } from '$states/FloatingPanel.svelte';
	
type Props = {
		broker: Broker;
		map: maplibregl.Map;
	};

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
			brokers?.push(generateFakeBroker(-86.75, -86.45, 34.65, 34.85));
		}

		return () => marker.remove();
	});

	const isDesktop = new MediaQuery('(min-width: 768px)');
	let drawerOpen = $state(false);
	let DrawerSnippet = $state<Snippet>(MarkerContent);

	$effect(() => {
		if (drawerOpen == false) {
			DrawerSnippet = MarkerContent;
		}
	});
</script>

{#snippet MarkerContent()}
	<header>
		<h1 class="py-1 text-2xl font-semibold">
			{broker.name}
		</h1>
		<h2 class="flex flex-row items-center gap-2 font-medium text-muted-foreground">
			{broker.title} <span class="text-muted-foreground/60">at</span>
			{broker.company}
		</h2>
	</header>

	<div class="grid grid-cols-[auto,1fr] grid-rows-3 items-center gap-x-4 gap-y-4 py-5">
		<div class="flex items-center gap-2 font-medium text-muted-foreground">
			<MapPin size={24} />
			Location:
		</div>
		<div class="text-left font-medium">{broker.address}</div>

		<div class="flex items-center gap-2 font-medium text-muted-foreground">
			<Provider size={24} />
			Market:
		</div>
		<div class="text-left font-medium">{broker.market}</div>

		<div class="flex items-center gap-2 font-medium text-muted-foreground">
			<DealSize size={24} />
			Deal Size:
		</div>
		<div class="text-left font-medium">
			{formatCurrency(broker.stats.dealSizeRng[0])} – {formatCurrency(
				broker.stats.dealSizeRng[1]
			)}
		</div>
	</div>

	<div class="mt-2 flex items-center gap-2 font-medium text-muted-foreground">
		<Chart size={24} />
		Key Stats:
	</div>

	<div class="flex w-full flex-row justify-between gap-4 px-0 py-12">
		<div class="flex h-6 w-full flex-col items-center justify-center gap-1 text-center">
			<h1 class="text-2xl font-semibold dark:text-primary">{broker.stats.yrsInSphere}yrs</h1>
			<h2 class="text-muted-foreground">in sphere</h2>
		</div>
		<div
			class="flex h-6 w-full flex-col items-center justify-center gap-1 border-l border-r border-opacity-80 text-center"
		>
			<h1 class="text-2xl font-semibold dark:text-primary">{broker.stats.dealsClosed}</h1>
			<h2 class="text-muted-foreground">deals closed</h2>
		</div>
		<div class="flex h-6 w-full flex-col items-center justify-center gap-1 text-center">
			<h1 class="text-2xl font-semibold dark:text-primary">${broker.stats.wentThrough}M</h1>
			<h2 class="text-muted-foreground">went through</h2>
		</div>
	</div>

	<footer class="flex w-full flex-row justify-end gap-2">
		<Button
			onclick={() => {
				drawerOpen = false;
				FloatingPanelState.open = false;
			}}
			href={`/brokers/example`}
			class="w-full bg-blue-flat font-semibold text-blue-foreground hover:bg-blue-flat/70"
		>
			View Profile
		</Button>
		<Button class="w-full">Request Contact</Button>
	</footer>
{/snippet}

{#snippet Marker()}
	<div
		class={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${FloatingPanelState.open == true && FloatingPanelState.snippet == MarkerContent ? 'scale-90' : 'scale-[0.85] bg-white dark:bg-border/80'}`}
	>
		<div
			class={`${FloatingPanelState.open == true && FloatingPanelState.snippet == MarkerContent ? 'bg-orange' : 'bg-chip-red'} flex h-6 w-6 items-center justify-center rounded-full`}
		>
			<div
				class="flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-border/80"
			/>
		</div>
	</div>
{/snippet}

<div bind:this={container} class="absolute">
	{#if isDesktop.current}
		<button
			onclick={() => {
				FloatingPanelState.open = true;
				FloatingPanelState.snippet = MarkerContent;
			}}
		>
			{@render Marker()}
		</button>
	{:else}
		<Drawer.Root bind:open={drawerOpen}>
			<Drawer.Trigger>
				{@render Marker()}
			</Drawer.Trigger>
			<Drawer.Content class="shadow-ui max-h-[86.5vh] px-4">
				<div class="mb-4 mt-2 overflow-y-auto">
					{@render DrawerSnippet?.()}
				</div>
			</Drawer.Content>
		</Drawer.Root>
	{/if}
</div>
