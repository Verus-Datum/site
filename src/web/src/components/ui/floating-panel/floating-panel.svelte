<script lang="ts">
    import { type Snippet } from "svelte";
    import { FloatingPanelState } from "$states/FloatingPanel.svelte"
	import { clickOutside } from "$utils/shadcn";
	import { Button } from "$components/ui/button";
	import X from "@lucide/svelte/icons/x";
    import { fly } from "svelte/transition";
	import { MediaQuery } from "svelte/reactivity";
    import * as Drawer from "$components/ui/drawer";

    type Props = {
        open?: boolean;
        children?: Snippet;
    }

    let { open = $bindable(false), children }: Props = $props();

    $effect(() => {
        FloatingPanelState.open = open;
    })

    const isDesktop = new MediaQuery("(min-width: 768px)");    
</script>

{#if isDesktop.current}
    {#if FloatingPanelState.open}
        <div use:clickOutside={() => FloatingPanelState.open = false} transition:fly={{ x: -10, duration: 200 }} class="absolute flex items-start flex-col left-0  z-40 bg-white rounded-xl p-5 top-[10rem] hide-scrollbar overflow-y-auto mt-5 ml-5 max-h-[calc(100vh-12.5rem)] w-[30rem] shadow-ui">
            <Button onclick={() => FloatingPanelState.open = false} size="icon" class="p-1 h-auto w-auto text-muted-foreground hover:bg-opacity-50 absolute top-6 right-6" variant="secondary">
                <X size={16} />
            </Button>

            {@render FloatingPanelState.snippet?.()}
        </div>
    {/if}
{:else}
    <Drawer.Root bind:open={FloatingPanelState.open}>
        <Drawer.Content class="p-5">
            {@render FloatingPanelState.snippet?.()}
        </Drawer.Content>
    </Drawer.Root>
{/if}

{@render children?.()}
