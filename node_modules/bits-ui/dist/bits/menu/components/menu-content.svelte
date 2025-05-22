<script lang="ts">
	import { box, mergeProps } from "svelte-toolbelt";
	import type { MenuContentProps } from "../types.js";
	import { useMenuContent } from "../menu.svelte.js";
	import { useId } from "../../../internal/use-id.js";
	import { noop } from "../../../internal/noop.js";
	import PopperLayer from "../../utilities/popper-layer/popper-layer.svelte";
	import Mounted from "../../utilities/mounted.svelte";
	import { getFloatingContentCSSVars } from "../../../internal/floating-svelte/floating-utils.svelte.js";
	import PopperLayerForceMount from "../../utilities/popper-layer/popper-layer-force-mount.svelte";

	let {
		id = useId(),
		child,
		children,
		ref = $bindable(null),
		loop = true,
		onInteractOutside = noop,
		onEscapeKeydown = noop,
		onCloseAutoFocus: onCloseAutoFocusProp = noop,
		forceMount = false,
		...restProps
	}: MenuContentProps = $props();

	const contentState = useMenuContent({
		id: box.with(() => id),
		loop: box.with(() => loop),
		ref: box.with(
			() => ref,
			(v) => (ref = v)
		),
		onCloseAutoFocus: box.with(() => onCloseAutoFocusProp),
	});

	const mergedProps = $derived(
		mergeProps(restProps, contentState.props, {
			style: { outline: "none" },
		})
	);

	function handleInteractOutside(e: PointerEvent) {
		onInteractOutside(e);
		if (e.defaultPrevented) return;
		contentState.parentMenu.onClose();
	}

	function handleEscapeKeydown(e: KeyboardEvent) {
		onEscapeKeydown(e);
		if (e.defaultPrevented) return;
		contentState.parentMenu.onClose();
	}
</script>

{#if forceMount}
	<PopperLayerForceMount
		{...mergedProps}
		{...contentState.popperProps}
		enabled={contentState.parentMenu.opts.open.current}
		onInteractOutside={handleInteractOutside}
		onEscapeKeydown={handleEscapeKeydown}
		trapFocus
		{loop}
		forceMount={true}
		{id}
	>
		{#snippet popper({ props, wrapperProps })}
			{@const finalProps = mergeProps(props, {
				style: {
					outline: "none",
					...getFloatingContentCSSVars("menu"),
				},
			})}
			{#if child}
				{@render child({ props: finalProps, wrapperProps, ...contentState.snippetProps })}
			{:else}
				<div {...wrapperProps}>
					<div {...finalProps}>
						{@render children?.()}
					</div>
				</div>
			{/if}
			<Mounted bind:mounted={contentState.mounted} />
		{/snippet}
	</PopperLayerForceMount>
{:else if !forceMount}
	<PopperLayer
		{...mergedProps}
		{...contentState.popperProps}
		present={contentState.parentMenu.opts.open.current}
		onInteractOutside={handleInteractOutside}
		onEscapeKeydown={handleEscapeKeydown}
		trapFocus
		{loop}
		forceMount={false}
		{id}
	>
		{#snippet popper({ props, wrapperProps })}
			{@const finalProps = mergeProps(props, {
				style: {
					outline: "none",
					...getFloatingContentCSSVars("menu"),
				},
			})}
			{#if child}
				{@render child({ props: finalProps, wrapperProps, ...contentState.snippetProps })}
			{:else}
				<div {...wrapperProps}>
					<div {...finalProps}>
						{@render children?.()}
					</div>
				</div>
			{/if}
			<Mounted bind:mounted={contentState.mounted} />
		{/snippet}
	</PopperLayer>
{/if}
