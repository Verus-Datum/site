<script lang="ts">
	import { Badge } from "$components/ui/badge";
    import { Button } from "$components/ui/button";
    import Lock from "@lucide/svelte/icons/lock";
	import type { Product } from "$models/Product";
    
    type Props = {
        product: Product;
    }

    const { product }: Props = $props();

    let tags = $derived<string[]>(product.tags?.split(',') as string[]);
</script>

<div class="rounded-lg bg-secondary w-full flex flex-col gap-3 border shadow-sm p-4 md:p-5">
    <header>
        <h1 class="font-semibold md:whitespace-nowrap md:truncate">
            {product.name}
        </h1>
        <h2 class="text-muted-foreground text-sm mt-1.5">
            {product.description}
        </h2>
    </header>

    <div class="flex flex-row gap-2 truncate">
        {#each tags as tag}
            <Badge variant="outline" class="text-xs">
                {tag.trim().charAt(0).toUpperCase() + tag.trim().slice(1)}
            </Badge>
        {/each}
    </div>

    <div class="flex flex-row justify-between">
        <h1 class="text-primary text-lg font-bold">
            ${product.price}
        </h1>
        <Badge class="bg-blue-flat text-blue-foreground px-3 py-0.5 font-semibold">
            <Lock size={10} class="mr-1" />
            Locked
        </Badge>
    </div>

    <footer class="flex flex-col md:flex-row gap-2 md:gap-4">
        <Button class="w-full h-9 bg-secondary" variant="outline">
            Preview
        </Button>
        <Button class="w-full h-9">
            Purchase
        </Button>
    </footer>
</div>