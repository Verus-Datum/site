<script lang="ts">
	import { fly } from 'svelte/transition';
	import { type Business, generateFakeBusiness } from '$types/Business';
	import OnlineListing from '$components/business/OnlineListing.svelte';
	import { onMount } from 'svelte';
	import * as Command from '$components/ui/command';
	import * as Popover from '$components/ui/popover';
	import CheckIcon from '@lucide/svelte/icons/check';
	import ChevronUpDownIcon from '@lucide/svelte/icons/chevron-up';
	import { Button } from '$components/ui/button';
	import { markets } from '$utils/markets';
	import { cn } from '$utils/shadcn';
	import { Input } from '$components/ui/input';
	import * as Accordion from '$components/ui/accordion';
	import { Checkbox } from '$components/ui/checkbox';
	import { Slider } from '$components/ui/slider';
	import { formatCurrency } from '$utils/currency';
	import {
		getHighestAskingPrice,
		getHighestGross,
		getHighestProfit,
		getHighestRevenue,
		getLowestAskingPrice,
		getLowestGross,
		getLowestProfit,
		getLowestRevenue
	} from '$lib/businessFilters';

	type Filters = {
		askingPrice: number[];
		grossYearly: number[];
		revenueYearly: number[];
		profitYearly: number[];
		businessType: string[];
		contactMethod: string[];
		markets: string[];
		isPublic: boolean;
	};

	let businesses = $state<Business[]>([]);
	let originalBusinesses = $state<Business[]>([]);
	let filteredBusinesses = $state<Business[]>([]);
	let selectedMarkets = $state<string[]>([]);
	let sortBy = $state('');
	let contactMethod = $state<string[]>(['Direct Owner', 'Broker']);
	let businessType = $state<string[]>(['Online', 'Physical']);
	let isPublic = $state(true);
	let onlineChecked = $state(true);
	let physicalChecked = $state(true);
	let brokerChecked = $state(true);
	let directOwnerChecked = $state(true);
	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement>(null!);

	let filters = $state<Filters>({
		askingPrice: [0, 0],
		grossYearly: [0, 0],
		revenueYearly: [0, 0],
		profitYearly: [0, 0],
		// svelte-ignore state_referenced_locally
        businessType,
		// svelte-ignore state_referenced_locally
        contactMethod,
		markets: [],
		isPublic: true
	});

	onMount(() => {
		let generated = Array.from({ length: 54 }, () => generateFakeBusiness(0, 0, 0, 0));
		businesses = generated;
		originalBusinesses = generated;
		filteredBusinesses = generated;
		filters.askingPrice = [getLowestAskingPrice(businesses), getHighestAskingPrice(businesses)];
		filters.grossYearly = [getLowestGross(businesses), getHighestGross(businesses)];
		filters.revenueYearly = [getLowestRevenue(businesses), getHighestRevenue(businesses)];
		filters.profitYearly = [getLowestProfit(businesses), getHighestProfit(businesses)];
	});

	function toggleMarket(market: string) {
		if (selectedMarkets.includes(market)) {
			selectedMarkets = selectedMarkets.filter((m) => m !== market);
		} else {
			selectedMarkets = [...selectedMarkets, market];
		}
		applyFilters();
	}

	function handleOnlineCheck(checked: boolean) {
		onlineChecked = checked;
		if (checked) {
			if (!businessType.includes('Online')) {
				businessType = [...businessType, 'Online'];
			}
		} else {
			businessType = businessType.filter((t) => t !== 'Online');
		}
		applyFilters();
	}

	function handlePhysicalCheck(checked: boolean) {
		physicalChecked = checked;
		if (checked) {
			if (!businessType.includes('Physical')) {
				businessType = [...businessType, 'Physical'];
			}
		} else {
			businessType = businessType.filter((t) => t !== 'Physical');
		}
		applyFilters();
	}

	function handleBrokerCheck(checked: boolean) {
		brokerChecked = checked;
		if (checked) {
			if (!contactMethod.includes('Broker')) {
				contactMethod = [...contactMethod, 'Broker'];
			}
		} else {
			contactMethod = contactMethod.filter((m) => m !== 'Broker');
		}
		applyFilters();
	}

	function handleDirectOwnerCheck(checked: boolean) {
		directOwnerChecked = checked;
		if (checked) {
			if (!contactMethod.includes('Direct Owner')) {
				contactMethod = [...contactMethod, 'Direct Owner'];
			}
		} else {
			contactMethod = contactMethod.filter((m) => m !== 'Direct Owner');
		}
		applyFilters();
	}

	function handlePublicCheck(checked: boolean) {
		isPublic = checked;
		filters.isPublic = checked;
		applyFilters();
	}

	function clearFilters() {
		selectedMarkets = [];
		contactMethod = ['Direct Owner', 'Broker'];
		businessType = ['Online', 'Physical'];
		isPublic = true;
		onlineChecked = true;
		physicalChecked = true;
		brokerChecked = true;
		directOwnerChecked = true;
		filters.askingPrice = [
			getLowestAskingPrice(originalBusinesses),
			getHighestAskingPrice(originalBusinesses)
		];
		filters.grossYearly = [
			getLowestGross(originalBusinesses),
			getHighestGross(originalBusinesses)
		];
		filters.revenueYearly = [
			getLowestRevenue(originalBusinesses),
			getHighestRevenue(originalBusinesses)
		];
		filters.profitYearly = [
			getLowestProfit(originalBusinesses),
			getHighestProfit(originalBusinesses)
		];
		filters.isPublic = true;
		applyFilters();
	}

	function applyFilters() {
		let result = [...originalBusinesses];

		if (selectedMarkets.length > 0) {
			result = result.filter((b) => selectedMarkets.includes(b.market));
		}

		if (contactMethod.length > 0) {
			result = result.filter((b) => contactMethod.includes(b.contact_method));
		}

		if (businessType.length > 0) {
			result = result.filter((b) => businessType.includes(b.type));
		}

		result = result.filter(
			(b) =>
				b.asking_price >= filters.askingPrice[0] &&
				b.asking_price <= filters.askingPrice[1] &&
				b.revenue_per_yr >= filters.revenueYearly[0] &&
				b.revenue_per_yr <= filters.revenueYearly[1] &&
				b.gross_per_yr >= filters.grossYearly[0] &&
				b.gross_per_yr <= filters.grossYearly[1] &&
				b.profit_per_yr >= filters.profitYearly[0] &&
				b.profit_per_yr <= filters.profitYearly[1] &&
				b.is_public == filters.isPublic
		);

		if (sortBy !== '') {
			if (sortBy === 'Lowest Price') result.sort((a, b) => a.asking_price - b.asking_price);
			if (sortBy === 'Highest Price') result.sort((a, b) => b.asking_price - a.asking_price);
			if (sortBy === 'Most Profitable')
				result.sort((a, b) => b.profit_per_yr - a.profit_per_yr);
			if (sortBy === 'Most Revenue')
				result.sort((a, b) => b.revenue_per_yr - a.revenue_per_yr);
			if (sortBy === 'Most Gross') result.sort((a, b) => b.gross_per_yr - a.gross_per_yr);
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

	<section class="flex w-full flex-row gap-6">
		<aside class="flex w-96 flex-col">
			<h1
				class="flex w-full flex-row items-center justify-between border-b py-5 font-medium text-muted-foreground"
			>
				Filter By
				<button onclick={clearFilters} class="text-sm text-primary"> Clear </button>
			</h1>

			<div class="flex flex-col gap-3 border-b py-5">
				<h2 class="font-medium text-muted-foreground">Keyword</h2>

				<Input placeholder="Enter keyword" />
			</div>

			<div class="flex flex-row items-center gap-2 border-b py-5">
				<Checkbox
					class="border-border"
					id="public"
					bind:checked={isPublic}
					onCheckedChange={handlePublicCheck}
				/>
				<label for="public" class="text-sm font-medium text-muted-foreground">
					Public
				</label>
			</div>

			<Accordion.Root type="multiple">
				<Accordion.Item value="business-type">
					<Accordion.Trigger class="font-medium text-muted-foreground"
						>Business Type</Accordion.Trigger
					>
					<Accordion.Content>
						<div class="flex flex-row items-center gap-2 py-1">
							<Checkbox
								class="border-border"
								id="online"
								checked={onlineChecked}
								onCheckedChange={handleOnlineCheck}
							/>
							<label class="text-sm font-medium text-muted-foreground" for="online">
								Online
							</label>
						</div>
						<div class="flex flex-row items-center gap-2 py-1">
							<Checkbox
								class="border-border"
								id="physical"
								checked={physicalChecked}
								onCheckedChange={handlePhysicalCheck}
							/>
							<label class="text-sm font-medium text-muted-foreground" for="physical">
								Physical
							</label>
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
							<Checkbox
								class="border-border"
								id="broker"
								checked={brokerChecked}
								onCheckedChange={handleBrokerCheck}
							/>
							<label class="text-sm font-medium text-muted-foreground" for="broker">
								Broker
							</label>
						</div>
						<div class="flex flex-row items-center gap-2 py-1">
							<Checkbox
								class="border-border"
								id="direct-owner"
								checked={directOwnerChecked}
								onCheckedChange={handleDirectOwnerCheck}
							/>
							<label
								class="text-sm font-medium text-muted-foreground"
								for="direct-owner"
							>
								Direct Owner
							</label>
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
						<Popover.Root bind:open>
							<Popover.Trigger
								class="w-full items-center justify-between px-4"
								bind:ref={triggerRef}
							>
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
							<p class="text-sm font-medium text-muted-foreground">
								{formatCurrency(filters.askingPrice[0])}
							</p>
							<p class="text-sm font-medium text-muted-foreground">
								{formatCurrency(filters.askingPrice[1])}
							</p>
						</div>
						<Slider
							step={10000}
							min={getLowestAskingPrice(businesses)}
							max={getHighestAskingPrice(businesses)}
							type="multiple"
							class="mx-auto w-[92.5%] py-2"
							bind:value={filters.askingPrice}
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
							<p class="text-sm font-medium text-muted-foreground">
								{formatCurrency(filters.revenueYearly[0])}
							</p>
							<p class="text-sm font-medium text-muted-foreground">
								{formatCurrency(filters.revenueYearly[1])}
							</p>
						</div>
						<Slider
							step={10000}
							min={getLowestRevenue(businesses)}
							max={getHighestRevenue(businesses)}
							type="multiple"
							class="mx-auto w-[92.5%] py-2"
							bind:value={filters.revenueYearly}
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
							<p class="text-sm font-medium text-muted-foreground">
								{formatCurrency(filters.grossYearly[0])}
							</p>
							<p class="text-sm font-medium text-muted-foreground">
								{formatCurrency(filters.grossYearly[1])}
							</p>
						</div>
						<Slider
							step={10000}
							min={getLowestGross(businesses)}
							max={getHighestGross(businesses)}
							type="multiple"
							class="mx-auto w-[92.5%] py-2"
							bind:value={filters.grossYearly}
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
							<p class="text-sm font-medium text-muted-foreground">
								{formatCurrency(filters.profitYearly[0])}
							</p>
							<p class="text-sm font-medium text-muted-foreground">
								{formatCurrency(filters.profitYearly[1])}
							</p>
						</div>
						<Slider
							step={10000}
							min={getLowestProfit(businesses)}
							max={getHighestProfit(businesses)}
							type="multiple"
							class="mx-auto w-[92.5%] py-2"
							bind:value={filters.profitYearly}
						/>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</aside>

		<div class="flex w-full flex-col gap-6">
			{#if filteredBusinesses.length > 0}
				{#each filteredBusinesses as biz}
					<OnlineListing listing={biz} />
				{/each}
			{/if}
		</div>
	</section>
</main>
