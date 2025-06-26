<script lang="ts">
	import '../app.css';
	import Navbar from '$components/layout/Navbar.svelte';
	import Header from '$components/layout/Header.svelte';
	import FloatingPanel from '$components/ui/floating-panel/floating-panel.svelte';
	import BrokerList from '$components/business/BrokerList.svelte';
	import { Toaster } from '$components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';

	//$inspect(currentUser.user, currentUser.firebase, currentUser.loggedIn);

	let { children } = $props();
</script>

<Toaster />
<ModeWatcher />

<FloatingPanel>
	<BrokerList />
</FloatingPanel>

<Navbar />

<main class="">
	{@render children?.()}
</main>
