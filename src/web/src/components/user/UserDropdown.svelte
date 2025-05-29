<script lang="ts">
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import * as DropdownMenu from '$components/ui/dropdown-menu';
	import * as Avatar from '$components/ui/avatar';

	import { mode, toggleMode } from 'mode-watcher';

	import Profile from '@lucide/svelte/icons/user';
	import Billing from '@lucide/svelte/icons/credit-card';
	import LogOut from '@lucide/svelte/icons/log-out';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import Listings from '@lucide/svelte/icons/clipboard-list';
	import Settings from '@lucide/svelte/icons/settings';
	import { auth } from '$utils/firebase';
	import { signOut } from 'firebase/auth';
	import { currentUser } from '$states/CurrentUser.svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { mapState } from '$states/MapState.svelte';

	let avatarUrl = null;
	let isOpen = $state(false);
</script>

<DropdownMenu.Root bind:open={isOpen}>
	{#if currentUser.user !== null && currentUser.firebase !== null}
		<DropdownMenu.Trigger class="flex flex-row items-center gap-2 rounded-lg duration-150">
			<Avatar.Root class="h-9 w-9">
				<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
			<ChevronDown size={22} color="#717171" class="" />
		</DropdownMenu.Trigger>
	{:else}
		<a href="/login" class="flex flex-row items-center gap-2 rounded-lg duration-150">
			<img
				src={'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'}
				class="h-9 w-9 rounded-full object-cover"
			/>
		</a>
	{/if}
	<DropdownMenu.Content class="z-[9999] mr-2 w-[250px] rounded-md p-1 pb-1 shadow-lg">
		<div class="px-2 py-2 text-sm font-medium leading-none">My Account</div>
		<div class="mx-[-0.25rem] my-1 h-px bg-border/60" />

		<a
			onclick={() => {
				isOpen = false;
			}}
			href="/profile"
			class="flex w-full flex-row items-center gap-2 rounded-sm px-2 py-2 text-sm duration-150 hover:cursor-default hover:bg-secondary"
		>
			<Profile size={20} class="opacity-50" />
			Profile
		</a>

		<button
			onclick={() => {
				isOpen = false;
			}}
			class="flex w-full flex-row items-center gap-2 rounded-sm px-2 py-2 text-sm duration-150 hover:cursor-default hover:bg-secondary"
		>
			<Billing size={20} class="opacity-50" />
			Billing
		</button>

		<button
			onclick={() => {
				isOpen = false;
			}}
			class="flex w-full flex-row items-center gap-2 rounded-sm px-2 py-2 text-sm duration-150 hover:cursor-default hover:bg-secondary"
		>
			<Listings size={20} class="opacity-50" />
			Listings
		</button>

		<button
			onclick={() => {
				isOpen = false;
			}}
			class="flex w-full flex-row items-center gap-2 rounded-sm px-2 py-2 text-sm duration-150 hover:cursor-default hover:bg-secondary"
		>
			<Settings size={20} class="opacity-50" />
			Settings
		</button>

		<div class="mx-[-0.25rem] my-1 h-px bg-border/60" />

		<button
			onclick={() => {
                toggleMode();
                const newMode = mode.current;
                mapState.mode = newMode;
                console.log(newMode);
			}}
			class="flex w-full flex-row items-center gap-2 rounded-sm px-2 py-2 text-sm duration-150 hover:cursor-default hover:bg-secondary"
		>
			<Sun size={20} class="flex opacity-50 dark:hidden" />
			<Moon size={20} class="hidden opacity-50 dark:flex dark:scale-100" />
			Theme
		</button>

		<div class="mx-[-0.25rem] my-1 h-px bg-border/60" />

		<button
			onclick={() => {
				try {
					signOut(auth);
					goto('/login');
				} catch (error) {
					toast.error(error.message);
				}
				isOpen = false;
			}}
			class="flex w-full flex-row items-center gap-2 rounded-sm px-2 py-2 text-sm duration-150 hover:cursor-default hover:bg-secondary"
		>
			<LogOut size={20} class="opacity-50" />
			Log Out
		</button>
	</DropdownMenu.Content>
</DropdownMenu.Root>
