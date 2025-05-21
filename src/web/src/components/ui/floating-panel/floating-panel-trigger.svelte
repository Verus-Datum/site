<script lang="ts">
    import { type Snippet } from "svelte";
    import { FloatingPanelState } from "$states/FloatingPanel.svelte"

    type Props = {
        children?: Snippet;
    }

    let { children } = $props();
</script>

<button onclick={() => {
    FloatingPanelState.open = !FloatingPanelState.open;
}}>
    {@render children?.()}
</button>