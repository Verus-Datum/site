<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<main
	in:fly={{ y: 20, duration: 650 }}
	class="mx-auto flex w-full flex-col items-start justify-start gap-10 px-8 pb-8 pt-8 md:w-[100%] md:pt-20 lg:w-[80%] 2xl:w-[60%] 3xl:w-[65%]"
>
	{@render children?.()}
</main>
