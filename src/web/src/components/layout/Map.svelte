<script lang="ts">
    import maplibregl, { type StyleSpecification } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { mount, onMount } from 'svelte';
    import { mapState } from '$states/MapState.svelte';
    import { generateFakeBusiness } from '$types/Business';

    import BusinessMarker from '$components/business/BusinessMarker.svelte';
	import { generateFakeBroker } from '$types/Broker';
	import BrokerMarker from '$components/business/BrokerMarker.svelte';

    let mapContainer = $state<HTMLElement | undefined>();

    onMount(() => {
        if (!mapState.map && mapContainer != undefined) {
            mapState.container = mapContainer;

            const checkMapReady = setInterval(() => {
                if (mapState.map) {
                    clearInterval(checkMapReady);
                    mapState.map.resize();
                    
                    const businesses = Array.from({ length: Math.floor(Math.random() * (50 - 35)) + 35 }, () =>
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
                    
                    const brokers = Array.from({ length: Math.floor(Math.random() * (15 - 5)) + 5 }, () =>
                        generateFakeBroker(-86.75, -86.45, 34.65, 34.85)
                    );

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
                }
            }, 100);
        }
    });
</script>

<div bind:this={mapContainer} class="w-screen h-screen overflow-hidden">

</div>
