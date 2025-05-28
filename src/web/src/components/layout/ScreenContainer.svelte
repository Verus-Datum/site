<script lang="ts">
	import type { Snippet } from "svelte";

    type Props = {
        children: Snippet
    }
    
    let { children }: Props = $props();
</script>

<main in:fly={{ y: 20, duration: 650 }} class="md:pt-20 pt-8 pb-8 w-full md:w-[100%] lg:w-[80%] 2xl:w-[60%] 3xl:w-[65%] px-8 mx-auto flex-col gap-10 flex items-start justify-start">
    {@render children?.()}
</main>