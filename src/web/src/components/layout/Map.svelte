<script lang="ts">
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { mount, onMount } from 'svelte';
	import { mapState } from '$states/MapState.svelte';
	import { generateFakeBusiness, type Business } from '$types/Business';
	import BusinessMarker from '$components/business/BusinessMarker.svelte';
	import { generateFakeBroker, type Broker } from '$types/Broker';
	import BrokerMarker from '$components/business/BrokerMarker.svelte';
    import { fade } from 'svelte/transition';

    type Props = {
        brokers: Broker[],
        businesses: Business[]
    }

    let { brokers, businesses }: Props = $props();

	let mapContainer = $state<HTMLElement | undefined>();
	let markersInitialized = false;
    let mapLoaded = $state<boolean>(false);

	onMount(() => {
		if (!mapContainer) return;

		// First-time mount
		if (!mapState.map) {
			mapState.container = mapContainer;
		} else {
			// DOM element changed (e.g., remount)
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

		const checkMapReady = setInterval(() => {
			if (mapState.map && !markersInitialized && mapState.map.loaded()) {
				clearInterval(checkMapReady);

				for (const biz of businesses) {
					const markerEl = document.createElement('div');
					mount(BusinessMarker, {
						target: markerEl,
						props: { map: mapState.map, business: biz }
					});
					new maplibregl.Marker({ element: markerEl })
						.setLngLat({
                            lng: biz.longitude,
                            lat: biz.latitude
                        })
						.addTo(mapState.map);
				}

				for (const bro of brokers) {
					const markerEl = document.createElement('div');
					mount(BrokerMarker, {
						target: markerEl,
						props: { map: mapState.map, broker: bro }
					});
					new maplibregl.Marker({ element: markerEl })
						.setLngLat(bro.lngLat)
						.addTo(mapState.map);
				}

				markersInitialized = true;
			}
		}, 100);

        mapState.map.on('load', () => {
            mapLoaded = true;
        })
	});
</script>

<div bind:this={mapContainer} class="w-screen h-screen overflow-hidden duration-500 {mapLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.989] translate-y-5"}"></div>
