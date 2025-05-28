<script lang="ts">
	import { type Snippet } from 'svelte';
	import { FloatingPanelState } from '$states/FloatingPanel.svelte';
	import { clickOutside } from '$utils/shadcn';
	import { Button } from '$components/ui/button';
	import X from '@lucide/svelte/icons/x';
	import { fly } from 'svelte/transition';
	import { MediaQuery } from 'svelte/reactivity';
	import * as Drawer from '$components/ui/drawer';

	type Props = {
		open?: boolean;
		children?: Snippet;
	};

	let { open = $bindable(false), children }: Props = $props();

	$effect(() => {
		FloatingPanelState.open = open;
	});

	const isDesktop = new MediaQuery('(min-width: 768px)');
</script>

{#if isDesktop.current}
	{#if FloatingPanelState.open}
		<div
			use:clickOutside={() => (FloatingPanelState.open = false)}
			transition:fly={{ x: -10, duration: 200 }}
			class="hide-scrollbar shadow-ui absolute left-0 top-[10rem] z-40 ml-5 mt-5 flex max-h-[calc(100vh-12.5rem)] w-[30rem] flex-col items-start overflow-y-auto rounded-xl bg-card p-5"
		>
			<Button
				onclick={() => (FloatingPanelState.open = false)}
				size="icon"
				class="absolute right-6 top-6 h-auto w-auto p-1 text-muted-foreground hover:bg-opacity-50"
				variant="secondary"
			>
				<X size={16} />
			</Button>

			{@render FloatingPanelState.snippet?.()}
		</div>
	{/if}
{:else}
	<Drawer.Root bind:open={FloatingPanelState.open}>
		<Drawer.Content class="max-h-[86.5vh] p-5 pt-0">
			{@render FloatingPanelState.snippet?.()}
		</Drawer.Content>
	</Drawer.Root>
{/if}

{@render children?.()}
