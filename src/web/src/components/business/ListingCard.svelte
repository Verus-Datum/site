<script lang="ts">
	import { Button } from '$components/ui/button';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Provider from '@lucide/svelte/icons/life-buoy';
	import Phone from '@lucide/svelte/icons/phone';
	import Eye from '@lucide/svelte/icons/eye';
	import EllipisVertical from '@lucide/svelte/icons/ellipsis-vertical';
	import type { Business } from '$types/Business';

	type Props = {
		listing: Business;
        showView: boolean;
	};

	let { listing, showView }: Props = $props();

	let images = [
		'https://www.upmenu.com/wp-content/uploads/2022/08/Small-Cafe-Interior-Design.jpg',
		'https://weadesign.com/wp-content/uploads/2024/01/office-interior-designs.webp',
		'https://www.avantisystemsusa.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-08-at-3.08.52-PM.png',
		'https://images.squarespace-cdn.com/content/v1/5d6d67f2387da800015dc00e/e242ea2f-e67f-4991-85bc-6c07b48bcc73/Jude_WetCoffee_-6.jpg',
		'https://www.blankcreatives.com.au/wp-content/uploads/2022/12/Wonderwood-cafe_09_WEB.jpg'
	];
</script>

<div class="bg-secondary flex w-full flex-col gap-6 rounded-xl border p-6 md:flex-row">
	<img
		src={images[Math.floor(Math.random() * images.length)]}
		alt="Image"
		class="h-60 w-full shrink-0 rounded-md object-cover md:w-96"
	/>
	<header class="relative flex w-full flex-col">
		<h1 class="flex w-full items-center justify-between pb-4 text-3xl font-semibold">
			{listing.name}
			<button class="text-muted-foreground hover:text-muted-foreground/80">
				<EllipisVertical size={24} />
			</button>
		</h1>

		<section class="flex flex-col gap-4">
			<div class="flex items-center gap-3 font-medium text-muted-foreground">
				<MapPin size={24} />
				{listing.address}
			</div>

			<div class="flex items-center gap-3 font-medium text-muted-foreground">
				<Provider size={24} />
				{listing.market}
			</div>

			<div class="flex items-center gap-3 font-medium text-muted-foreground">
				<Eye size={24} />
				2,466 viewed
			</div>

			<div class="flex items-center gap-3 font-medium text-muted-foreground">
				<Phone size={24} />
				26 requested contact
			</div>
		</section>

		<div class="mt-6 flex flex-col gap-2 md:hidden">
			<Button
				class="w-full bg-blue-flat {showView ? 'flex' : 'hidden'} font-semibold text-blue-foreground hover:bg-blue-muted/30"
			>
				View
			</Button>
			<Button class="w-full ">Request Referral</Button>
		</div>

		<div class="absolute bottom-0 right-0 hidden justify-end gap-2 md:flex">
			<Button class="bg-transparent {showView ? 'flex' : 'hidden'} text-primary hover:bg-transparent hover:text-primary/80">
				View
			</Button>
			<Button class="">Request Referral</Button>
		</div>
	</header>
</div>
