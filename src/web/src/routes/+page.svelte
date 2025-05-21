<script lang="ts">
	import MapMarker from "$components/business/BusinessMarker.svelte";
    import { generateFakeBusiness } from "$types/Business";
    import * as FloatingPanel from "$components/ui/floating-panel";

    let business = generateFakeBusiness(-86.75, -86.45, 34.65, 34.85); // HSV
</script>