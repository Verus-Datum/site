<script lang="ts">
	import { box } from "svelte-toolbelt";
	import type { MenuSubProps } from "../types.js";
	import { useMenuSubmenu } from "../menu.svelte.js";
	import FloatingLayer from "../../utilities/floating-layer/components/floating-layer.svelte";
	import { noop } from "../../../internal/noop.js";

	let { open = $bindable(false), onOpenChange = noop, children }: MenuSubProps = $props();

	useMenuSubmenu({
		open: box.with(
			() => open,
			(v) => {
				open = v;
				onOpenChange?.(v);
			}
		),
	});
</script>

<FloatingLayer>
	{@render children?.()}
</FloatingLayer>
