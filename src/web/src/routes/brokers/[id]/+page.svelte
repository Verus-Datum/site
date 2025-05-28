<script lang="ts">
	import type { Broker } from '$types/Broker';
	import { fly } from 'svelte/transition';
	import { formatCurrency } from '$utils/currency';
	import Button from '$components/ui/button/button.svelte';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
    import type { PageProps } from './$types'

    let { data }: PageProps = $props();
    let broker = $derived<Broker>(data.broker);
</script>

<main in:fly={{ y: 20, duration: 650 }} class="pt-24 w-full md:w-[100%] lg:w-[80%] 2xl:w-[60%] 3xl:w-[40%] px-4 mx-auto flex-col gap-8 flex items-start justify-start">
	<nav class="w-full relative flex md:py-6 flex-row justify-between items-center">
		<button onclick={() => history.back()} class="font-medium flex flex-row gap-2 items-center">
			<ArrowLeft size={20} class="text-muted-foreground" />
			Back
		</button>
		<h1 class="absolute left-1/2 font-medium transform -translate-x-1/2">
			Broker Profile
		</h1>
		<button>
			<Ellipsis size={24} class="text-muted-foreground" />
		</button>
	</nav>

	<section class="w-full flex flex-col gap-8">
		<header class="flex flex-row gap-6 items-center">
            <img src={broker.avatar_url} class="w-24 h-24 rounded-xl object-cover" />
			<div>
                <h1 class="font-semibold py-1 text-2xl">
                    {broker.name}
                </h1>
                <h2 class="flex flex-row text-muted-foreground font-medium gap-2 items-center">
                    {broker.title} <span class="text-muted-foreground/60">at</span> {broker.company}
                </h2>
            </div>
		</header>

		<div class="w-full flex flex-col md:flex-row gap-6">
			<div class="flex flex-col">
				<span class="text-base text-muted-foreground font-medium">Market</span>
				<p class="text-lg font-semibold">
					{broker.market}
				</p>
			</div>
			<div class="flex flex-col">
				<span class="text-base text-muted-foreground font-medium">Address</span>
				<p class="text-lg font-semibold">
					{broker.address}
				</p>
			</div>
			<div class="flex flex-col">
				<span class="text-base text-muted-foreground font-medium">Deal Size</span>
				<p class="text-lg font-semibold">
					{formatCurrency(broker.stats.dealSizeRng[0])} – {formatCurrency(broker.stats.dealSizeRng[1])}
				</p>
			</div>
		</div>

		<div class="flex items-center gap-2 text-muted-foreground font-medium">
			Key Stats:
		</div>

		<div class="flex flex-row gap-4 py-4 w-full px-0 justify-between">
			<div class="flex flex-col text-center gap-1 items-center w-full justify-center h-6">
				<h1 class="text-2xl text-primary font-semibold">{broker.stats.yrsInSphere}yrs</h1>
				<h2 class="text-muted-foreground font-medium">in sphere</h2>
			</div>
			<div class="flex flex-col text-center gap-1 items-center w-full justify-center h-6 border-l border-opacity-80 border-r">
				<h1 class="text-2xl text-primary font-semibold">{broker.stats.dealsClosed}</h1>
				<h2 class="text-muted-foreground font-medium">deals closed</h2>
			</div>
			<div class="flex flex-col text-center gap-1 items-center w-full justify-center h-6">
				<h1 class="text-2xl text-primary font-semibold">${broker.stats.wentThrough}M</h1>
				<h2 class="text-muted-foreground font-medium">went through</h2>
			</div>
		</div>

		<div class="flex items-center gap-2 mt-2 text-muted-foreground font-medium">
			Services:
		</div>

		<div class="w-full max-h-64 overflow-y-auto pl-6 hide-scrollbar flex flex-col">
			{#each broker.services as service}
				<h1 class="py-3 border-b font-medium">
					{service}
				</h1>
			{/each}
		</div>
	</section>

	<footer class="w-full flex flex-row gap-4 pb-12 lg:w-1/2 2xl:w-1/3 lg:ml-auto">
		<Button class="w-full py-6 font-semibold bg-blue-flat hover:bg-blue-flat/70 text-blue-foreground">
			Follow Broker
		</Button>
		<Button class="w-full py-6 font-medium">
			Contact Broker
		</Button>
	</footer>
</main>
