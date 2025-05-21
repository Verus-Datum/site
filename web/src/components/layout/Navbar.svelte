<script lang="ts">
    import { Button } from "$components/ui/button";
    import UserDropdown from "$components/user/UserDropdown.svelte"
    import NotificationsDropdown from "$components/user/NotificationsDropdown.svelte"
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import Briefcase from "@lucide/svelte/icons/briefcase-business"
    import Provider from "@lucide/svelte/icons/life-buoy"
    import Logo from '$assets/logo.png'
    import type { Snippet } from "svelte";

    let {
        children
    }: {
        children: Snippet
    } = $props();

    let active = $state("business")
    let exampleUrl = "https://media.istockphoto.com/id/1413766112/photo/successful-mature-businessman-looking-at-camera-with-confidence.jpg?s=612x612&w=0&k=20&c=NJSugBzNuZqb7DJ8ZgLfYKb3qPr2EJMvKZ21Sj5Sfq4=";
</script>

<div class="w-screen z-50 bg-background flex justify-center flex-col absolute top-0 left-0">
    <nav class="w-full flex items-center justify-between px-6 border-b h-[4.5rem]">
        <header class="flex-row gap-3 items-center hidden md:flex">
            <img src={Logo} alt="Verus Datum" class="w-10 h-10 rounded-lg" />
            <h1 class="font-bold">Verus Datum</h1>
        </header>
        <section class="relative h-full w-full md:w-[25rem] items-center justify-center flex flex-row">
            <div
                class="absolute bottom-0 h-0.5 bg-black transition-all duration-300"
                style:width="{active === 'business' ? '50%' : '50%'}"
                style:left="{active === 'business' ? '0px' : '50%'}"
            />

            <button
                class="font-bold text-sm flex flex-row gap-3 px-2 w-full justify-center items-center h-full"
                on:mouseenter={() => (active = 'business')}
            >
                <Briefcase />
                <p>Businesses to Buy</p>
            </button>
            <button
                class="font-semibold text-sm flex flex-row gap-3 px-2 w-full justify-center text-muted-foreground px-5 items-center h-full"
            >
                <Provider />
                <p>Service Providers</p>
            </button>
        </section>    
        <section class="flex flex-row gap-6 hidden md:flex">
            <NotificationsDropdown />
            <UserDropdown />
        </section>
    </nav>

    {@render children?.()}
</div>