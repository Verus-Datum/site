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

<ScreenContainer class="width flex items-start">
    <header class="flex flex-col items-start gap-6 w-full lg:w-3/4 mt-20 md:my-20">
        <h1 class="text-4xl font-semibold text-left">
            Buy and sell businesses effortlessly
        </h1>
        <h2 class="text-muted-foreground text-left">
			Discover verified business listings with detailed insights. Streamlined search for your ideal match. Make confident purchases backed by real data.
        </h2>

        <div class="flex flex-row items-center justify-start gap-4 w-full">
            <Button href="/register">
                Get Started
            </Button>
            <Button href="/listings/map" class='bg-secondary' variant="outline">
                View Listings
            </Button>
        </div>
    </header>

    <section class="flex flex-col lg:flex-row gap-16 p-16 bg-secondary rounded-lg shadow-sm justify-between w-full">
        <div class="flex flex-col items-center">
            <h1 class="text-primary text-2xl font-bold">
                2,846
            </h1>
            <h2 class="text-muted-foreground">
                Active Listings
            </h2>
        </div>
        <div class="flex flex-col items-center">
            <h1 class="text-primary text-2xl font-bold">
                $24.4M
            </h1>
            <h2 class="text-muted-foreground">
                Deals Closed
            </h2>
        </div>
         <div class="flex flex-col items-center">
            <h1 class="text-primary text-2xl font-bold">
                15,000
            </h1>
            <h2 class="text-muted-foreground">
                Registered Buyers
            </h2>
        </div>
         <div class="flex flex-col items-center">
            <h1 class="text-primary text-2xl font-bold">
                94%
            </h1>
            <h2 class="text-muted-foreground">
                Success Rate
            </h2>
        </div>
    </section>

    <section in:fly={{ y: 15, duration: 400 }} class="w-full flex items-start justify-start py-8 flex-col">
        <header class='w-full text-start flex flex-col gap-2 items-start justify-start'>
            <h1 class='text-3xl font-semibold'>
                Featured businesses
            </h1>
            <h2 class="text-muted-foreground text-lg">
                Discover top M&A opportunities
            </h2>
        </header>
        
        <div class="w-full gap-8 grid pt-8 md:grid-rows-3">
            {#each listings as listing}
                <ListingCard listing={listing} />
            {/each}
        </div>
    </section>
</ScreenContainer>