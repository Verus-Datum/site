<script lang="ts">
	import MapMarker from "$components/business/BusinessMarker.svelte";
    import { generateFakeBusiness } from "$types/Business";

    let business = generateFakeBusiness(-86.75, -86.45, 34.65, 34.85); // HSV
</script>