<script lang="ts">
	import { flyAndScale } from "$utils/shadcn";

	type Props = {
        name: string;
        address: string;
        price: number;
    }

    let { name, address, price }: Props = $props();
</script>

<div transition:flyAndScale class="rounded-2xl bg-popover text-popover-foreground border border-border shadow-xl p-4 w-80">
	<div class="text-lg font-semibold">{name}</div>
	<div class="text-sm text-muted-foreground">{address}</div>
	<div class="mt-2 text-sm font-medium text-primary">${price.toLocaleString()}</div>
</div>
