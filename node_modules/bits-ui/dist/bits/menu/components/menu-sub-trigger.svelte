<script lang="ts">
	import { box, mergeProps } from "svelte-toolbelt";
	import type { MenuSubTriggerProps } from "../types.js";
	import { useMenuSubTrigger } from "../menu.svelte.js";
	import { useId } from "../../../internal/use-id.js";
	import FloatingLayerAnchor from "../../utilities/floating-layer/components/floating-layer-anchor.svelte";
	import { noop } from "../../../internal/noop.js";
	let {
		id = useId(),
		disabled = false,
		ref = $bindable(null),
		children,
		child,
		onSelect = noop,
		...restProps
	}: MenuSubTriggerProps = $props();

	const subTriggerState = useMenuSubTrigger({
		disabled: box.with(() => disabled),
		onSelect: box.with(() => onSelect),
		id: box.with(() => id),
		ref: box.with(
			() => ref,
			(v) => (ref = v)
		),
	});

	const mergedProps = $derived(mergeProps(restProps, subTriggerState.props));
</script>

<FloatingLayerAnchor {id}>
	{#if child}
		{@render child({ props: mergedProps })}
	{:else}
		<div {...mergedProps}>
			{@render children?.()}
		</div>
	{/if}
</FloatingLayerAnchor>
