<script lang="ts">
    import maplibregl, { type StyleSpecification } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { mount, onMount } from 'svelte';
    import { mapState } from '$states/MapState.svelte';
    import { generateFakeBusiness } from '$types/Business';

    import BusinessMarker from '$components/business/BusinessMarker.svelte';

    let mapContainer = $state<HTMLElement | undefined>();

    onMount(() => {
        if (!mapState.map && mapContainer != undefined) {
            mapState.container = mapContainer;

            // Wait until the map is initialized before adding markers
            const checkMapReady = setInterval(() => {
            if (mapState.map) {
                clearInterval(checkMapReady);

                const businesses = Array.from({ length: 100 }, () =>
                    generateFakeBusiness(-86.75, -86.45, 34.65, 34.85)
                );

                for (const biz of businesses) {
                    const markerEl = document.createElement('div');

                    mount(BusinessMarker, {
                        target: markerEl,
                        props: { map: mapState.map, business: biz }
                    });

                    new maplibregl.Marker({ element: markerEl })
                        .setLngLat(biz.lngLat)
                        .addTo(mapState.map);
                }
            }
            }, 100);
        }
    });
</script>

<div bind:this={mapContainer} class="w-full h-screen">

</div>
