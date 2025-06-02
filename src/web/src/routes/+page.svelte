<script lang="ts">
	import Map from '$components/layout/Map.svelte';
	import { Button } from '$components/ui/button';
	import { generateFakeBusiness } from '$types/Business';
	import { generateFakeBroker } from '$types/Broker';
	import ListingCardSquare from '$components/business/ListingCardSquare.svelte';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import { fly } from 'svelte/transition';
	
const businesses = Array.from({ length: Math.floor(Math.random() * (50 - 35)) + 35 }, () =>
		generateFakeBusiness(-86.75, -86.45, 34.65, 34.85)
	);

	const brokers = Array.from({ length: Math.floor(Math.random() * (15 - 5)) + 5 }, () =>
		generateFakeBroker(-86.75, -86.45, 34.65, 34.85)
	);

	let showSidebar = $state(true);
</script>

<!--
<Map {brokers} {businesses} />
-->

<aside
	in:fly={{ duration: 550 }}
	class="absolute bottom-0 right-0 z-50 hidden h-[calc(100vh-4rem-5rem)] flex-col gap-4 overflow-y-auto border-l bg-background p-6 transition-transform duration-300 md:h-[calc(100vh-4.5rem-5.5rem)] xl:flex xl:w-[40vw] 2xl:w-[35vw] 3xl:w-[32.5vw]"
	class:translate-x-full={!showSidebar}
>
	<header class="flex w-full items-center justify-between">
		<div>
			<h1 class="text-2xl font-semibold">Businesses For Sale</h1>
			<h2 class="py-2 text-sm font-medium text-muted-foreground">
				{businesses.length} results
			</h2>
		</div>
	</header>

	<section class="grid w-full grid-cols-2 gap-4">
		{#each businesses as business}
			<ListingCardSquare listing={business} />
		{/each}
	</section>
</aside>

<Button
	variant="outline"
	size="icon"
	class={`absolute top-[11rem] z-50 hidden transition-all duration-300 xl:flex ${
		showSidebar
			? 'right-[calc(40vw+1.25rem)] 2xl:right-[calc(35vw+1.25rem)] 3xl:right-[calc(32.5vw+1.25rem)]'
			: 'right-4'
	}`}
	onclick={() => (showSidebar = !showSidebar)}
>
	{#if showSidebar}
		<ChevronRight size={16} />
	{:else}
		<ChevronLeft size={16} />
	{/if}
</Button>
