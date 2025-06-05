<script lang="ts">
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onMount } from 'svelte';
	import { mapState } from '$states/MapState.svelte';
	import { listingService } from '$services/listingService';
	import type { Listing } from '$models/Listing';
	import BusinessTrigger from '$components/business/BusinessTrigger.svelte';
	import { mode } from 'mode-watcher';

	let mapContainer = $state<HTMLElement | undefined>();
	let mapLoaded = $state(false);

	let selectedBusiness = $state<Listing | null>(null);
	let triggerX = $state(0);
	let triggerY = $state(0);

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

		const listings: Listing[] = await listingService.getAll();

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
			class="absolute z-50 pointer-events-auto"
			style="left: {triggerX}px; top: {triggerY}px; transform: translate(-50%, -50%);"
			on:click|stopPropagation
		>
			<BusinessTrigger business={selectedBusiness} initiallyOpen={true} />
		</div>
	{/if}
{/key}

