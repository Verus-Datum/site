<script lang="ts">
	import DigitalProduct from "$components/products/DigitalProduct.svelte";
	import ScreenContainer from "$components/layout/ScreenContainer.svelte";
	import type { Product } from "$models/Product";
	import { onMount } from "svelte";
    import * as Select from "$components/ui/select"
	import { productService } from "$services/productService";
	import { Input } from "$components/ui/input";
	import { Skeleton } from "$components/ui/skeleton";

	let products = $state<Product[]>([]);
	let productsLoaded = $state<boolean>(false);

	let categorized = $state<Record<string, Product[]>>({});

	onMount(async () => {
		products = await productService.getAll();
		productsLoaded = true;

		for (const product of products) {
			if (!categorized[product.category]) categorized[product.category] = [];
			categorized[product.category].push(product);
		}
	});
</script>

<ScreenContainer class="width">
    <header class="flex flex-col items-start md:items-center gap-6 w-full mt-20 md:my-20">
        <h1 class="text-4xl font-semibold md:text-center text-left">
            Digital documents for every stage of the deal
        </h1>
        <h2 class="text-muted-foreground md:text-center text-left">
            Browse professional M&A templates used by top firms. Pay once, use forever.
        </h2>

        <div class="flex flex-col md:flex-row gap-2 w-full md:w-[55%]">
            <Input placeholder="Search templates..." class="w-full h-11 text-sm" />
            <Select.Root type="single">
                <Select.Trigger class="h-11 hidden md:flex max-w-[150px] rounded-md text-foreground font-normal">Category</Select.Trigger>
                <Select.Content>
                    <Select.Item value="light">Light</Select.Item>
                    <Select.Item value="dark">Dark</Select.Item>
                    <Select.Item value="system">System</Select.Item>
                </Select.Content>
            </Select.Root>
        </div>
    </header>

	{#each Object.entries(categorized) as [category, items]}
		<div class="mb-8 w-full">
			<h2 class="text-xl font-bold mb-4">{category}</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{#if productsLoaded}
					{#each items as product}
						<DigitalProduct {product} />
					{/each}
				{:else}
					{#each Array(6) as _}
						<Skeleton class="w-full h-64" />
					{/each}				
				{/if}
			</div>
		</div>
	{/each}
</ScreenContainer>
