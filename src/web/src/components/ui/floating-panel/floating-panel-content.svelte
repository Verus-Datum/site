<script lang="ts">
    import { type Snippet } from "svelte";
    import { FloatingPanelState } from "$states/FloatingPanel.svelte"
    import X from "@lucide/svelte/icons/x"
	import { Button } from "$components/ui/button"
	import { flyAndScale, clickOutside } from "$utils/shadcn";
	import { fly } from "svelte/transition";

    type Props = {
        children?: Snippet;
    }

    let { children } = $props();
</script>

{#if FloatingPanelState.open}
    <div use:clickOutside={() => FloatingPanelState.open = false} transition:fly={{ x: -10, duration: 200 }} class="absolute left-0  z-40 bg-white rounded-xl p-5 top-[10rem] mt-5 ml-5 h-[calc(100vh-12.5rem)] w-[30rem] shadow-ui">
        <Button onclick={() => FloatingPanelState.open = false} size="icon" class="p-1 h-auto w-auto text-muted-foreground hover:bg-opacity-50 absolute top-6 right-6" variant="secondary">
            <X size={16} />
        </Button>

        {@render children?.()}
    </div>
{/if}