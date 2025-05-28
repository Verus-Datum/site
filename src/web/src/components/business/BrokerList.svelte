<script lang="ts">
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import { Button } from '$components/ui/button';
	import { generateFakeBroker, type Broker } from '$types/Broker';
	import { onMount } from 'svelte';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Provider from '@lucide/svelte/icons/life-buoy';
	import { FloatingPanelState } from '$states/FloatingPanel.svelte';

	let brokers = $state<Broker[]>([]);

	onMount(() => {
		for (let index = 0; index < 8; index++) {
			brokers?.push(generateFakeBroker(-86.75, -86.45, 34.65, 34.85));
		}

		FloatingPanelState.addSnippet('brokers', AllBrokers);
	});
</script>

{#snippet AllBrokers()}
	<header>
		<h1 class="py-1 text-2xl font-semibold">Brokers</h1>
		<h2 class="flex flex-row items-center gap-2 font-medium text-muted-foreground">
			<span class="text-muted-foreground/60">in</span> Huntsville, AL
		</h2>
	</header>

	<div class="hide-scrollbar flex max-h-full w-full flex-col overflow-y-auto">
		<!-- This is such a mess, but it's just a demo -->
		{#if brokers.length > 0}
			{#each brokers as _broker}
				<div class="flex w-full flex-col gap-2 border-b py-6">
					<h1 class="relative text-lg font-semibold">
						{_broker.name}
						<Button
							onclick={() => {}}
							size="icon"
							class="absolute right-0 top-0 h-auto w-auto p-1 text-muted-foreground hover:bg-opacity-50"
							variant="secondary"
						>
							<ChevronRight size={24} />
						</Button>
					</h1>
					<h2 class="flex flex-row items-center gap-2 text-muted-foreground">
						<MapPin size={24} />
						{_broker.address}
					</h2>
					<h2 class="flex flex-row items-center gap-2 text-muted-foreground">
						<Provider size={24} />
						{_broker.market}
					</h2>
				</div>
			{/each}
		{/if}
	</div>
{/snippet}
