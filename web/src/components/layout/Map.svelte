<script lang="ts">
    import maplibregl, { type StyleSpecification } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onMount } from 'svelte';

	let map: maplibregl.Map | undefined = $state<maplibregl.Map | undefined>();
    let mapContainer;
    let initialView = { lat: 39.8283, long: -98.5795 };

    onMount(() => {
        if (!map) {
            const map = new maplibregl.Map({
                container: mapContainer,
                style: 'https://tiles.openfreemap.org/styles/bright',
                center: [-86.5853, 34.7295],
                zoom: 10
            });

            return () => map.remove();
        }
    });
</script>

<div bind:this={mapContainer} class="w-full h-screen">

</div>
