<script lang="ts">
	import { Command as CommandPrimitive } from 'bits-ui';
	import { cn } from '$utils/shadcn.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CommandPrimitive.SeparatorProps = $props();
</script>

<CommandPrimitive.Separator class={cn('-mx-1 h-px bg-border', className)} bind:ref {...restProps} />
