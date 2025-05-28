<script lang="ts">
	import { Button } from "$components/ui/button";
    import MapPin from "@lucide/svelte/icons/map-pin";
    import Provider from "@lucide/svelte/icons/life-buoy";
    import Plus from "@lucide/svelte/icons/plus";
    import Phone from "@lucide/svelte/icons/phone";
    import Eye from "@lucide/svelte/icons/eye";
    import EllipisVertical from "@lucide/svelte/icons/ellipsis-vertical";
    import ArrowRight from "@lucide/svelte/icons/arrow-right";
    import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right"
    import { currentUser } from "$states/CurrentUser.svelte";
    import { onMount } from "svelte";
    import ScreenContainer from "$components/layout/ScreenContainer.svelte"

    import { flyAndScale } from "$utils/shadcn";
	import { fly } from "svelte/transition";
	import ListingCard from "$components/business/ListingCard.svelte";

    $effect(() => {
        currentUser.requiresAuthed();
    })
</script>

{#snippet FlatCard(title: string, subtext: string, color: string)}
    <button
        class="w-full group duration-200 relative flex items-start justify-end p-6 text-left flex-col h-64 rounded-lg"
        style="
            --flat: var(--{color}-flat);
            --foreground: var(--{color}-foreground);
            --muted: var(--{color}-muted);
            background-color: hsl(var(--flat));
        "
        on:mouseenter={() => (event.currentTarget.style.backgroundColor = `hsl(var(--foreground) / 0.2)`)}
        on:mouseleave={() => (event.currentTarget.style.backgroundColor = `hsl(var(--flat))`)}
    >
        <h1 class="text-[hsl(var(--foreground))] text-2xl font-semibold">
            {title}
        </h1>
        <h2 class="text-[hsl(var(--muted))] font-medium">
            {subtext}
        </h2>
        <ArrowRight
            class="group-hover:rotate-[-45deg] duration-200 text-[hsl(var(--muted))] absolute top-6 right-6"
            size={32}
        />
    </button>
{/snippet}

<ScreenContainer>
    <header class="pt-20 w-full">
        <h1 class="text-5xl md:text-left text-center w-full font-semibold">
            Hello {currentUser.user?.first_name}
        </h1>
    </header>
    
    <section class="w-full flex flex-col gap-8">
        <header class="w-full flex justify-between items-center">
            <h2 class="font-semibold text-xl">
                My Listings
            </h2>
            <a href="/listings/create" class="flex flex-row gap-2 text-base text-primary hover:text-primary/80 font-medium duration-200">
                <Plus size={24} />
                Add Listing
            </a>
        </header>

        <div class="flex flex-col gap-6 w-full max-h-[50rem] overflow-auto">
            {#if currentUser.user?.listings.length > 0}
                {#each currentUser.user?.listings as listing}
                    <ListingCard listing={listing} />
                {/each}
            {:else}
                <div class="w-full border rounded-xl h-80 flex items-center justify-center flex-col gap-2">
                    <h1 class="font-semibold text-xl">
                        No listings yet
                    </h1>
                    <h2 class="text-muted-foreground">
                        Submit a listing for review
                    </h2>
                </div>
            {/if}
        </div>

        <h2 class="font-semibold text-xl">
            Services
        </h2>

        <div class="w-full flex gap-6 flex-col lg:flex-row justify-between">
            {@render FlatCard("Find brokers/bankers", "Access the list of more than 1000 firms and professionals", "blue")}
            {@render FlatCard("Find service providers", "Get reliable help with taxes from qualified legal professionals", "green")}
            {@render FlatCard("Help with business exit", "Request us help you with due diligence lists, valuation methods, M&A process steps", "orange")}
        </div>
    </section>
</ScreenContainer>