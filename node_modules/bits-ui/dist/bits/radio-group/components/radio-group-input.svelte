<script lang="ts">
	import HiddenInput from "../../utilities/hidden-input.svelte";
	import { useRadioGroupInput } from "../radio-group.svelte.js";

	const inputState = useRadioGroupInput();
</script>

{#if inputState.shouldRender}
	<HiddenInput {...inputState.props} />
{/if}
