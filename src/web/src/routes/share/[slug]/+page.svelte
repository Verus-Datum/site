<script lang="ts">
	import { onMount } from "svelte";
    import type { PageProps } from "./$types";
	import { goto } from "$app/navigation";

    let pageData: PageProps = $props();
    let data = $derived(pageData.data);

    onMount(async() => {
        if (data.listing) {
            goto(`/listings/${(await data.listing).id}`)
        }
    })
</script>