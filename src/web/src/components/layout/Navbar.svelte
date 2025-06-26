<script lang="ts">
	import MapIcon from '@lucide/svelte/icons/map';
	import Briefcase from '@lucide/svelte/icons/briefcase-business';
	import Menu from '@lucide/svelte/icons/menu';
	import UserDropdown from '$components/user/UserDropdown.svelte';
	import transparent from '$assets/transparent.png';
	import { page } from '$app/state';
	import { Button } from '$components/ui/button';
    import * as Sheet from "$components/ui/sheet";

	let sheetOpen = $state(false);
</script>

<div class="fixed top-0 left-0 z-40 w-full bg-background backdrop-blur-md">
	<nav class="flex h-[4rem] md:h-[4rem] border-b items-center justify-between px-4 md:px-6">
		<div class="flex flex-row items-center gap-10">
            <div class="flex items-center gap-2">
                <Button onclick={() => (sheetOpen = !sheetOpen)} size="icon" variant="ghost" class="md:hidden text-muted-foreground">
                    <Menu size={24} />
                </Button>
                <a href="/" class="flex items-center gap-2 text-primary">
                    <div
                        class="h-11 w-11 bg-primary"
                        style={`-webkit-mask-image: url(${transparent}); mask-image: url(${transparent}); -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: contain; mask-size: contain; -webkit-mask-position: center; mask-position: center;`}
                    />
                    <h1 class="font-semibold text-primary">Verus Datum</h1>
                </a>
            </div>

            <div class="hidden md:flex items-center gap-6">
                <a href="/listings/map" class="{page.url.pathname === "/listings/map" ? "font-semibold text-foreground" : "font-medium text-muted-foreground"} flex px-2 hover:text-foreground duration-150 items-center gap-2 text-sm">
                    Map
                </a>
                <a href="/listings" class="{page.url.pathname === "/listings" ? "font-semibold text-foreground" : "font-medium text-muted-foreground"} flex px-2 hover:text-foreground duration-150 items-center gap-2 text-sm">
                    All Listings
                </a>
                <a href="/products" class="{page.url.pathname === "/products" ? "font-semibold text-foreground" : "font-medium text-muted-foreground"} flex px-2 hover:text-foreground duration-150 items-center gap-2 text-sm">
                    Digital Products
                </a>
            </div>
        </div>

		<div class="flex items-center">
			<UserDropdown />
		</div>
	</nav>

	<Sheet.Root open={sheetOpen}>
        <Sheet.Content side="left" class="p-4">
            <a href="/" class="flex items-center gap-2 text-primary">
                <div
                    class="h-11 w-11 bg-primary"
                    style={`-webkit-mask-image: url(${transparent}); mask-image: url(${transparent}); -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: contain; mask-size: contain; -webkit-mask-position: center; mask-position: center;`}
                />
                <h1 class="font-semibold text-primary">Verus Datum</h1>
            </a>
            <a onclick={() => sheetOpen = false} href="/listings/map" class="{page.url.pathname === "/listings/map" ? "font-semibold bg-secondary text-foreground" : "font-medium text-muted-foreground"} flex my-1 p-2.5 rounded-lg hover:text-foreground duration-150 items-center gap-2 text-sm hover:bg-secondary">
                Map
            </a>
            <a onclick={() => sheetOpen = false} href="/listings" class="{page.url.pathname === "/listings" ? "font-semibold bg-secondary text-foreground" : "font-medium text-muted-foreground"} flex my-1 p-2.5 rounded-lg hover:text-foreground duration-150 items-center gap-2 text-sm hover:bg-secondary">
                All Listings
            </a>
            <a onclick={() => sheetOpen = false} href="/products" class="{page.url.pathname === "/products" ? "font-semibold bg-secondary text-foreground" : "font-medium text-muted-foreground"} flex my-1 p-2.5 rounded-lg hover:text-foreground duration-150 items-center gap-2 text-sm hover:bg-secondary">
                Digital Products
            </a>
        </Sheet.Content>
    </Sheet.Root>
</div>
