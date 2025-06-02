<script lang="ts">
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { unmount, mount, onMount } from 'svelte';
	import { mapState } from '$states/MapState.svelte';
	import { listingService } from '$services/listingService';
	import ListingPopover from '$components/core/ListingPopover.svelte';
	import type { SvelteComponent } from 'svelte';
    import * as Popover from "$components/ui/popover"

	let mapContainer = $state<HTMLElement | undefined>();
	let mapLoaded = $state<boolean>(false);

	let justOpened = false;
	let popoverMarker: maplibregl.Marker | null = null;
	let popoverComponent: SvelteComponent = null;

    let popoverTrigger = $state();
    let popoverContent = $state();

	onMount(async () => {
		if (!mapContainer) return;

		if (!mapState.map) {
			mapState.container = mapContainer;
		} else {
			const currentContainer = mapState.map.getContainer();
			if (currentContainer !== mapContainer) {
				mapState.map.remove();
				mapState.map = undefined;
				mapState.container = mapContainer;
			} else {
				mapState.map.resize();
			}
		}

		const geojson = await listingService.getGeojson();

		mapState.map.on('load', () => {
			mapLoaded = true;

			if (!mapState.map.getSource('listings')) {
				mapState.map.addSource('listings', {
					type: 'geojson',
					data: geojson
				});
			}

			if (!mapState.map.getLayer('listing-points')) {
				mapState.map.addLayer({
					id: 'listing-outer',
					type: 'circle',
					source: 'listings',
					paint: {
						'circle-radius': 12,
						'circle-color': '#ffffff'
					}
				});

				mapState.map.addLayer({
					id: 'listing-middle',
					type: 'circle',
					source: 'listings',
					paint: {
						'circle-radius': 9,
						'circle-color': '#3b82f6'
					}
				});

				mapState.map.addLayer({
					id: 'listing-inner',
					type: 'circle',
					source: 'listings',
					paint: {
						'circle-radius': 6,
						'circle-color': '#ffffff'
					}
				});
			}

			mapState.map.on('click', 'listing-outer', (e) => {
				justOpened = true;

				const feature = e.features?.[0];
				if (!feature) return;

				const coords = (feature.geometry as GeoJSON.Point).coordinates as [number, number];

				if (popoverMarker) {
                    unmount(popoverComponent)
					setTimeout(() => {
						popoverMarker?.remove();
						popoverMarker = null;
						popoverComponent = null;
					}, 300); // match out: duration
				}

				const container = document.createElement('div');
				popoverComponent = mount(ListingPopover, {
					target: container,
					props: {
						name: feature.properties?.name,
						address: feature.properties?.address,
						price: parseFloat(feature.properties?.asking_price)
					}
				}) as { destroy: () => void; component: SvelteComponent };

				// Changed anchor from 'bottom' to 'top' to position popover below the marker
				popoverMarker = new maplibregl.Marker({ 
					element: container, 
					anchor: 'top',
					offset: [0, 8] // Optional: adds a small gap between marker and popover
				})
					.setLngLat(coords)
					.addTo(mapState.map);
			});

			mapState.map.on('click', (e) => {
				if (justOpened) {
					justOpened = false;
					return;
				}

				const features = mapState.map.queryRenderedFeatures(e.point, {
					layers: ['listing-outer']
				});

				if (features.length === 0 && popoverMarker) {
                    unmount(popoverComponent, {
                        outro: true
                    })
					setTimeout(() => {
						popoverMarker?.remove();
						popoverMarker = null;
						popoverComponent = null;
					}, 500);
				}
			});
		});
	});
</script>

<div
	bind:this={mapContainer}
	class="h-screen w-screen overflow-hidden duration-500 {mapLoaded
		? 'translate-y-0 scale-100 opacity-100'
		: 'translate-y-5 scale-[0.989] opacity-0'}"
/>