<script lang="ts">
	import { fly } from "svelte/transition"
	import { type Business, generateFakeBusiness } from "$types/Business";
	import OnlineListing from "$components/business/OnlineListing.svelte";
	import { onMount } from "svelte";
	import * as Select from "$components/ui/select";
	import * as Command from "$components/ui/command";
	import * as Popover from "$components/ui/popover";
	import CheckIcon from "@lucide/svelte/icons/check";
	import ChevronUpDownIcon from "@lucide/svelte/icons/chevron-up";
	import { Button } from "$components/ui/button";
	import { tick } from "svelte";
	import { markets } from "$utils/markets";
	import { cn } from "$utils/shadcn";
	import { Input } from "$components/ui/input";
    import * as Accordion from "$components/ui/accordion";
	import { Checkbox } from "$components/ui/checkbox";
    import { Slider } from "$components/ui/slider";
	import { formatCurrency } from "$utils/currency";

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
	let sortBy = $state("");
	let contactMethod = $state("");
	let selectedMarkets = $state<string[]>([]);

	function toggleMarket(market: string) {
		if (selectedMarkets.includes(market)) {
			selectedMarkets = selectedMarkets.filter(m => m !== market);
		} else {
			selectedMarkets = [...selectedMarkets, market];
		}
		applyFilters();
	}

	function applyFilters() {
		let result = [...businesses];

		if (selectedMarkets.length > 0) {
			result = result.filter(b => selectedMarkets.includes(b.market));
		}

		if (contactMethod !== "") {
			result = result.filter(b => b.contact_method === contactMethod);
		}

		if (sortBy !== "") {
			if (sortBy === "Lowest Price") result.sort((a, b) => a.asking_price - b.asking_price);
			if (sortBy === "Highest Price") result.sort((a, b) => b.asking_price - a.asking_price);
			if (sortBy === "Most Profitable") result.sort((a, b) => b.profit_per_yr - a.profit_per_yr);
			if (sortBy === "Most Revenue") result.sort((a, b) => b.revenue_per_yr - a.revenue_per_yr);
			if (sortBy === "Most Gross") result.sort((a, b) => b.gross_per_yr - a.gross_per_yr);
            else if (sortBy === "Default") result = originalBusinesses.filter(b =>
                result.some(r => r.id === b.id)
            );
		}

		filteredBusinesses = result;
	}

	$effect(() => {
        applyFilters();
    })

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
    
    let value = $state<number>([25, 50]);
</script>

<main in:fly={{ y: 20, duration: 650 }} class="lg:pt-20 pt-8 pb-8 w-full xl:w-[90%] 2xl:w-[68%] 3xl:w-[60%] px-8 mx-auto flex-col gap-6 flex items-start justify-start">
	<header class="pt-20 w-full">
		<h1 class="text-3xl md:text-left text-center w-full font-semibold">
			View all businesses
		</h1>
	</header>

	<section class="flex flex-row w-full gap-6">
        <aside class="flex flex-col w-96">
            <h1 class="w-full flex flex-row justify-between font-medium text-muted-foreground items-center border-b py-5">
                Filter By
                <button class="text-primary text-sm">
                   Clear
                </button>
            </h1>

            <div class="flex flex-col gap-3 py-5 border-b">
                <h2 class="font-medium text-muted-foreground">
                    Keyword
                </h2>

                <Input placeholder="Enter keyword" />
            </div>

            <Accordion.Root type="multiple">
                <Accordion.Item value="item-1">
                    <Accordion.Trigger class="font-medium text-muted-foreground">Contact Method</Accordion.Trigger>
                    <Accordion.Content>
                        <div class="flex flex-row gap-2 items-center py-1">
                            <Checkbox class="border-border" id="broker" />
                            <label for="broker">
                                Broker
                            </label>
                        </div>
                        <div class="flex flex-row gap-2 items-center py-1">
                            <Checkbox class="border-border" id="direct-owner" />
                            <label for="direct-owner">
                                Direct Owner
                            </label>
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>

            <Accordion.Root type="multiple">
                <Accordion.Item value="item-1">
                    <Accordion.Trigger class="font-medium text-muted-foreground">Market</Accordion.Trigger>
                    <Accordion.Content>
                        <Popover.Root bind:open>
                            <Popover.Trigger class="w-full items-center px-4 justify-between" bind:ref={triggerRef}>
                                {#snippet child({ props })}
                                    <Button
                                        variant="outline"
                                        class="min-w-[200px] justify-between border-border hover:text-muted-foreground hover:bg-secondary duration-200 font-semibold py-2 px-4 rounded-lg  flex-shrink-0 text-muted-foreground {selectedMarkets.length > 0 ? 'text-black font-semibold' : ''}"
                                        {...props}
                                        role="combobox"
                                        aria-expanded={open}
                                    >
                                        {selectedMarkets.length === 0
                                            ? "Select markets"
                                            : selectedMarkets.length === 1
                                            ? selectedMarkets[0]
                                            : `${selectedMarkets[0]} + ${selectedMarkets.length - 1} more`}
                                        <ChevronUpDownIcon class="opacity-50 rotate-180" />
                                    </Button>
                                {/snippet}
                            </Popover.Trigger>
                            <Popover.Content class="w-[290px] p-0">
                                <Command.Root>
                                    <Command.Input class="text-sm font-medium text-muted-foreground" placeholder="Search market..." />
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
                                                        class={cn(!selectedMarkets.includes(market) && "text-transparent")}
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
                <Accordion.Item value="item-1">
                    <Accordion.Trigger class="font-medium text-muted-foreground">Location</Accordion.Trigger>
                    <Accordion.Content>
                        <h3>
                            City
                        </h3>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>

            <Accordion.Root type="multiple">
                <Accordion.Item value="item-1">
                    <Accordion.Trigger class="font-medium text-muted-foreground">Asking Price</Accordion.Trigger>
                    <Accordion.Content>
                        <div class="w-full flex flex-row justify-between py-1">
                            <p class="font-medium text-muted-foreground text-sm">
                                {formatCurrency(value[0])}
                            </p>
                            <p class="font-medium text-muted-foreground text-sm">
                                {formatCurrency(value[1])}
                            </p>
                        </div>
                        <Slider class="py-2" bind:value={value} />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>

            <Accordion.Root type="multiple">
                <Accordion.Item value="item-1">
                    <Accordion.Trigger class="font-medium text-muted-foreground">Yearly Revenue</Accordion.Trigger>
                    <Accordion.Content>
                        <div class="w-full flex flex-row justify-between py-1">
                            <p class="font-medium text-muted-foreground text-sm">
                                {formatCurrency(value[0])}
                            </p>
                            <p class="font-medium text-muted-foreground text-sm">
                                {formatCurrency(value[1])}
                            </p>
                        </div>
                        <Slider class="py-2" bind:value={value} />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>

            <Accordion.Root type="multiple">
                <Accordion.Item value="item-1">
                    <Accordion.Trigger class="font-medium text-muted-foreground">Yearly Gross</Accordion.Trigger>
                    <Accordion.Content>
                        <div class="w-full flex flex-row justify-between py-1">
                            <p class="font-medium text-muted-foreground text-sm">
                                {formatCurrency(value[0])}
                            </p>
                            <p class="font-medium text-muted-foreground text-sm">
                                {formatCurrency(value[1])}
                            </p>
                        </div>
                        <Slider class="py-2" bind:value={value} />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>

            <Accordion.Root type="multiple">
                <Accordion.Item value="item-1">
                    <Accordion.Trigger class="font-medium text-muted-foreground">Yearly Profit</Accordion.Trigger>
                    <Accordion.Content>
                        <div class="w-full flex flex-row justify-between py-1">
                            <p class="font-medium text-muted-foreground text-sm">
                                {formatCurrency(value[0])}
                            </p>
                            <p class="font-medium text-muted-foreground text-sm">
                                {formatCurrency(value[1])}
                            </p>
                        </div>
                        <Slider class="py-2" bind:value={value} />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>

            <div class="flex flex-row gap-2 items-center py-5">
                <Checkbox class="border-border" id="public" />
                <label for="public">
                    Public
                </label>
            </div>
        </aside>

        <div class="w-full flex flex-col gap-6">
            {#if businesses.length > 0}
                <OnlineListing listing={businesses[0]} />
            {/if}
        </div>
    </section>
</main>
