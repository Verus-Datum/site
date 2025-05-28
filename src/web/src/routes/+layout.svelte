<script lang="ts">
	import '../app.css';
    import Navbar from '$components/layout/Navbar.svelte';
	import Header from '$components/layout/Header.svelte';
	import FloatingPanel from '$components/ui/floating-panel/floating-panel.svelte';
	import BrokerList from '$components/business/BrokerList.svelte';
    import { page } from "$app/state"
    import { Toaster } from "$components/ui/sonner";
	import { currentUser } from '$states/CurrentUser.svelte';
    import { ModeWatcher } from "mode-watcher";

    //$inspect(currentUser.user, currentUser.firebase, currentUser.loggedIn);

	let { children } = $props();
</script>

<Toaster />
<ModeWatcher />

<FloatingPanel>
    <BrokerList />
</FloatingPanel>

<Navbar />
<Header />

<main class="">
    {@render children?.()}
</main>
