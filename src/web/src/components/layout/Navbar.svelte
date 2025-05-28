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
    import MapIcon from "@lucide/svelte/icons/map";
    import Menu from "@lucide/svelte/icons/menu"
    import * as Sheet from "$components/ui/sheet";
    import Laptop from "@lucide/svelte/icons/laptop";
    import transparent from '$assets/transparent.png';
    import { browser } from "$app/environment";

    let {
        children
    }: {
        children: Snippet
    } = $props();

    const ignoredPages = [
        "/login",
        "/register"
    ]

    let sheetOpen = $state<boolean>(false);

    let active = $derived(
        page.url.pathname === "/" 
            ? "business" 
            : page.url.pathname === "/listings" 
                ? "all" 
                : ""
    );
    let exampleUrl = "https://media.istockphoto.com/id/1413766112/photo/successful-mature-businessman-looking-at-camera-with-confidence.jpg?s=612x612&w=0&k=20&c=NJSugBzNuZqb7DJ8ZgLfYKb3qPr2EJMvKZ21Sj5Sfq4=";
</script>

<div class="w-screen z-40 bg-background flex justify-center flex-col absolute top-0 left-0">
    <nav class="w-full flex items-center justify-between px-4 md:px-6 relative border-b h-[4rem] md:h-[4.5rem]">
        <Sheet.Root bind:open={sheetOpen}>
            <Sheet.Trigger class="flex text-muted-foreground flex-row gap-2 items-center md:hidden">
                <Menu size={24} />
            </Sheet.Trigger>
            <Sheet.Content side="left" class="p-3">
                <Sheet.Header>
                    <a href="/" class="flex flex-row text-primary gap-2 md:hidden items-center">
                        <div class="w-11 h-11 bg-primary" style={`-webkit-mask-image: url(${transparent}); mask-image: url(${transparent}); -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: contain; mask-size: contain; -webkit-mask-position: center; mask-position: center;`}></div>
                        <h1 class="font-semibold whitespace-nowrap text-black">Verus Datum</h1>
                    </a>
                </Sheet.Header>
                <div class="py-4 flex flex-col gap-0.5">
                    <a onclick={() => sheetOpen = false} href="/"
                        class={`w-full text-left items-center justify-start p-3 text-sm flex flex-row gap-3 hover:bg-secondary duration-200 rounded-xl ${
                            page.url.pathname === '/' ? 'text-black font-medium' : 'text-muted-foreground'
                        }`}
                    >
                        <MapIcon size={24} />
                        Map View
                    </a>

                    <a onclick={() => sheetOpen = false} href="/listings"
                        class={`w-full text-left items-center justify-start p-3 text-sm flex flex-row gap-3 hover:bg-secondary duration-200 rounded-xl ${
                            page.url.pathname === '/listings' ? 'text-foreground font-medium' : 'text-muted-foreground'
                        }`}
                    >
                        <Briefcase size={24} />
                        All Businesses      
                    </a>
                </div>
            </Sheet.Content>
        </Sheet.Root>
        <a href="/" class="absolute left-1/2 transform -translate-x-1/2 flex flex-row text-primary gap-2 md:hidden items-center">
            <div class="w-11 h-11 bg-primary" style={`-webkit-mask-image: url(${transparent}); mask-image: url(${transparent}); -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: contain; mask-size: contain; -webkit-mask-position: center; mask-position: center;`}></div>
            <h1 class="font-semibold whitespace-nowrap text-foreground">Verus Datum</h1>
        </a>
        <a href="/" class="flex-row text-primary gap-2 hidden md:flex items-center">
            <div class="w-11 h-11 bg-primary" style={`-webkit-mask-image: url(${transparent}); mask-image: url(${transparent}); -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: contain; mask-size: contain; -webkit-mask-position: center; mask-position: center;`}></div>
            <h1 class="font-semibold whitespace-nowrap text-foreground">Verus Datum</h1>
        </a>
        <section class="{ignoredPages.includes(page.url.pathname) ? "hidden" : "hidden md:flex"} absolute left-1/2 -translate-x-1/2 h-full w-full md:w-[25rem] items-center justify-center flex-row">
            <div
                class="absolute bottom-0 h-0.5 bg-foreground transition-all duration-300 {active !== "business" && active !== "all" ? "hidden" : ""}"
                style:width="{active === 'business' ? '50%' : '50%'}"
                style:left="{active === 'business' ? '0px' : '50%'}"
            />
            <a href="/"
                onclick={() => active = 'business'}
                class="{active !== 'business' ? 'text-muted-foreground font-semibold' : 'font-bold'} text-sm duration-200 flex flex-row gap-3 px-2 w-full justify-center items-center h-full"
            >
                <MapIcon size={24} />
                Map View
            </a>
            <a href="/listings"
                onclick={() => active = 'all'}
                class="{active !== 'all' ? 'text-muted-foreground font-semibold' : 'font-bold'} text-sm duration-200 flex flex-row gap-3 px-2 w-full justify-center items-center h-full"
            >
                <Briefcase size={24} />
                All Businesses            
            </a>
        </section>    
        <section class="flex-row overflow-visible gap-6 flex w-64 justify-end">
            <!--
                <NotificationsDropdown />
            -->
            <UserDropdown />
        </section>
    </nav>
</div>