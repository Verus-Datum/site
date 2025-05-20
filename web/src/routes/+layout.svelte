<script lang="ts">
	import '../app.css';
    import Navbar from '$components/layout/Navbar.svelte';
	import Header from '$components/layout/Header.svelte';

	let { children } = $props();
</script>

<Navbar>
    <Header />
</Navbar>

{@render children()}
