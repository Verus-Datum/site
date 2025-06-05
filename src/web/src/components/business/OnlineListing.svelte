<script lang="ts">
	import { Button } from '$components/ui/button';
	import type { Listing } from '$models/Listing';
	import type { Business } from '$types/Business';
	
    type Props = {
		listing: Listing;
	};

	let { listing }: Props = $props();

	const formatCurrency = (num: number) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0
		}).format(num);

	let images = [
		'https://www.petitpalais.paris.fr/sites/default/files/content/images/274a7179_0.jpg',
		'https://builtin.com/sites/www.builtin.com/files/styles/ckeditor_optimize/public/inline-images/Favor%203.jpeg',
		'https://k2space.imgix.net/app/uploads/2023/06/K2-Criteo-Office-Curator-LARGE-102-scaled.jpg?auto=format&fit=max&w=5000&q=90',
		'https://www.cmswire.com/-/media/96e6aad4e98842abb94d1bba60317770.ashx',
		'https://media.wired.com/photos/6667528bbbc4a40373aab2af/master/pass/Everything-Apple-Announced-WWDC-2024-GettyImages-2156398720.jpg',
		'https://fiu-original.b-cdn.net/fontsinuse.com/use-images/121/121154/121154.png?filename=Screenshot_2020-09-10%20Develop%20Preview%20Ship%20For%20the%20best%20frontend%20teams%20%E2%80%93%20Vercel(3).png'
	];
</script>

<div class="h-70 relative flex w-full flex-col gap-6 rounded-xl border p-5 md:flex-row">
	<img
		src={images[Math.floor(Math.random() * images.length)]}
		alt="Image"
		class="w-full shrink-0 rounded-lg object-cover md:w-80"
	/>
	<header class="relative flex w-full flex-col justify-between">
        <div class="flex flex-row w-full justify-between items-start">
            <h1 class="flex flex-col max-w-80 text-2xl font-semibold">
                {listing.name}
            </h1>
            <div class="flex flex-col items-end leading-none">
                <span class="text-xl font-bold text-primary">
                    {formatCurrency(listing.asking_price)}
                </span>
                <p class="text-sm font-medium text-muted-foreground">asking price</p>
            </div>
        </div>

		<div class="flex h-full flex-col gap-2 py-4">
			<div class="flex flex-col">
				<span class="text-sm font-medium text-muted-foreground">Market</span>
				<p class="font-medium">
					{listing.market}
				</p>
			</div>
			<div class="flex flex-col">
				<span class="text-sm font-medium text-muted-foreground">Contact Method</span>
				<p class="font-medium">
					{listing.contact_method}
				</p>
			</div>
		</div>

		<div
			class="hide-scrollbar flex w-full flex-row gap-6"
		>
			<div class="flex flex-col">
				<span class="text-sm font-medium text-muted-foreground">Revenue / Yr</span>
				<p class="font-medium">
					{formatCurrency(listing.revenue_per_yr)}
				</p>
			</div>
			<div class="flex flex-col">
				<span class="text-sm font-medium text-muted-foreground">Gross / Yr</span>
				<p class="font-medium">
					{formatCurrency(listing.gross_per_yr)}
				</p>
			</div>
			<div class="flex flex-col">
				<span class="text-sm font-medium text-muted-foreground">Profit / Yr</span>
				<p class="font-medium">
					{formatCurrency(listing.profit_per_yr)}
				</p>
			</div>

			<div class="bottom-0 right-0 ml-auto hidden lg:flex">
				<Button href={'/listings/example'} class="">View Listing</Button>
			</div>
		</div>
        
		<Button href={'/listings/example'} class="mt-4 flex w-full  lg:hidden">View Listing</Button>
	</header>
</div>
