<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$components/ui/button';
</script>

<main
	class="mx-auto flex w-full flex-col items-start justify-start gap-10 px-8 pb-8 pt-8 md:w-[100%] md:pt-20 lg:w-[80%] 2xl:w-[60%]"
>
	<header class="flex w-full flex-col items-center justify-center gap-4 pt-20">
		<h1 class="w-full text-center text-6xl font-semibold">Uh oh!</h1>

		<h2 class="text-center text-lg font-semibold">
			{page.status} - {page.error.message}
		</h2>

		<p class="text-center text-lg text-muted-foreground">
			{#if page.status === 404}
				This page doesn't exist.
			{/if}
		</p>

		<Button class="rounded-full" href="/">Go Back Home</Button>
	</header>
</main>
