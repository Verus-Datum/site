<script lang="ts">
	import { fly } from 'svelte/transition';
	import { type Business, generateFakeBusiness } from '$types/Business';
	import OnlineListing from '$components/business/OnlineListing.svelte';
	import { onMount } from 'svelte';
	import * as Select from '$components/ui/select';
	import * as Command from '$components/ui/command';
	import * as Popover from '$components/ui/popover';
	import CheckIcon from '@lucide/svelte/icons/check';
	import ChevronUpDownIcon from '@lucide/svelte/icons/chevron-up';
	import { Button } from '$components/ui/button';
	import { markets } from '$utils/markets';
	import { cn } from '$utils/shadcn';

	let businesses = $state<Business[]>([]);
	let originalBusinesses = $state<Business[]>([]);
	let filteredBusinesses = $state<Business[]>([]);

	onMount(() => {
		if (businesses.length === 0) {
			let generated: Business[] = [];
			for (let i = 0; i < 54; i++) {
				let biz = generateFakeBusiness(0, 0, 0, 0);
				generated.push(biz);
			}
			businesses = generated;
			originalBusinesses = generated;
			filteredBusinesses = generated;
		}
	});

	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement>(null!);
	let sortBy = $state('');
	let contactMethod = $state('');
	let selectedMarkets = $state<string[]>([]);

	function toggleMarket(market: string) {
		if (selectedMarkets.includes(market)) {
			selectedMarkets = selectedMarkets.filter((m) => m !== market);
		} else {
			selectedMarkets = [...selectedMarkets, market];
		}
		applyFilters();
	}

	function applyFilters() {
		let result = [...businesses];

		if (selectedMarkets.length > 0) {
			result = result.filter((b) => selectedMarkets.includes(b.market));
		}

		if (contactMethod !== '') {
			result = result.filter((b) => b.contact_method === contactMethod);
		}

		if (sortBy !== '') {
			if (sortBy === 'Lowest Price') result.sort((a, b) => a.asking_price - b.asking_price);
			if (sortBy === 'Highest Price') result.sort((a, b) => b.asking_price - a.asking_price);
			if (sortBy === 'Most Profitable')
				result.sort((a, b) => b.profit_per_yr - a.profit_per_yr);
			if (sortBy === 'Most Revenue')
				result.sort((a, b) => b.revenue_per_yr - a.revenue_per_yr);
			if (sortBy === 'Most Gross') result.sort((a, b) => b.gross_per_yr - a.gross_per_yr);
			else if (sortBy === 'Default')
				result = originalBusinesses.filter((b) => result.some((r) => r.id === b.id));
		}

		filteredBusinesses = result;
	}

	$effect(() => {
		applyFilters();
	});
</script>

<main
	in:fly={{ y: 20, duration: 650 }}
	class="mx-auto flex w-full flex-col items-start justify-start gap-6 px-8 pb-8 pt-8 lg:pt-20 xl:w-[90%] 2xl:w-[68%] 3xl:w-[60%]"
>
	<header class="w-full pt-20">
		<h1 class="w-full text-center text-3xl font-semibold md:text-left">View all businesses</h1>
	</header>

	<div class="flex w-full flex-col gap-4">
		<div class="hide-scrollbar flex w-full flex-row gap-4 overflow-x-auto">
			<Select.Root bind:value={sortBy} type="single" on:change={applyFilters}>
				<Select.Trigger class="w-auto  min-w-32 flex-shrink-0 gap-4 rounded-lg px-4 py-2">
					{sortBy !== '' ? sortBy : 'Sort By'}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="Default">Default</Select.Item>
					<Select.Item value="Lowest Price">Lowest Price</Select.Item>
					<Select.Item value="Highest Price">Highest Price</Select.Item>
					<Select.Item value="Most Profitable">Most Profitable</Select.Item>
					<Select.Item value="Most Revenue">Most Revenue</Select.Item>
					<Select.Item value="Most Gross">Most Gross</Select.Item>
				</Select.Content>
			</Select.Root>

			<Select.Root bind:value={contactMethod} type="single" on:change={applyFilters}>
				<Select.Trigger class="w-auto  min-w-32 flex-shrink-0 gap-4 rounded-lg px-4 py-2">
					{contactMethod !== '' ? contactMethod : 'Contact Method'}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="Broker">Broker</Select.Item>
					<Select.Item value="Direct Owner">Direct Owner</Select.Item>
					<Select.Item value="Both">Both</Select.Item>
				</Select.Content>
			</Select.Root>

			<Popover.Root bind:open>
				<Popover.Trigger bind:ref={triggerRef}>
					{#snippet child({ props })}
						<Button
							variant="outline"
							class="min-w-[200px] flex-shrink-0 justify-between rounded-lg border-border px-4 py-2 font-semibold text-muted-foreground duration-200  hover:bg-secondary hover:text-muted-foreground {selectedMarkets.length >
							0
								? 'font-semibold text-black'
								: ''}"
							{...props}
							role="combobox"
							aria-expanded={open}
						>
							{selectedMarkets.length === 0
								? 'Select markets'
								: selectedMarkets.length === 1
									? selectedMarkets[0]
									: `${selectedMarkets[0]} + ${selectedMarkets.length - 1} more`}
							<ChevronUpDownIcon class="rotate-180 opacity-50" />
						</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="w-[200px] p-0">
					<Command.Root>
						<Command.Input
							class="text-sm font-medium text-muted-foreground"
							placeholder="Search market..."
						/>
						<Command.List>
							<Command.Empty>No market found.</Command.Empty>
							<Command.Group value="markets">
								{#each markets as market}
									<Command.Item
										value={market}
										onSelect={() => {
											toggleMarket(market);
										}}
									>
										<CheckIcon
											class={cn(
												!selectedMarkets.includes(market) &&
													'text-transparent'
											)}
										/>
										{market}
									</Command.Item>
								{/each}
							</Command.Group>
						</Command.List>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
		</div>

		<h2 class="mt-2 font-medium text-muted-foreground">
			{filteredBusinesses.length} results
		</h2>
	</div>

	<div class="flex w-full flex-col gap-6">
		{#each filteredBusinesses as listing}
			<OnlineListing {listing} />
		{/each}
	</div>
</main>
