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

	let { data }: PageProps = $props();
	let broker = $derived<Broker>(data.broker);
</script>

<main in:fly={{ y: 20, duration: 500 }} class="width mx-auto flex flex-col gap-8 mt-4 pb-12 px-4">
	<nav class="flex w-full flex-row items-center justify-between">
		<button onclick={() => history.back()} class="flex flex-row items-center gap-2 font-medium">
			<ArrowLeft size={20} /> Back
		</button>
		<h1 class="font-semibold">Broker Profile</h1>
		<Button size="icon" variant="outline"><Ellipsis size={20} /></Button>
	</nav>

	<section class="flex flex-col lg:flex-row gap-10">
		<section class="w-full lg:w-[70%] flex flex-col gap-6">
			<div class="flex flex-row gap-6 items-center">
				<img src={broker.avatar_url} class="h-24 w-24 rounded-xl object-cover" />
				<div class="flex flex-col gap-1">
					<h1 class="text-2xl font-bold">{broker.name}</h1>
					<h2 class="text-muted-foreground font-medium">{broker.title} at {broker.company}</h2>
					<span class="text-xs font-medium rounded-md px-2 py-1 bg-yellow-100 text-yellow-700 w-fit">Top Performer</span>
				</div>
			</div>

			<div class="flex flex-wrap gap-8">
				<div>
					<h2 class="text-muted-foreground text-sm">Market</h2>
					<p class="font-semibold">{broker.market}</p>
				</div>
				<div>
					<h2 class="text-muted-foreground text-sm">Address</h2>
					<p class="font-semibold">{broker.address}</p>
				</div>
				<div>
					<h2 class="text-muted-foreground text-sm">Deal Size</h2>
					<p class="font-semibold">{formatCurrency(broker.stats.dealSizeRng[0])} - {formatCurrency(broker.stats.dealSizeRng[1])}</p>
				</div>
			</div>

			<div class="flex flex-row justify-between py-4">
				<div class="text-center">
					<h1 class="text-xl font-bold text-primary">{broker.stats.yrsInSphere} yrs</h1>
					<p class="text-sm text-muted-foreground">In Sphere</p>
				</div>
				<div class="text-center">
					<h1 class="text-xl font-bold text-primary">{broker.stats.dealsClosed}</h1>
					<p class="text-sm text-muted-foreground">Deals Closed</p>
				</div>
				<div class="text-center">
					<h1 class="text-xl font-bold text-primary">${broker.stats.wentThrough}M</h1>
					<p class="text-sm text-muted-foreground">Total Volume</p>
				</div>
			</div>

			<div>
				<h2 class="text-lg font-semibold">About</h2>
				<p class="text-sm text-muted-foreground">{broker.about}</p>
			</div>

			<div>
				<h2 class="text-lg font-semibold">Specialties & Expertise</h2>
				<ul class="list-disc pl-5 text-sm">
					{#each broker.services as s}<li>{s}</li>{/each}
				</ul>
			</div>

			<div>
				<h2 class="text-lg font-semibold">Recent Listings</h2>
				<!-- Render listing cards -->
			</div>
		</section>

		<aside class="w-full lg:w-[30%] flex flex-col gap-6">
			<div class="border rounded-lg p-5">
				<h1 class="font-semibold text-lg mb-3">Contact Info</h1>
				<p class="text-sm font-medium">{broker.name}</p>
				<p class="text-sm text-muted-foreground">{broker.phone_number}</p>
				<p class="text-sm text-muted-foreground">{broker.email}</p>
				<p class="text-sm text-muted-foreground">{broker.company_address}</p>
				<Button class="w-full mt-3 text-xs" variant="default"><Phone size={14} /> Call</Button>
				<Button class="w-full mt-1 text-xs" variant="outline"><Mail size={14} /> Message</Button>
				<Button class="w-full mt-1 text-xs" variant="outline"><User size={14} /> Schedule Meeting</Button>
			</div>

			<div class="border rounded-lg p-5">
				<h1 class="font-semibold text-lg mb-3">Achievements</h1>
				<ul class="text-sm list-disc pl-5">
					{#each broker.achievements as a}<li>{a}</li>{/each}
				</ul>
			</div>

			<div class="border rounded-lg p-5">
				<h1 class="font-semibold text-lg mb-3">Quick Stats</h1>
				<p class="text-sm">Response Time: <span class="font-medium">{broker.response_time}</span></p>
				<p class="text-sm">Active Listings: <span class="font-medium">{broker.listing_count}</span></p>
				<p class="text-sm">Languages: <span class="font-medium">{broker.languages.join(', ')}</span></p>
				<p class="text-sm">License #: <span class="font-medium">{broker.license_number}</span></p>
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
