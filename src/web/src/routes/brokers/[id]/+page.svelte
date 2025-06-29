<script lang="ts">
	import type { Broker } from '$types/Broker';
	import { fly } from 'svelte/transition';
	import { formatCurrency } from '$utils/currency';
	import Button from '$components/ui/button/button.svelte';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import TrendingUp from '@lucide/svelte/icons/trending-up';
	import Star from '@lucide/svelte/icons/star';
	import Phone from '@lucide/svelte/icons/phone';
	import Mail from '@lucide/svelte/icons/mail';
	import User from '@lucide/svelte/icons/user';
	import Briefcase from '@lucide/svelte/icons/briefcase';
	import Heart from '@lucide/svelte/icons/heart';
	import Share from '@lucide/svelte/icons/share-2';
	import Calendar from '@lucide/svelte/icons/calendar';
	import Building from '@lucide/svelte/icons/building';
	import Dollar from '@lucide/svelte/icons/badge-dollar-sign'

	let { data }: PageProps = $props();
	let broker = $derived<Broker>(data.broker);
</script>

<main in:fly={{ y: 20, duration: 500 }} class="width mx-auto flex flex-col gap-8 mt-4 pb-12 px-4">
	<nav class="flex w-full sm:mt-0 mt-20 flex-row items-center justify-between gap-4">
        <div class="flex flex-row gap-4">
            <button onclick={() => history.back()} class="flex flex-row items-center gap-2 font-medium">
                <ArrowLeft size={16} />
            </button>
            <header>
                <h1 class="font-semibold">Broker Details</h1>
                <h1 class="text-sm text-muted-foreground">{broker.name}</h1>
            </header>
        </div>
        <div class="flex flex-row gap-3 items-center">
            <button class="py-2 px-4 hidden sm:flex h-8 hover:bg-secondary/60 font-medium duration-200 flex flex-row gap-2 items-center bg-secondary border rounded-md text-xs">
                <Heart size={12} />
                Save
            </button>
            <button class="py-2 px-4 hidden sm:flex h-8 hover:bg-secondary/60 font-medium duration-200 flex flex-row gap-2 items-center bg-secondary border rounded-md text-xs">
                <Share size={12} />
                Share
            </button>
            <button>
                <Ellipsis size={16} />
            </button>
        </div>
	</nav>
	
	<section class="flex flex-col lg:flex-row gap-5">
		<section class="w-full lg:w-[70%] flex flex-col gap-6">
			<div class="flex flex-row gap-6 items-center">
				<img src={broker.avatar_url} class="h-24 w-24 rounded-xl object-cover" />
				<div class="flex flex-col gap-1">
					<h1 class="text-2xl font-bold">{broker.name}</h1>
					<h2 class="text-muted-foreground font-medium">{broker.title} at {broker.company}</h2>
					<span class="text-xs font-medium rounded-md px-2 py-1 bg-blue-flat text-blue-foreground w-fit">Top Performer</span>
				</div>
			</div>

			<div class="py-10 mt-2 sm:flex flex-wrap border rounded-lg sm:justify-evenly flex justify-center gap-8">
				<div class="flex flex-col gap-1 items-center">
					<Dollar size={22} class="text-muted-foreground/80" />
					<h1 class="font-semibold">{broker.market}</h1>
					<h2 class="text-sm text-muted-foreground">Market</h2>
				</div>
				<div class="flex flex-col gap-1 items-center">  
					<Building size={22} class="text-muted-foreground/80" />
					<h1 class="font-semibold">{broker.address}</h1>
					<h2 class="text-sm text-muted-foreground">Address</h2>
				</div>
				<div class="flex flex-col gap-1 items-center">
					<TrendingUp size={22} class="text-muted-foreground/80" />
					<h1 class="font-semibold text-center">{formatCurrency(broker.stats.dealSizeRng[0])} - {formatCurrency(broker.stats.dealSizeRng[1])}</h1>
					<h2 class="text-sm text-muted-foreground">Deal Size</h2>
				</div>
			</div>

            <div class="rounded-lg border p-5 flex flex-col sm:flex-row gap-5 items-center justify-center w-full">
				<div class="w-full p-8 items-center gap-0.5 justify-center text-center flex flex-col bg-blue-flat rounded-lg">
					<h1 class="text-xl font-bold text-primary">{broker.stats.yrsInSphere} yrs</h1>
					<p class="text-sm text-muted-foreground">In Sphere</p>
				</div>
				<div class="w-full p-8 items-center gap-0.5 bg-secondary rounded-lg justify-center text-center flex flex-col">
					<h1 class="text-xl font-bold">{broker.stats.dealsClosed}</h1>
					<p class="text-sm text-muted-foreground">Deals Closed</p>
				</div>
				<div class="w-full p-8 items-center gap-0.5 justify-center text-center flex flex-col bg-green-flat rounded-lg">
					<h1 class="text-xl font-bold text-green-600">${broker.stats.wentThrough}M</h1>
					<p class="text-sm text-muted-foreground">Total Volume</p>
				</div>
			</div>

			<div class="border rounded-lg p-5">
				<h2 class="text-lg font-semibold">About</h2>
				<p class="text-sm text-muted-foreground">{broker.about}</p>
			</div>

			<div>
				<h2 class="text-lg font-semibold">Specialties & Expertise</h2>
				<ul class="flex flex-col gap-1 mt-1 text-sm">
					{#each broker.services as s}
						<div class="p-3 bg-secondary w-full rounded-lg font-medium">
							{s}
						</div>
					{/each}
				</ul>
			</div>
		</section>

		<aside class="w-full lg:w-[30%] flex flex-col gap-6">
			<div class="border rounded-lg p-5 space-y-2">
				<h1 class="font-semibold text-lg mb-3">Contact Info</h1>
				<p class="text-sm font-medium">{broker.name}</p>
				<p class="text-sm text-muted-foreground">(256)-631-0650</p>
				<p class="text-sm text-muted-foreground">broker@company.com</p>
				<p class="text-sm text-muted-foreground">{broker.company_address}</p>
				<div class="flex flex-col gap-2 mt-2">
					<Button class="w-full mt-3 text-xs" variant="default"><Phone size={14} /> Call</Button>
					<Button class="w-full mt-1 text-xs" variant="outline"><Mail size={14} /> Message</Button>
					<Button class="w-full mt-1 text-xs" variant="outline"><User size={14} /> Schedule Meeting</Button>
				</div>
			</div>

			<div class="border rounded-lg p-5">
				<h1 class="font-semibold text-lg mb-3">Achievements</h1>
				<ul class="text-sm list-disc pl-5">
					{#each broker.achievements as a}<li>{a}</li>{/each}
				</ul>
			</div>

			<div class="border rounded-lg p-5">
				<h1 class="font-semibold text-lg mb-3">Quick Stats</h1>
				<p class="text-sm w-full flex flex-row justify-between text-muted-foreground">Response Time: <span class="font-medium text-black">{broker.response_time}</span></p>
				<p class="text-sm w-full flex flex-row justify-between text-muted-foreground">Active Listings: <span class="font-medium text-black">{broker.listing_count}</span></p>
				<p class="text-sm w-full flex flex-row justify-between text-muted-foreground">Languages: <span class="font-medium text-black">{broker.languages.join(', ')}</span></p>
				<p class="text-sm w-full flex flex-row justify-between text-muted-foreground">License #: <span class="font-medium text-black">{broker.license_number}</span></p>
			</div>

			<div class="border rounded-lg p-5">
				<h1 class="font-semibold text-lg mb-3">Reviews</h1>
				{#each broker.reviews as review}
					<div class="mb-2">
						<p class="font-semibold text-sm">{review.author}</p>
						<p class="text-sm text-muted-foreground">"{review.content}"</p>
					</div>
				{/each}
			</div>
		</aside>
	</section>
</main>
