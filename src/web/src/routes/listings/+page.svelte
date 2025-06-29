<script lang="ts">
	import { fly } from 'svelte/transition';
	import OnlineListing from '$components/business/OnlineListing.svelte';
	import { onMount } from 'svelte';
	import * as Command from '$components/ui/command';
	import * as Popover from '$components/ui/popover';
	import CheckIcon from '@lucide/svelte/icons/check';
	import ChevronUpDownIcon from '@lucide/svelte/icons/chevron-up';
	import { markets } from '$utils/markets';
	import { Input } from '$components/ui/input';
	import * as Accordion from '$components/ui/accordion';
	import { Checkbox } from '$components/ui/checkbox';
	import { Slider } from '$components/ui/slider';
	import { MediaQuery } from 'svelte/reactivity';
	import * as Sheet from '$components/ui/sheet';
	import { Button } from '$components/ui/button';
	import type { Listing } from '$models/Listing';
	import { listingService } from '$services/listingService';
	import { Skeleton } from '$components/ui/skeleton';

	let listings: Listing[] = [];
	let page = 0;
	let loading = false;

	async function loadPage(pageNumber: number) {
		loading = true;
		const newListings = await listingService.getPage(pageNumber, 50);
		listings = [...listings, ...newListings];
		loading = false;
	}

	onMount(() => {
		loadPage(page);

		function onScroll() {
			const scrollPosition = window.innerHeight + window.scrollY;
			const threshold = document.body.offsetHeight - 200;
			if (scrollPosition >= threshold && !loading) {
				page += 1;
				loadPage(page);
			}
		}

		window.addEventListener('scroll', onScroll);

		onDestroy(() => {
			window.removeEventListener('scroll', onScroll);
		});
	});

	const isDesktop = new MediaQuery('(min-width: 1024px)');
</script>

{#snippet Filters()}
	<aside class="flex min-w-40 flex-col lg:w-80">
		<h1
			class="flex w-full flex-row items-center justify-between border-b py-5 font-medium text-muted-foreground"
		>
			Filter By
			<button class="text-sm text-primary"> Clear </button>
		</h1>

		<div class="flex flex-row items-center gap-2 border-b py-5">
			<Checkbox class="border-border" id="public" />
			<label for="public" class="text-sm font-medium text-muted-foreground">Is Public</label>
		</div>

		<Accordion.Root type="multiple">
			<Accordion.Item value="business-type">
				<Accordion.Trigger class="font-medium text-muted-foreground"
					>Business Type</Accordion.Trigger
				>
				<Accordion.Content>
					<div class="flex flex-row items-center gap-2 py-1">
						<Checkbox class="border-border" id="online" />
						<label class="text-sm font-medium text-muted-foreground" for="online"
							>Online</label
						>
					</div>
					<div class="flex flex-row items-center gap-2 py-1">
						<Checkbox class="border-border" id="physical" />
						<label class="text-sm font-medium text-muted-foreground" for="physical"
							>Physical</label
						>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>

		<Accordion.Root type="multiple">
			<Accordion.Item value="contact-method">
				<Accordion.Trigger class="font-medium text-muted-foreground"
					>Contact Method</Accordion.Trigger
				>
				<Accordion.Content>
					<div class="flex flex-row items-center gap-2 py-1">
						<Checkbox class="border-border" id="broker" />
						<label class="text-sm font-medium text-muted-foreground" for="broker"
							>Broker</label
						>
					</div>
					<div class="flex flex-row items-center gap-2 py-1">
						<Checkbox class="border-border" id="direct-owner" />
						<label class="text-sm font-medium text-muted-foreground" for="direct-owner"
							>Direct Owner</label
						>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>

		<Accordion.Root type="multiple">
			<Accordion.Item value="market">
				<Accordion.Trigger class="font-medium text-muted-foreground"
					>Market</Accordion.Trigger
				>
				<Accordion.Content>
					<Popover.Root>
						<Popover.Trigger class="w-full items-center justify-between px-4">
							<Button
								variant="outline"
								class="min-w-[200px] flex-shrink-0 justify-between rounded-md border-border px-4 py-2 font-semibold text-muted-foreground hover:bg-secondary hover:text-muted-foreground"
							>
								Select markets
								<ChevronUpDownIcon class="rotate-180 opacity-50" />
							</Button>
						</Popover.Trigger>
						<Popover.Content class="w-[290px] p-0">
							<Command.Root>
								<Command.Input
									class="text-sm font-medium text-muted-foreground"
									placeholder="Search market..."
								/>
								<Command.List>
									<Command.Empty>No market found.</Command.Empty>
									<Command.Group value="markets">
										{#each markets as market}
											<Command.Item value={market}>
												<CheckIcon class="text-transparent" />
												{market}
											</Command.Item>
										{/each}
									</Command.Group>
								</Command.List>
							</Command.Root>
						</Popover.Content>
					</Popover.Root>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>

		<Accordion.Root type="multiple">
			<Accordion.Item value="asking-price">
				<Accordion.Trigger class="font-medium text-muted-foreground"
					>Asking Price</Accordion.Trigger
				>
				<Accordion.Content class="w-full">
					<div class="flex w-full flex-row justify-between py-1">
						<p class="text-sm font-medium text-muted-foreground">0</p>
						<p class="text-sm font-medium text-muted-foreground">1,000,000</p>
					</div>
					<Slider
						step={10000}
						min={0}
						max={1000000}
						type="multiple"
						class="mx-auto w-[92.5%] py-2"
					/>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>

		<Accordion.Root type="multiple">
			<Accordion.Item value="yearly-revenue">
				<Accordion.Trigger class="font-medium text-muted-foreground"
					>Yearly Revenue</Accordion.Trigger
				>
				<Accordion.Content>
					<div class="flex w-full flex-row justify-between py-1">
						<p class="text-sm font-medium text-muted-foreground">0</p>
						<p class="text-sm font-medium text-muted-foreground">1,000,000</p>
					</div>
					<Slider
						step={10000}
						min={0}
						max={1000000}
						type="multiple"
						class="mx-auto w-[92.5%] py-2"
					/>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>

		<Accordion.Root type="multiple">
			<Accordion.Item value="yearly-gross">
				<Accordion.Trigger class="font-medium text-muted-foreground"
					>Yearly Gross</Accordion.Trigger
				>
				<Accordion.Content>
					<div class="flex w-full flex-row justify-between py-1">
						<p class="text-sm font-medium text-muted-foreground">0</p>
						<p class="text-sm font-medium text-muted-foreground">1,000,000</p>
					</div>
					<Slider
						step={10000}
						min={0}
						max={1000000}
						type="multiple"
						class="mx-auto w-[92.5%] py-2"
					/>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>

		<Accordion.Root type="multiple">
			<Accordion.Item value="yearly-profit">
				<Accordion.Trigger class="font-medium text-muted-foreground"
					>Yearly Profit</Accordion.Trigger
				>
				<Accordion.Content>
					<div class="flex w-full flex-row justify-between py-1">
						<p class="text-sm font-medium text-muted-foreground">0</p>
						<p class="text-sm font-medium text-muted-foreground">1,000,000</p>
					</div>
					<Slider
						step={10000}
						min={0}
						max={1000000}
						type="multiple"
						class="mx-auto w-[92.5%] py-2"
					/>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</aside>
{/snippet}

<main
	in:fly={{ y: 20, duration: 650 }}
	class="mx-auto flex w-full flex-col items-start justify-start gap-6 px-8 pb-8 pt-8 lg:pt-20 2xl:w-[68%] 3xl:w-[50%]"
>
    <header class="flex flex-col lg:items-center items-start gap-6 w-full my-6 lg:my-10 mt-20">
        <h1 class="text-4xl font-semibold text-left lg:text-center">
            Browse businesses for sale across every industry
        </h1>
        <h2 class="text-muted-foreground text-left lg:text-center">
            Explore listings from real owners and brokers. Filter by location, price, and business industry.
        </h2>

        <div class="flex flex-row gap-2 w-full md:w-[55%]">
            <Input placeholder="Search listings..." class="w-full h-11 text-sm" />
            {#if !isDesktop.current}
                <Sheet.Root>
                    <Sheet.Trigger>
                        <Button variant="outline" class="h-11 bg-secondary">Filters</Button>
                    </Sheet.Trigger>
                    <Sheet.Content side="left">
                        {@render Filters()}
                    </Sheet.Content>
                </Sheet.Root>
            {/if}
        </div>
    </header>

	<section class="flex w-full flex-row gap-6">
		{#if isDesktop.current}
			{@render Filters()}
		{/if}

		<div class="flex w-full flex-col gap-6">
			{#if loading === true}
				{#each Array(15) as i}
					<Skeleton class='w-full h-64'></Skeleton>
				{/each}
			{:else}
				{#if listings.length > 0}
					{#each listings as listing}
						<OnlineListing {listing} />
					{/each}
				{:else}
					<h1 class="w-full flex items-center justify-center py-16 font-medium text-lg">
						No listings found
					</h1>
				{/if}
			{/if}
		</div>
	</section>
</main>
