<script lang="ts">
	import type { Business } from '$types/Business';
	import { onMount } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Provider from '@lucide/svelte/icons/life-buoy';
	import { Button } from '$components/ui/button';
	import Cash from '@lucide/svelte/icons/circle-dollar-sign';
	import maplibregl from 'maplibre-gl';
	import * as Popover from '$components/ui/popover';
	import * as Drawer from '$components/ui/drawer';
	import * as Carousel from '$components/ui/carousel';
	import Info from '@lucide/svelte/icons/info';
	import { FloatingPanelState } from '$states/FloatingPanel.svelte';
	
type Props = {
		business: Business;
		map: maplibregl.Map;
	};

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

	const isDesktop = new MediaQuery('(min-width: 768px)');
	let isOpen = $state(false);
	let isSelected = $state(false);
	let isOpenDrawer = $state(false);

	$effect(() => {
		if (isOpen === false && isSelected === true && FloatingPanelState.open !== true) {
			isSelected = false;
		}
	});

	let exmplImgs = [
		'https://media.istockphoto.com/id/1428594094/photo/empty-coffee-shop-interior-with-wooden-tables-coffee-maker-pastries-and-pendant-lights.jpg?s=612x612&w=0&k=20&c=dMqeYCJDs3BeBP_jv93qHRISDt-54895SPoVc6_oJt4=',
		'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/R%C3%B6e_g%C3%A5rd_caf%C3%A9_2.jpg/1200px-R%C3%B6e_g%C3%A5rd_caf%C3%A9_2.jpg',
		'https://blog.rotacloud.com/content/images/2022/08/tony-lee-8IKf54pc3qk-unsplash-1.jpg'
	];
</script>

{#snippet MarkerContent()}
	<header>
		<h1 class="py-2 text-xl font-semibold">
			{business.name}
		</h1>
		<h2 class="flex flex-row items-center gap-2 py-1 font-medium text-primary">
			<MapPin size={20} />
			{business.address}
		</h2>
		<h2 class="flex flex-row items-center gap-2 py-1 font-medium text-primary">
			<Provider size={20} />
			{business.market}
		</h2>
	</header>

	<section class="py-6">
		<h1 class="text-2xl font-semibold text-primary">
			{formatCurrency(business.asking_price)}
		</h1>
		<p class="font-semibold text-muted-foreground/65">asking price</p>
	</section>

	<footer class="flex w-full flex-row gap-3">
		<Button
			href={`/listings/example`}
			onclick={() => {
				isOpen = false;
				isOpenDrawer = false;
				/* isOpen = false;
            isSelected = true;
            isOpenDrawer = false;
            FloatingPanelState.open = true;
            FloatingPanelState.snippet = LearnMoreContent; */
			}}
			class="flex w-full bg-blue-flat font-semibold text-blue-foreground hover:bg-blue-muted/30 md:hidden"
		>
			Learn More
		</Button>
		<Button
			onclick={() => {
				isOpen = false;
				isSelected = true;
				isOpenDrawer = false;
				FloatingPanelState.open = true;
				FloatingPanelState.snippet = LearnMoreContent;
			}}
			class="hidden w-full bg-blue-flat font-semibold text-blue-foreground hover:bg-blue-muted/30 md:flex"
		>
			Learn More
		</Button>
		<Button class="w-full">Request Contact</Button>
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
		<h1 class="py-1 text-2xl font-semibold">
			{business.name}
		</h1>
		<h2 class="flex flex-row items-center gap-2 font-medium text-muted-foreground">
			{business.contact_method}
		</h2>
	</header>

	<div class="grid grid-cols-[auto,1fr] grid-rows-3 items-center gap-x-4 gap-y-4 pt-5">
		<div class="flex items-center gap-2 font-medium text-muted-foreground">
			<MapPin size={24} />
			Location:
		</div>
		<div class="text-nowrap text-left font-medium">{business.address}</div>

		<div class="flex items-center gap-2 font-medium text-muted-foreground">
			<Provider size={24} />
			Market:
		</div>
		<div class="text-left font-medium">{business.market}</div>

		<div class="flex items-center gap-2 font-medium text-muted-foreground">
			<Cash size={24} />
			Revenue:
		</div>
		<div class="text-left font-medium">{formatCurrency(business.revenue_per_yr)} / yr</div>
	</div>

	<div class="py-6">
		<h1 class="text-2xl font-semibold text-primary">
			{formatCurrency(business.asking_price)}
		</h1>
		<h2 class="font-medium text-muted-foreground">asking price</h2>
	</div>

	<div class="flex items-center gap-2 font-medium text-muted-foreground">
		<Info size={24} />
		About
	</div>

	<Carousel.Root class="w-full py-6">
		<Carousel.Content class="flex w-full">
			{#each exmplImgs as imgUrl}
				<Carousel.Item class="w-full shrink-0 grow-0 basis-[85%]">
					<img src={imgUrl} alt="Cafe" class="h-48 w-full rounded-lg object-cover" />
				</Carousel.Item>
			{/each}
		</Carousel.Content>
	</Carousel.Root>

	<footer class="flex w-full flex-row justify-end gap-2">
		<Button
			onclick={() => {
				FloatingPanelState.open = false;
			}}
			href={`/listings/example`}
			class="w-full bg-blue-flat font-semibold text-blue-foreground hover:bg-blue-flat/70"
		>
			View Listing
		</Button>
		<Button class="w-full">Request Contact</Button>
	</footer>
{/snippet}

{#snippet Marker()}
	<div
		class="flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-white dark:bg-border/80"
	>
		<div
			class={`${isSelected ? 'bg-orange' : 'bg-primary'} flex h-6 w-6 items-center justify-center rounded-full duration-200`}
		>
			<div
				class="flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-border/80"
			/>
		</div>
	</div>
{/snippet}

<div bind:this={container}>
	{#if isDesktop.current}
		<Popover.Root bind:open={isOpen}>
			<Popover.Trigger
				onclick={() => {
					isSelected = !isSelected;
				}}
			>
				{@render Marker()}
			</Popover.Trigger>
			<Popover.Content class="shadow-ui relative w-[28.5rem] rounded-xl bg-card p-5">
				{@render MarkerContent()}
			</Popover.Content>
		</Popover.Root>
	{:else}
		<Drawer.Root bind:open={isOpenDrawer}>
			<Drawer.Trigger>
				{@render Marker()}
			</Drawer.Trigger>
			<Drawer.Content class="shadow-ui px-4">
				<div class="mb-4 mt-2">
					{@render MarkerContent()}
				</div>
			</Drawer.Content>
		</Drawer.Root>
	{/if}
</div>
