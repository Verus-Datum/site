<script lang="ts">
    import { Button } from "$components/ui/button";
    import UserDropdown from "$components/user/UserDropdown.svelte"
    import NotificationsDropdown from "$components/user/NotificationsDropdown.svelte"
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import Briefcase from "@lucide/svelte/icons/briefcase-business"
    import Provider from "@lucide/svelte/icons/life-buoy"
    import Logo from '$assets/logo.png'
    import type { Snippet } from "svelte";
	import { page } from "$app/state";
    import Menu from "@lucide/svelte/icons/menu"
    import * as Sheet from "$components/ui/sheet";

    let {
        children
    }: {
        children: Snippet
    } = $props();

    let active = $derived(page.url.pathname === "/" ? "business" : "listings")
    let exampleUrl = "https://media.istockphoto.com/id/1413766112/photo/successful-mature-businessman-looking-at-camera-with-confidence.jpg?s=612x612&w=0&k=20&c=NJSugBzNuZqb7DJ8ZgLfYKb3qPr2EJMvKZ21Sj5Sfq4=";
</script>

<div class="w-screen z-50 bg-background flex justify-center flex-col absolute top-0 left-0">
    <nav class="w-full flex items-center justify-between px-6 border-b h-[4.5rem]">
        <!--
        <Sheet.Root>
            <Sheet.Trigger class="flex flex-row gap-2 items-center">
                <Button variant="outline" size="icon" class="p-0">
                    <Menu size={24} />
                </Button>
                <h1 class="font-bold">Verus Datum</h1>
            </Sheet.Trigger>
            <Sheet.Content side="left">
                <Sheet.Header>
                    <a href="/" class="flex-row gap-3 items-center flex text-left">
                        <img src={Logo} alt="Verus Datum" class="w-10 h-10 rounded-lg" />
                        <h1 class="font-bold">Verus Datum</h1>
                    </a>
                </Sheet.Header>
                <div class="py-4 flex flex-col gap-0.5">
                    <button
                        class={`w-full text-left items-center justify-start p-3 flex flex-row gap-3 hover:bg-secondary duration-200 rounded-xl ${
                            page.url.pathname === '/' ? 'text-black font-medium' : 'text-muted-foreground'
                        }`}
                    >
                        <Briefcase size={24} />
                        Businesses
                    </button>

                    <button
                        class={`w-full text-left items-center justify-start p-3 flex flex-row gap-3 hover:bg-secondary duration-200 rounded-xl ${
                            page.url.pathname === '/service-provider' ? 'text-black font-medium' : 'text-muted-foreground'
                        }`}
                    >
                        <Provider size={24} />
                        Service Providers
                    </button>
                </div>
            </Sheet.Content>
        </Sheet.Root>
        -->
        <div class="flex flex-row gap-4 md:hidden">
            <a href="/"
                class={`w-full text-left items-center hover:text-black justify-start font-medium text-sm flex text-nowrap flex-row gap-3 duration-200 rounded-xl ${
                    page.url.pathname === '/' ? 'text-black font-medium' : 'text-muted-foreground'
                }`}
            >
                Businesses
            </a>

            <button
                class={`w-full text-left items-center hover:text-black justify-start font-medium text-sm flex text-nowrap flex-row gap-3 duration-200 rounded-xl ${
                    page.url.pathname === '/service-provider' ? 'text-black font-medium' : 'text-muted-foreground'
                }`}
            >
                Service Providers
            </button>
        </div>
        <a href="/" class="flex-row gap-3 items-center hidden md:flex w-64 justify-start">
            <img src={Logo} alt="Verus Datum" class="w-10 h-10 rounded-lg" />
            <h1 class="font-bold">Verus Datum</h1>
        </a>
        <section class="{page.url.pathname !== "/" ? "hidden" : "hidden md:flex"} relative h-full w-full md:w-[25rem] items-center justify-center flex-row">
            <div
                class="absolute bottom-0 h-0.5 bg-black transition-all duration-300"
                style:width="{active === 'business' ? '50%' : '50%'}"
                style:left="{active === 'business' ? '0px' : '50%'}"
            />

            <a href="/"
                class="{active !== 'business' ? 'text-muted-foreground font-semibold' : 'font-bold'} text-sm duration-200 flex flex-row gap-3 px-2 w-full justify-center items-center h-full"
            >
                <Briefcase />
                <p>Businesses to Buy</p>
            </a>
            <button
                class="{active === 'business' ? 'text-muted-foreground font-semibold' : 'font-bold'} text-sm duration-200 flex flex-row gap-3 w-full justify-center px-5 items-center h-full"
            >
                <Provider />
                <p>Service Providers</p>
            </button>
        </section>    
        <section class="flex flex-row gap-6 flex w-64 justify-end">
            <!--
                <NotificationsDropdown />
            -->
            <UserDropdown />
        </section>
    </nav>

    {#if page.url.pathname === "/"}
        {@render children?.()}
    {/if}
</div>