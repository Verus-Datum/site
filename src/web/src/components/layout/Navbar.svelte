<script lang="ts">
	import UserDropdown from '$components/user/UserDropdown.svelte';
	import Briefcase from '@lucide/svelte/icons/briefcase-business';
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import MapIcon from '@lucide/svelte/icons/map';
	import Menu from '@lucide/svelte/icons/menu';
	import * as Sheet from '$components/ui/sheet';
	import transparent from '$assets/transparent.png';
	
let {
		children
	}: {
		children: Snippet;
	} = $props();

	const ignoredPages = ['/login', '/register'];

	let sheetOpen = $state<boolean>(false);

	let active = $derived(
		page.url.pathname === '/' ? 'business' : page.url.pathname === '/listings' ? 'all' : ''
	);
	let exampleUrl =
		'https://media.istockphoto.com/id/1413766112/photo/successful-mature-businessman-looking-at-camera-with-confidence.jpg?s=612x612&w=0&k=20&c=NJSugBzNuZqb7DJ8ZgLfYKb3qPr2EJMvKZ21Sj5Sfq4=';
</script>

<div class="absolute left-0 top-0 z-40 flex w-screen flex-col justify-center bg-background">
	<nav
		class="relative flex h-[4rem] w-full items-center justify-between border-b px-4 md:h-[4.5rem] md:px-6"
	>
		<Sheet.Root bind:open={sheetOpen}>
			<Sheet.Trigger class="flex flex-row items-center gap-2 text-muted-foreground md:hidden">
				<Menu size={24} />
			</Sheet.Trigger>
			<Sheet.Content side="left" class="p-3">
				<Sheet.Header>
					<a href="/" class="flex flex-row items-center gap-2 text-primary md:hidden">
						<div
							class="h-11 w-11 bg-primary"
							style={`-webkit-mask-image: url(${transparent}); mask-image: url(${transparent}); -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: contain; mask-size: contain; -webkit-mask-position: center; mask-position: center;`}
						></div>
						<h1 class="whitespace-nowrap font-semibold text-black">Verus Datum</h1>
					</a>
				</Sheet.Header>
				<div class="flex flex-col gap-0.5 py-4">
					<a
						onclick={() => (sheetOpen = false)}
						href="/"
						class={`flex w-full flex-row items-center justify-start gap-3 rounded-xl p-3 text-left text-sm duration-200 hover:bg-secondary ${
							page.url.pathname === '/'
								? 'font-medium text-black'
								: 'text-muted-foreground'
						}`}
					>
						<MapIcon size={24} />
						Map View
					</a>

					<a
						onclick={() => (sheetOpen = false)}
						href="/listings"
						class={`flex w-full flex-row items-center justify-start gap-3 rounded-xl p-3 text-left text-sm duration-200 hover:bg-secondary ${
							page.url.pathname === '/listings'
								? 'font-medium text-foreground'
								: 'text-muted-foreground'
						}`}
					>
						<Briefcase size={24} />
						All Businesses
					</a>
				</div>
			</Sheet.Content>
		</Sheet.Root>
		<a
			href="/"
			class="absolute left-1/2 flex -translate-x-1/2 transform flex-row items-center gap-2 text-primary md:hidden"
		>
			<div
				class="h-11 w-11 bg-primary"
				style={`-webkit-mask-image: url(${transparent}); mask-image: url(${transparent}); -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: contain; mask-size: contain; -webkit-mask-position: center; mask-position: center;`}
			></div>
			<h1 class="whitespace-nowrap font-semibold text-foreground">Verus Datum</h1>
		</a>
		<a href="/" class="hidden flex-row items-center gap-2 text-primary md:flex">
			<div
				class="h-11 w-11 bg-primary"
				style={`-webkit-mask-image: url(${transparent}); mask-image: url(${transparent}); -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: contain; mask-size: contain; -webkit-mask-position: center; mask-position: center;`}
			></div>
			<h1 class="whitespace-nowrap font-semibold text-foreground">Verus Datum</h1>
		</a>
		<section
			class="{ignoredPages.includes(page.url.pathname)
				? 'hidden'
				: 'hidden md:flex'} absolute left-1/2 h-full w-full -translate-x-1/2 flex-row items-center justify-center md:w-[25rem]"
		>
			<div
				class="absolute bottom-0 h-0.5 bg-foreground transition-all duration-300 {active !==
					'business' && active !== 'all'
					? 'hidden'
					: ''}"
				style:width={active === 'business' ? '50%' : '50%'}
				style:left={active === 'business' ? '0px' : '50%'}
			/>
			<a
				href="/"
				onclick={() => (active = 'business')}
				class="{active !== 'business'
					? 'font-semibold text-muted-foreground'
					: 'font-bold'} flex h-full w-full flex-row items-center justify-center gap-3 px-2 text-sm duration-200"
			>
				<MapIcon size={24} />
				Map View
			</a>
			<a
				href="/listings"
				onclick={() => (active = 'all')}
				class="{active !== 'all'
					? 'font-semibold text-muted-foreground'
					: 'font-bold'} flex h-full w-full flex-row items-center justify-center gap-3 px-2 text-sm duration-200"
			>
				<Briefcase size={24} />
				All Businesses
			</a>
		</section>
		<section class="flex w-64 flex-row justify-end gap-6 overflow-visible">
			<!--
                <NotificationsDropdown />
            -->
			<UserDropdown />
		</section>
	</nav>
</div>
