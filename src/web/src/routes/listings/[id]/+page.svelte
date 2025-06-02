<script lang="ts">
	import type { Business } from '$types/Business';
	import type { PageProps } from './$types';
	import { fly } from 'svelte/transition';
	import * as Carousel from '$components/ui/carousel';
	import { type CarouselAPI } from '$components/ui/carousel/context';
	import { Badge } from '$components/ui/badge';
	import { formatCurrency } from '$utils/currency';
	import Button from '$components/ui/button/button.svelte';
	import type { Broker } from '$types/Broker';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';

	let { data }: PageProps = $props();

	let listing = $derived<Business>(data.listing);
	let broker = $derived<Broker>(listing.broker);
	let carouselAPI = $state<CarouselAPI>();
	let current = $state(0);

	$effect(() => {
		if (carouselAPI) {
			current = carouselAPI.selectedScrollSnap() + 1;
			carouselAPI.on('select', () => {
				current = carouselAPI!.selectedScrollSnap() + 1;
			});
		}
	});

	let images = [
		'https://www.upmenu.com/wp-content/uploads/2022/08/Small-Cafe-Interior-Design.jpg',
		'https://weadesign.com/wp-content/uploads/2024/01/office-interior-designs.webp',
		'https://www.avantisystemsusa.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-08-at-3.08.52-PM.png',
		'https://images.squarespace-cdn.com/content/v1/5d6d67f2387da800015dc00e/e242ea2f-e67f-4991-85bc-6c07b48bcc73/Jude_WetCoffee_-6.jpg',
		'https://www.blankcreatives.com.au/wp-content/uploads/2022/12/Wonderwood-cafe_09_WEB.jpg'
	];
</script>

<main
	in:fly={{ y: 20, duration: 650 }}
	class="mx-auto flex w-full flex-col items-start justify-start gap-8 px-4 pt-[6rem] md:pt-[6.5rem] md:w-[100%] lg:w-[80%] 2xl:w-[60%] 3xl:w-[50%]"
>
	<nav class="relative flex w-full flex-row items-center justify-between">
		<button onclick={() => history.back()} class="flex flex-row items-center gap-2 font-medium">
			<ArrowLeft size={20} class="" />
			Back
		</button>
		<h1 class="absolute left-1/2 -translate-x-1/2 transform font-semibold">View Listing</h1>
		<button>
			<Ellipsis size={24} class="" />
		</button>
	</nav>

	<Carousel.Root setApi={(emblaApi) => (carouselAPI = emblaApi)}>
		<Carousel.Content>
			{#each images as img}
				<Carousel.Item class="lg:basis-1/2 3xl:basis-1/3">
					<img
						src={img}
						alt="Company"
						class="md:h-72 h-48 w-full shrink-0 rounded-lg object-cover"
					/>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Badge class="absolute bottom-4 right-4 lg:hidden">
			{current} / {images.length}
		</Badge>
	</Carousel.Root>

	<div class="flex w-full flex-col gap-8 md:flex-row md:justify-between">
		<header class="w-full">
			<h1 class="flex w-full flex-col items-start text-2xl md:text-3xl font-bold">
				{listing.name}
				<p class="font-medium text-muted-foreground md:text-base text-sm">
					Broker {broker.name}
				</p>
			</h1>
		</header>

		<div class="w-full md:flex md:flex-col md:items-end">
			<h1 class="text-2xl md:text-3xl font-bold text-primary">
				{formatCurrency(listing.asking_price)}
			</h1>
			<p class="font-medium text-muted-foreground md:text-base text-sm">asking price</p>
		</div>
	</div>

	<div class="flex w-full flex-col gap-2 md:flex-row md:gap-6">
		<div class="flex flex-col">
			<span class="font-medium text-muted-foreground md:text-base text-sm">Location</span>
			<p class="text-lg font-semibold">
				{listing.address}
			</p>
		</div>
		<div class="flex flex-col">
			<span class="font-medium text-muted-foreground md:text-base text-sm">Market</span>
			<p class="text-lg font-semibold">
				{listing.market}
			</p>
		</div>
	</div>

	<div class="flex w-full flex-row gap-6">
		<div class="flex flex-col">
			<span class="font-medium text-muted-foreground md:text-base text-sm">Revenue / Yr</span>
			<p class="text-lg font-semibold">
				{formatCurrency(listing.revenue_per_yr)}
			</p>
		</div>
		<div class="flex flex-col">
			<span class="font-medium text-muted-foreground md:text-base text-sm">Gross / Yr</span>
			<p class="text-lg font-semibold">
				{formatCurrency(listing.gross_per_yr)}
			</p>
		</div>
		<div class="flex flex-col">
			<span class="font-medium text-muted-foreground md:text-base text-sm">Profit / Yr</span>
			<p class="text-lg font-semibold">
				{formatCurrency(listing.profit_per_yr)}
			</p>
		</div>
	</div>

	<section class="mt-4 flex w-full flex-col gap-8 border-t pt-6">
		<header>
            <h3 class="text-muted-foreground text-sm md:text-base font-medium">
                About the broker
            </h3>
			<h1 class="py-1 text-2xl font-semibold">
				{broker.name}
			</h1>
			<h2 class="flex flex-row items-center gap-2 font-medium text-muted-foreground">
				{broker.title} <span class="text-muted-foreground/60">at</span>
				{broker.company}
			</h2>
		</header>

		<div class="flex w-full flex-col gap-6 md:flex-row">
			<div class="flex flex-col">
				<span class="font-medium text-muted-foreground md:text-base text-sm">Market</span>
				<p class="text-lg font-semibold">
					{broker.market}
				</p>
			</div>
			<div class="flex flex-col">
				<span class="font-medium text-muted-foreground md:text-base text-sm">Address</span>
				<p class="text-lg font-semibold">
					{broker.address}
				</p>
			</div>
			<div class="flex flex-col">
				<span class="font-medium text-muted-foreground md:text-base text-sm">Deal Size</span>
				<p class="text-lg font-semibold">
					{formatCurrency(broker.stats.dealSizeRng[0])} – {formatCurrency(
						broker.stats.dealSizeRng[1]
					)}
				</p>
			</div>
		</div>

		<div class="flex items-center gap-2 text-sm md:text-base font-medium text-muted-foreground">Key Stats:</div>

		<div class="flex w-full flex-row justify-between gap-4 px-0 py-4">
			<div class="flex h-6 w-full flex-col items-center justify-center gap-1 text-center">
				<h1 class="text-xl md:text-2xl font-semibold text-primary">{broker.stats.yrsInSphere}yrs</h1>
				<h2 class="text-sm md:text-base font-medium text-muted-foreground">in sphere</h2>
			</div>
			<div
				class="flex h-6 w-full flex-col items-center justify-center gap-1 border-l border-r border-opacity-80 text-center"
			>
				<h1 class="text-xl md:text-2xl font-semibold text-primary">{broker.stats.dealsClosed}</h1>
				<h2 class="text-sm md:text-base font-medium text-muted-foreground">deals closed</h2>
			</div>
			<div class="flex h-6 w-full flex-col items-center justify-center gap-1 text-center">
				<h1 class="text-xl md:text-2xl font-semibold text-primary">${broker.stats.wentThrough}M</h1>
				<h2 class="text-sm md:text-base font-medium text-muted-foreground">went through</h2>
			</div>
		</div>

		<div class="mt-2 flex items-center gap-2 text-sm md:text-base font-medium text-muted-foreground">Services:</div>

		<div class="hide-scrollbar flex max-h-64 w-full flex-col overflow-y-auto pl-6">
			{#each broker.services as service}
				<h1 class="border-b py-3 font-medium">
					{service}
				</h1>
			{/each}
		</div>
	</section>

	<footer class="flex w-full flex-row gap-4 pb-12 lg:ml-auto lg:w-1/2 2xl:w-1/3">
		<Button
			class="w-full bg-blue-flat py-6 font-semibold text-blue-foreground hover:bg-blue-flat/70"
		>
			Watch Listing
		</Button>
		<Button class="w-full py-6 font-medium">Request Contact</Button>
	</footer>
</main>
