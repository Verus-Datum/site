<script lang="ts">
	import '../app.css';
    import Navbar from '$components/layout/Navbar.svelte';
	import Header from '$components/layout/Header.svelte';
	import FloatingPanel from '$components/ui/floating-panel/floating-panel.svelte';
	import BrokerList from '$components/business/BrokerList.svelte';
    import { page } from "$app/state"
    import { Toaster } from "$components/ui/sonner";
	import { currentUser } from '$states/CurrentUser.svelte';

    $effect(() => {
        console.log(currentUser);
    })

	let { children } = $props();
</script>

<Toaster />

<FloatingPanel>
    <BrokerList />
</FloatingPanel>

<Navbar>
    <Header />
</Navbar>

<main class="">
    {@render children?.()}
</main>
