<script lang="ts">
	import { flyAndScale } from "$utils/shadcn";
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
	import type { Listing } from '$models/Listing';
	import { formatCurrency } from "$utils/currency";

	type Props = {
        listing: Listing,
    }

    let { listing }: Props = $props();
</script>

{#snippet Content()}
	<header>
		<h1 class="py-2 text-xl font-semibold">
			{listing.name}
		</h1>
		<h2 class="flex flex-row items-center gap-2 py-1 font-medium text-primary">
			<MapPin size={20} />
			{listing.address}
		</h2>
		<h2 class="flex flex-row items-center gap-2 py-1 font-medium text-primary">
			<Provider size={20} />
			{listing.market}
		</h2>
	</header>

	<section class="py-6">
		<h1 class="text-2xl font-semibold text-primary">
			{formatCurrency(listing.asking_price)}
		</h1>
		<p class="font-semibold text-muted-foreground/65">asking price</p>
	</section>

	<footer class="flex w-full flex-row gap-3">
		<Button
			href={`/listings/example`}
			onclick={() => {

			}}
			class="flex w-full bg-blue-flat font-semibold text-blue-foreground hover:bg-blue-muted/30 md:hidden"
		>
			Learn More
		</Button>
		<Button
			onclick={() => {

			}}
			class="hidden w-full bg-blue-flat font-semibold text-blue-foreground hover:bg-blue-muted/30 md:flex"
		>
			Learn More
		</Button>
		<Button class="w-full">Request Contact</Button>
	</footer>
{/snippet}

<div transition:flyAndScale class="shadow-ui relative w-[28.5rem] rounded-xl bg-card text-popover-foreground border border-border p-4">
    {@render Content()}
</div>
