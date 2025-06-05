<script lang="ts">
	import Plus from '@lucide/svelte/icons/plus';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { currentUser } from '$states/CurrentUser.svelte';
	import ScreenContainer from '$components/layout/ScreenContainer.svelte';
	import ListingCard from '$components/business/ListingCard.svelte';

	$effect(() => {
		currentUser.requiresAuthed();
	});
</script>

{#snippet FlatCard(title: string, subtext: string, color: string)}
	<button
		class="group relative flex h-64 w-full flex-col items-start justify-end rounded-lg p-6 text-left duration-200"
		style="
            --flat: var(--{color}-flat);
            --foreground: var(--{color}-foreground);
            --muted: var(--{color}-muted);
            background-color: hsl(var(--flat));
        "
		onmouseenter={(event) =>
			(event.currentTarget.style.backgroundColor = 'hsl(var(--flat) / 0.6)')}
		onmouseleave={(event) =>
			(event.currentTarget.style.backgroundColor = 'hsl(var(--flat) / 1)')}
	>
		<h1 class="text-2xl font-semibold text-[hsl(var(--foreground))]">
			{title}
		</h1>
		<h2 class="font-medium text-[hsl(var(--muted))]">
			{subtext}
		</h2>
		<ArrowRight
			class="absolute right-6 top-6 text-[hsl(var(--muted))] duration-200 group-hover:rotate-[-45deg]"
			size={32}
		/>
	</button>
{/snippet}

<ScreenContainer>
	<header class="w-full pt-20">
		<h1 class="w-full text-center text-5xl font-semibold md:text-left">
			Hello {currentUser.user?.first_name?.charAt(0).toUpperCase() + currentUser.user?.first_name?.slice(1)}
		</h1>
	</header>

	<section class="flex w-full flex-col gap-8">
		<header class="flex w-full items-center justify-between">
			<h2 class="text-xl font-semibold">My Listings</h2>
			<a
				href="/listings/create"
				class="flex flex-row gap-2 text-base font-medium text-primary duration-200 hover:text-primary/80"
			>
				<Plus size={24} />
				Add Listing
			</a>
		</header>

		<div class="flex max-h-[50rem] w-full flex-col gap-6 overflow-auto">
			{#if currentUser.user}
                {#if currentUser.user.listings}
                    {#if currentUser.user?.listings?.length > 0}
                        {#each currentUser.user?.listings as listing}
                            <ListingCard {listing} />
                        {/each}
                    {:else}
                        <div
                            class="flex h-80 w-full flex-col items-center justify-center gap-2 rounded-xl border"
                        >
                            <h1 class="text-xl font-semibold">No listings yet</h1>
                            <h2 class="text-muted-foreground">Submit a listing for review</h2>
                        </div>
                    {/if}
                {/if}
            {/if}
		</div>

		<h2 class="text-xl font-semibold">Services</h2>

		<div class="flex w-full flex-col justify-between gap-6 lg:flex-row">
			{@render FlatCard(
				'Find brokers/bankers',
				'Access the list of more than 1000 firms and professionals',
				'blue'
			)}
			{@render FlatCard(
				'Find service providers',
				'Get reliable help with taxes from qualified legal professionals',
				'green'
			)}
			{@render FlatCard(
				'Help with business exit',
				'Request us help you with due diligence lists, valuation methods, M&A process steps',
				'orange'
			)}
		</div>
	</section>
</ScreenContainer>
