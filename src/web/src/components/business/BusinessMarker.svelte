<script lang="ts">
	import type { Business } from "$types/Business";
	import { onMount, type Snippet } from "svelte";
    import { MediaQuery } from "svelte/reactivity";
    import MapPin from "@lucide/svelte/icons/map-pin";
    import Provider from "@lucide/svelte/icons/life-buoy";
	import { Button } from "$components/ui/button";
    import Chevron from "@lucide/svelte/icons/chevron-left";
    import Cash from "@lucide/svelte/icons/circle-dollar-sign"
	import { AspectRatio } from "$components/ui/aspect-ratio";
	import maplibregl from "maplibre-gl";
    import * as Popover from "$components/ui/popover";
    import * as Drawer from "$components/ui/drawer";
    import * as Carousel from "$components/ui/carousel";
    import Info from "@lucide/svelte/icons/info";
	import { FloatingPanelState } from "$states/FloatingPanel.svelte";
	import FloatingPanel from "$components/ui/floating-panel/floating-panel.svelte";

    type Props = {
        business: Business;
        map: maplibregl.Map;
    }

    let { business, map }: Props = $props();

    let container = $state<HTMLDivElement | undefined>();

    const formatCurrency = (num: number) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0
		}).format(num);

    onMount(() => {
		if (!map || !container) return;
        
		const marker = new maplibregl.Marker({ element: container })
			.setLngLat({
                lng: business.longitude,
                lat: business.latitude
            })
			.addTo(map);

		return () => marker.remove();
	});

    const isDesktop = new MediaQuery("(min-width: 768px)");
    let isOpen = $state(false);
    let isSelected = $state(false);
    let isOpenDrawer = $state(false);

    $effect(() => {
        if (isOpen === false && isSelected === true && FloatingPanelState.open !== true) {
            isSelected = false;
        }
    })

    let exmplImgs = [
        "https://media.istockphoto.com/id/1428594094/photo/empty-coffee-shop-interior-with-wooden-tables-coffee-maker-pastries-and-pendant-lights.jpg?s=612x612&w=0&k=20&c=dMqeYCJDs3BeBP_jv93qHRISDt-54895SPoVc6_oJt4=",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/R%C3%B6e_g%C3%A5rd_caf%C3%A9_2.jpg/1200px-R%C3%B6e_g%C3%A5rd_caf%C3%A9_2.jpg",
        "https://blog.rotacloud.com/content/images/2022/08/tony-lee-8IKf54pc3qk-unsplash-1.jpg"
    ]
</script>

{#snippet MarkerContent()}
    <header>
        <h1 class="font-semibold py-2 text-lg">
            {business.name}
        </h1>
        <h2 class="flex flex-row font-medium text-primary py-1 gap-1 items-center">
            <MapPin size={24} />
            {business.address}
        </h2>
        <h2 class="flex flex-row font-medium text-primary py-1 gap-1 items-center">
            <Provider size={24} />
            {business.market}
        </h2>
    </header>

    <section class="py-5">
        <h1 class="font-semibold text-primary text-2xl">
            {formatCurrency(business.asking_price)}
        </h1>
        <p class="font-semibold text-muted-foreground/65">
            asking price
        </p>
    </section>

    <footer class="w-full flex flex-row gap-2">
        <Button onclick={() => {
            isOpen = false;
            isSelected = true;
            isOpenDrawer = false;
            FloatingPanelState.open = true;
            FloatingPanelState.snippet = LearnMoreContent;
        }} class="w-full font-semibold bg-blue-flat text-blue-foreground hover:bg-blue-muted/30">
            Learn More
        </Button>
        <Button class="w-full">
            Request Contact
        </Button>
    </footer>
{/snippet}

{#snippet LearnMoreContent()}
    <!--
    <button onclick={() => {
        if (isDesktop.current) {
            FloatingPanelState.open = false;
            FloatingPanelState.displaySnippet("businesses");
            setTimeout(() => {
                FloatingPanelState.open = true;
            }, 250);
        } else {
            
        }
    }} class="flex pb-5 pt-1 text-left hover:text-foreground/80 duration-200 flex-row gap-2 font-medium items-center justify-center">
        <Chevron size={24} />
        Show All
    </button>
    -->

    <header>
        <h1 class="font-semibold py-1 text-2xl">
            {business.name}
        </h1>
        <h2 class="flex flex-row text-muted-foreground font-medium gap-2 items-center">
            {business.contact_method}
        </h2>
    </header>

    <div class="grid grid-rows-3 grid-cols-[auto,1fr] pt-5 gap-y-4 gap-x-4 items-center">
        <div class="flex items-center gap-2 text-muted-foreground font-medium">
            <MapPin size={24} />
            Location:
        </div>
        <div class="text-left font-medium text-nowrap">{business.address}</div>

        <div class="flex items-center gap-2 text-muted-foreground font-medium">
            <Provider size={24} />
            Market:
        </div>
        <div class="text-left font-medium">{business.market}</div>

        <div class="flex items-center gap-2 text-muted-foreground font-medium">
            <Cash size={24} />
            Revenue:
        </div>
        <div class="text-left font-medium">{formatCurrency(business.revenue_per_yr)} / yr</div>
    </div>

    <div class="py-6">
        <h1 class="font-semibold text-primary text-2xl">
            {formatCurrency(business.asking_price)}
        </h1>
        <h2 class="font-medium text-muted-foreground">
            asking price
        </h2>
    </div>

    <div class="flex items-center gap-2 text-muted-foreground font-medium">
        <Info size={24} />
        About
    </div>

    <Carousel.Root class="w-full py-6">
        <Carousel.Content class="flex w-full">
            {#each exmplImgs as imgUrl}
                <Carousel.Item class="w-full basis-[85%] shrink-0 grow-0">
                    <img src={imgUrl} alt="Cafe" class="object-cover w-full h-48 rounded-lg" />
                </Carousel.Item>
            {/each}
        </Carousel.Content>
    </Carousel.Root>

    <footer class="w-full flex flex-row justify-end gap-2">
        <Button class="w-2/5">
            Request Contact
        </Button>
    </footer>
{/snippet}

{#snippet Marker()}
    <div class="bg-white scale-75 h-9 w-9 flex items-center justify-center rounded-full">
        <div class={`${isSelected ? "bg-orange" : "bg-primary"} duration-200 w-6 h-6 flex items-center justify-center rounded-full`}>
            <div class="bg-white h-4 w-4 flex items-center justify-center rounded-full" />
        </div>
    </div>
{/snippet}

<div bind:this={container}>
    {#if isDesktop.current}
        <Popover.Root bind:open={isOpen}>
            <Popover.Trigger onclick={() => {
                isSelected = !isSelected;
            }}>
                {@render Marker()}
            </Popover.Trigger>
            <Popover.Content class="bg-white p-4 rounded-xl shadow-ui w-[27rem] relative">
                {@render MarkerContent()}
            </Popover.Content>
        </Popover.Root>
    {:else}
        <Drawer.Root bind:open={isOpenDrawer}>
            <Drawer.Trigger>
                {@render Marker()}
            </Drawer.Trigger>
            <Drawer.Content class="px-4 shadow-ui">
                <div class="mt-2 mb-4">
                    {@render MarkerContent()}
                </div>
            </Drawer.Content>
        </Drawer.Root>
    {/if}
</div>