<script lang="ts">
    import { type Snippet } from "svelte";
    import { FloatingPanelState } from "$states/FloatingPanel.svelte"

    type Props = {
        open: boolean;
        children?: Snippet;
    }

    let { open = $bindable(false), children } = $props();

    $effect(() => {
        FloatingPanelState.open = open;
    })
</script>

{@render children?.()}
