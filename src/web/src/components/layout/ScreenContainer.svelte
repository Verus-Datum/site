<script lang="ts">
	import { cn } from '$utils/shadcn';
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	type Props = {
		children: Snippet;
		class?: string;
	};

	let { children, class: classProp }: Props = $props();
</script>

<!-- Have to cap this cause of how bad it is on Isaiah's ultrawide lol -->
<main
  in:fly={{ y: 20, duration: 650 }}
  class={cn(
    "mx-auto flex w-full max-w-[1600px] flex-col items-start justify-start gap-10 px-8 pb-8 pt-8 md:w-[100%] md:pt-20 lg:w-[80%] 2xl:w-[60%] 3xl:w-[65%]",
    classProp
  )}
>
  {@render children?.()}
</main>