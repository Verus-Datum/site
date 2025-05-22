<script lang="ts">
    import { page } from "$app/state"
	import { Button } from "$components/ui/button";
</script>

<main class="md:pt-20 pt-8 pb-8 w-full md:w-[100%] lg:w-[80%] 2xl:w-[60%] px-8 mx-auto flex-col gap-10 flex items-start justify-start">
    <header class="pt-20 w-full items-center justify-center flex flex-col gap-4">
        <h1 class="text-6xl text-center w-full font-semibold">
            Uh oh!
        </h1>
        
        <h2 class="text-lg text-center font-semibold">
            {page.status} - {page.error.message}
        </h2>

        <p class="text-muted-foreground text-lg text-center">
            {#if page.status === 404}
                This page doesn't exist.
            {/if}
        </p>
        
        <Button class="rounded-full" href="/">
            Go Back Home
        </Button>
    </header>
</main>