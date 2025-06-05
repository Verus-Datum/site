<script lang="ts">
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Provider from '@lucide/svelte/icons/life-buoy';
	import Phone from '@lucide/svelte/icons/phone';
	import type { Business } from '$types/Business';
	import { formatCurrency } from '$utils/currency';
	import type { Listing } from '$models/Listing';

	type Props = {
		listing: Listing;
	};

	let { listing }: Props = $props();

	let images = [
		'https://www.upmenu.com/wp-content/uploads/2022/08/Small-Cafe-Interior-Design.jpg',
		'https://weadesign.com/wp-content/uploads/2024/01/office-interior-designs.webp',
		'https://www.avantisystemsusa.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-08-at-3.08.52-PM.png',
		'https://images.squarespace-cdn.com/content/v1/5d6d67f2387da800015dc00e/e242ea2f-e67f-4991-85bc-6c07b48bcc73/Jude_WetCoffee_-6.jpg',
		'https://www.blankcreatives.com.au/wp-content/uploads/2022/12/Wonderwood-cafe_09_WEB.jpg'
	];
</script>

<a
	href={`/listings/${listing.id}`}
	class="flex w-full flex-col rounded-lg border bg-secondary duration-200 hover:bg-secondary/60"
>
	<img
		src={images[Math.floor(Math.random() * images.length)]}
		alt="Image"
		class="h-48 w-full shrink-0 rounded-t-lg object-cover"
	/>
	<section class="p-4">
		<h1 class="flex items-center gap-2 text-xl font-semibold">
			{listing.name}
		</h1>

		<data class="flex flex-col gap-1 py-1">
			<span class="flex items-center gap-1 text-lg font-semibold text-primary">
				{formatCurrency(listing.asking_price)}
			</span>
			<span class="flex items-center gap-1 text-sm font-medium text-muted-foreground">
				<Phone size={14} />
				{listing.contact_method}
				<Provider class="ml-2" size={14} />
				{listing.market}
			</span>
			<span class="flex items-center gap-1 text-sm font-medium text-muted-foreground">
				<MapPin size={14} />
				{listing.address}
			</span>
		</data>
	</section>
</a>
