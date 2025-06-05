<script lang="ts">
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { mount, onMount } from 'svelte';
	import { mapState } from '$states/MapState.svelte';
	import { type Business } from '$types/Business';
	import BusinessMarker from '$components/business/BusinessMarker.svelte';
	import { type Broker } from '$types/Broker';
	import BrokerMarker from '$components/business/BrokerMarker.svelte';
	import type { Listing } from '$models/Listing';

	type Props = {
		brokers: Broker[];
		listings: Listing[];
	};

	let { brokers, listings }: Props = $props();

	let mapContainer = $state<HTMLElement | undefined>();
	let markersInitialized = false;
	let mapLoaded = $state<boolean>(false);

	function renderMarkersInBatches(list: any[], mountFn: (item: any) => void, batchSize = 50) {
		let index = 0;
		function batch() {
			const slice = list.slice(index, index + batchSize);
			for (const item of slice) mountFn(item);
			index += batchSize;
			if (index < list.length) requestIdleCallback(batch);
		}
		batch();
	}

	onMount(() => {
		if (!mapContainer) return;

		if (!mapState.map) {
			mapState.container = mapContainer;
		} else {
			const currentContainer = mapState.map.getContainer();
			if (currentContainer !== mapContainer) {
				mapState.map.remove();
				mapState.map = undefined;
				mapState.container = mapContainer;
				markersInitialized = false;
			} else {
				mapState.map.resize();
			}
		}

		mapState.map.on('load', () => {
			mapLoaded = true;

			if (!markersInitialized) {
				renderMarkersInBatches(listings, (biz) => {
					const el = document.createElement('div');
					mount(BusinessMarker, {
						target: el,
						props: { map: mapState.map, business: biz }
					});
					new maplibregl.Marker({ element: el })
						.setLngLat([biz.longitude, biz.latitude])
						.addTo(mapState.map);
				});

				renderMarkersInBatches(brokers, (bro) => {
					const el = document.createElement('div');
					mount(BrokerMarker, { target: el, props: { map: mapState.map, broker: bro } });
					new maplibregl.Marker({ element: el })
						.setLngLat(bro.lngLat)
						.addTo(mapState.map);
				});

				markersInitialized = true;
			}
		});
	});
</script>

<div
	bind:this={mapContainer}
	class="h-screen w-screen overflow-hidden duration-500 {mapLoaded
		? 'translate-y-0 scale-100 opacity-100'
		: 'translate-y-5 scale-[0.989] opacity-0'}"
/>
