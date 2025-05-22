<script lang="ts">
	import { box } from "svelte-toolbelt";
	import type { PopoverRootProps } from "../types.js";
	import { usePopoverRoot } from "../popover.svelte.js";
	import FloatingLayer from "../../utilities/floating-layer/components/floating-layer.svelte";
	import { noop } from "../../../internal/noop.js";

	let { open = $bindable(false), onOpenChange = noop, children }: PopoverRootProps = $props();

	usePopoverRoot({
		open: box.with(
			() => open,
			(v) => {
				open = v;
				onOpenChange(v);
			}
		),
	});
</script>

<FloatingLayer>
	{@render children?.()}
</FloatingLayer>
