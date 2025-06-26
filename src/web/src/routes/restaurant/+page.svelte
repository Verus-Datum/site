<script lang="ts">
	import { goto } from '$app/navigation';
	import ListingCard from '$components/business/ListingCard.svelte';
	import ListingCardSquare from '$components/business/ListingCardSquare.svelte';
	import ScreenContainer from '$components/layout/ScreenContainer.svelte';
	import { Button } from '$components/ui/button';
	import { Input } from '$components/ui/input';
	import { type Listing } from '$models/Listing';
	import { generateFakeBusiness } from '$types/Business';
	import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';

	let listings = $state<Listing[]>([]);

	onMount(() => {
		for (let i = 0; i < 3; i++) {
			listings.push(generateFakeBusiness(0,0,0,0) as unknown as Listing)
		}
	})
</script>

<section in:fly={{ y: 15, duration: 400 }} class="w-full bg-primary py-32 flex items-center justify-center">
	<header class="width px-5 flex flex-col gap-8 items-center text-center">
		<h1 class="md:text-6xl text-5xl w-full md:max-w-[24ch] font-bold text-white">
			Buy and sell businesses effortlessly
		</h1>
		<p class="w-full md:text-lg text-white/70">
			Discover verified business listings with detailed insights. Streamlined search for your ideal match. Make confident purchases backed by real data.
		</p>
		<input placeholder="Enter a city, address, or ZIP code" class="w-full h-14 border p-4 shadow-sm rounded-md bg-secondary" />
	</header>
</section>

<section in:fly={{ y: 15, duration: 400 }} class="py-32 w-full flex items-center justify-center flex-col">
	<header class='w-full text-center flex flex-col gap-2 items-center justify-center'>
		<h1 class='text-3xl font-semibold'>
			Featured businesses
		</h1>
		<h2 class="text-muted-foreground text-lg">
			Discover top M&A opportunities
		</h2>
	</header>

	<div class="width flex flex-col gap-8 pt-8 px-5">
		{#each listings as listing}
			<ListingCard listing={listing} showView={false} />
		{/each}
	</div>
</section>
