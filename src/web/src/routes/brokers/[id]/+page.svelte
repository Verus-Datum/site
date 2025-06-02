<script lang="ts">
	import type { Broker } from '$types/Broker';
	import { fly } from 'svelte/transition';
	import { formatCurrency } from '$utils/currency';
	import Button from '$components/ui/button/button.svelte';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let broker = $derived<Broker>(data.broker);
</script>

<main
	in:fly={{ y: 20, duration: 650 }}
	class="mx-auto flex w-full flex-col items-start justify-start gap-8 px-4 pt-24 md:w-[100%] lg:w-[80%] 2xl:w-[60%] 3xl:w-[40%]"
>
	<nav class="relative flex w-full flex-row items-center justify-between">
		<button onclick={() => history.back()} class="flex flex-row items-center gap-2 font-medium">
			<ArrowLeft size={20} class="" />
			Back
		</button>
		<h1 class="absolute left-1/2 -translate-x-1/2 transform font-semibold">Broker Profile</h1>
		<button>
			<Ellipsis size={24} class="" />
		</button>
	</nav>

	<section class="flex w-full flex-col gap-8">
		<header class="flex flex-row items-center gap-6">
			<img src={broker.avatar_url} class="h-24 w-24 rounded-xl object-cover" />
			<div>
				<h1 class="py-1 text-xl md:text-2xl font-semibold">
					{broker.name}
				</h1>
				<h2 class="flex flex-row items-center gap-2 font-medium text-muted-foreground">
					{broker.title} <span class="text-muted-foreground/60">at</span>
					{broker.company}
				</h2>
			</div>
		</header>

		<div class="flex w-full flex-col gap-6 md:flex-row">
			<div class="flex flex-col">
				<span class="text-sm md:text-base font-medium text-muted-foreground">Market</span>
				<p class="text-lg font-semibold">
					{broker.market}
				</p>
			</div>
			<div class="flex flex-col">
				<span class="text-sm md:text-base font-medium text-muted-foreground">Address</span>
				<p class="text-lg font-semibold">
					{broker.address}
				</p>
			</div>
			<div class="flex flex-col">
				<span class="text-sm md:text-base font-medium text-muted-foreground">Deal Size</span>
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
				<h2 class="text-sm md:text-ba se font-medium text-muted-foreground">deals closed</h2>
			</div>
			<div class="flex h-6 w-full flex-col items-center justify-center gap-1 text-center">
				<h1 class="text-xl md:text-2xl font-semibold text-primary">${broker.stats.wentThrough}M</h1>
				<h2 class="text-sm md:text-base font-medium text-muted-foreground">went through</h2>
			</div>
		</div>

		<div class="mt-2 flex items-center gap-2 font-medium text-muted-foreground">Services:</div>

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
			Follow Broker
		</Button>
		<Button class="w-full py-6 font-medium">Contact Broker</Button>
	</footer>
</main>
