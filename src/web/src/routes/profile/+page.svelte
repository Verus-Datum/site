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

    import { flyAndScale } from "$utils/shadcn";
	import { fly } from "svelte/transition";

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

<main in:fly={{ y: 20, duration: 650 }} class="md:pt-20 pt-8 pb-8 w-full md:w-[100%] lg:w-[80%] 2xl:w-[60%] px-8 mx-auto flex-col gap-10 flex items-start justify-start">
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
            <button class="flex flex-row gap-2 text-base text-primary hover:text-primary/80 font-medium duration-200">
                <Plus size={24} />
                Add Listing
            </button>
        </header>

        <div class="rounded-xl border w-full p-6 flex flex-col md:flex-row gap-6 shadow-ui">
            <img src="https://www.petitpalais.paris.fr/sites/default/files/content/images/274a7179_0.jpg" class="w-full md:w-96 shrink-0 rounded-lg" />
            <header class="flex flex-col py-2 justify-between w-full relative">
                <h1 class="text-3xl pb-4 font-semibold w-full flex items-center justify-between">
                    Capital One Cafe
                    <button class="text-muted-foreground hover:text-muted-foreground/80">
                        <EllipisVertical size={24} />
                    </button>
                </h1>

                <section class="flex flex-col gap-4">
                    <div class="flex items-center gap-3 text-muted-foreground font-medium">
                        <MapPin size={24} />
                        3309 Michele Ln, Bowie, MD 20621
                    </div>

                    <div class="flex items-center gap-3 text-muted-foreground font-medium">
                        <Provider size={24} />
                        Retail
                    </div>

                    <div class="flex items-center gap-3 text-muted-foreground font-medium">
                        <Eye size={24} />
                        2,466 viewed
                    </div>

                    <div class="flex items-center gap-3 text-muted-foreground font-medium">
                        <Phone size={24} />
                        26 requested contact
                    </div>
                </section>

                <div class="flex flex-col gap-2 mt-6 md:hidden">
                    <Button class="text-base bg-blue-flat text-blue-foreground hover:bg-blue-muted/30 font-normal w-full">
                        View
                    </Button>
                    <Button class="text-base font-normal w-full">
                        Request Referral
                    </Button>
                </div>

                <div class="hidden md:flex justify-end gap-2 mt-4">
                    <Button class="text-base text-primary hover:text-primary/80 bg-transparent hover:bg-transparent font-normal">
                        View
                    </Button>
                    <Button class="text-base font-normal">
                        Request Referral
                    </Button>
                </div>
            </header>
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
</main>