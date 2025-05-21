<script lang="ts">
	import '../app.css';
    import Navbar from '$components/layout/Navbar.svelte';
	import Header from '$components/layout/Header.svelte';
	import FloatingPanel from '$components/ui/floating-panel/floating-panel.svelte';
	import BrokerList from '$components/business/BrokerList.svelte';

	let { children } = $props();
</script>

<FloatingPanel>
    <BrokerList />
</FloatingPanel>

<Navbar>
    <Header />
</Navbar>

<main class="">
    {@render children()}
</main>
