<script lang="ts">
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onMount } from 'svelte';
	import { mapState } from '$states/MapState.svelte';
	import { listingService } from '$services/listingService';
	import type { Listing } from '$models/Listing';
	import BusinessTrigger from '$components/business/BusinessTrigger.svelte';
	import { mode } from 'mode-watcher';

	import { Button } from '$components/ui/button';
	import ListingCardSquare from '$components/business/ListingCardSquare.svelte';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import { fly } from 'svelte/transition';

	let showSidebar = $state(true);
	let mapContainer = $state<HTMLElement | undefined>();
	let mapLoaded = $state(false);

	let selectedBusiness = $state<Listing | null>(null);
	let triggerX = $state(0);
	let triggerY = $state(0);

	let listings = $state<Listing[]>([]);

	let outerColor = $derived(mode.current !== 'dark' ? '#ffffff' : '#2f3030');
	let innerColor = $derived(mode.current === 'dark' ? '#193562' : '#ffffff');
	let strokeColor = $state('#3b82f6');

	function addBusinessLayer(listings: Listing[]) {
		mapState.map.addSource('businesses', {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: listings.map((biz) => ({
					type: 'Feature',
					id: biz.id,
					geometry: {
						type: 'Point',
						coordinates: [biz.longitude, biz.latitude]
					},
					properties: { ...biz }
				}))
			}
		});

		mapState.map.addLayer({
			id: 'businesses-outer',
			type: 'circle',
			source: 'businesses',
			paint: {
				'circle-radius': 14,
				'circle-color': outerColor,
				'circle-stroke-width': 0,
				'circle-stroke-color': strokeColor
			}
		});

		mapState.map.addLayer({
			id: 'businesses-inner',
			type: 'circle',
			source: 'businesses',
			paint: {
				'circle-radius': 7,
				'circle-color': innerColor,
				'circle-stroke-width': 3,
				'circle-stroke-color': strokeColor
			}
		});
	}

	onMount(async () => {
		if (!mapContainer) return;

		if (!mapState.map) {
			mapState.container = mapContainer;
		} else {
			const current = mapState.map.getContainer();
			if (current !== mapContainer) {
				mapState.map.remove();
				mapState.map = undefined;
				mapState.container = mapContainer;
			} else {
				mapState.map.resize();
			}
		}

		listings = await listingService.getAll();

		mapState.map.on('load', () => {
			mapLoaded = true;
			addBusinessLayer(listings);
		});

		mapState.map.on('styledata', () => {
			if (!mapState.map.getSource('businesses')) {
				addBusinessLayer(listings);
			}
		});

		mapState.map.on('click', (e) => {
			if (!mapState.map.getLayer('businesses-inner')) return;

			const box = [
				[e.point.x - 6, e.point.y - 6],
				[e.point.x + 6, e.point.y + 6]
			];
			const hits = mapState.map.queryRenderedFeatures(box, {
				layers: ['businesses-inner']
			});

			if (hits.length > 0) {
				const feat = hits[0];
				const props = feat.properties!;
				const clickedId = +props.id;

				const biz: Listing = {
					id: clickedId,
					user_id: +props.user_id,
					business_id: +props.business_id,
					contact_method: props.contact_method,
					is_public: props.is_public === 'true' || props.is_public === true,
					asking_price: +props.asking_price,
					status: props.status,
					views: +props.views,
					listed_at: props.listed_at,
					name: props.name,
					address: props.address,
					market: props.market,
					revenue_per_yr: +props.revenue_per_yr,
					gross_per_yr: +props.gross_per_yr,
					profit_per_yr: +props.profit_per_yr,
					longitude: +feat.geometry.coordinates[0],
					latitude: +feat.geometry.coordinates[1]
				};

				if (selectedBusiness?.id === clickedId) {
					selectedBusiness = null;
					return;
				}

				selectedBusiness = null;
				requestAnimationFrame(() => {
					selectedBusiness = biz;
					const screen = mapState.map.project([biz.longitude, biz.latitude]);
					triggerX = screen.x;
					triggerY = screen.y;
				});
			} else {
				selectedBusiness = null;
			}
		});

		mapState.map.on('move', () => {
			if (!selectedBusiness) return;
			const screen = mapState.map.project([
				selectedBusiness.longitude,
				selectedBusiness.latitude
			]);
			triggerX = screen.x;
			triggerY = screen.y;
		});
	});
</script>

<div
	bind:this={mapContainer}
	class="relative h-screen w-screen overflow-hidden duration-500 {mapLoaded
		? 'translate-y-0 scale-100 opacity-100'
		: 'translate-y-5 scale-[0.989] opacity-0'}"
/>

{#key selectedBusiness?.id}
	{#if selectedBusiness}
		<div
			class="pointer-events-auto absolute z-50"
			style="left: {triggerX}px; top: {triggerY}px; transform: translate(-50%, -50%);"
			on:click|stopPropagation
		>
			<BusinessTrigger business={selectedBusiness} initiallyOpen={true} />
		</div>
	{/if}
{/key}

<aside
	in:fly={{ duration: 550 }}
	class="absolute bottom-0 right-0 z-50 hidden h-[calc(100vh-4rem-5rem)] flex-col gap-4 overflow-y-auto border-l bg-background p-6 transition-transform duration-300 md:h-[calc(100vh-4.5rem-5.5rem)] xl:flex xl:w-[40vw] 2xl:w-[35vw] 3xl:w-[32.5vw]"
	class:translate-x-full={!showSidebar}
>
	{#if listings.length > 0}
		<header class="flex w-full items-center justify-between">
			<div>
				<h1 class="text-2xl font-semibold">Businesses For Sale</h1>
				<h2 class="py-2 text-sm font-medium text-muted-foreground">
					{listings.length} results
				</h2>
			</div>
		</header>

		<section class="grid w-full grid-cols-2 gap-4">
			{#each listings as business}
				<ListingCardSquare listing={business} />
			{/each}
		</section>
	{/if}
</aside>

<Button
	variant="outline"
	size="icon"
	class={`absolute top-[11rem] z-50 hidden transition-all duration-300 xl:flex ${
		showSidebar
			? 'right-[calc(40vw+1.25rem)] 2xl:right-[calc(35vw+1.25rem)] 3xl:right-[calc(32.5vw+1.25rem)]'
			: 'right-4'
	}`}
	onclick={() => (showSidebar = !showSidebar)}
>
	{#if showSidebar}
		<ChevronRight size={16} />
	{:else}
		<ChevronLeft size={16} />
	{/if}
</Button>
