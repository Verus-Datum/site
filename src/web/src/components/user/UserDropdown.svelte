<script lang="ts">
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import { Button } from "$components/ui/button";
    import * as DropdownMenu from "$components/ui/dropdown-menu"
    import * as Popover from "$components/ui/popover";
    import * as Avatar from "$components/ui/avatar";

    import Profile from "@lucide/svelte/icons/user";
    import Billing from "@lucide/svelte/icons/credit-card";
    import LogOut from "@lucide/svelte/icons/log-out";
    import Briefcase from "@lucide/svelte/icons/briefcase-business"
    import Listings from "@lucide/svelte/icons/clipboard-list"
    import Provider from "@lucide/svelte/icons/life-buoy"
    import Settings from "@lucide/svelte/icons/settings"
	import { type Snippet } from "svelte";
    import { auth } from "$utils/firebase";
    import { signOut } from "firebase/auth";
    import { currentUser } from "$states/CurrentUser.svelte";
	import { toast } from "svelte-sonner";

    let avatarUrl = null;
    let isOpen = $state(false);
</script>

<Popover.Root bind:open={isOpen}>
    {#if currentUser.user !== null && currentUser.firebase !== null}
        <Popover.Trigger class="flex flex-row duration-150 rounded-lg gap-2 items-center">
            <Avatar.Root class="w-9 h-9">
                <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
                <Avatar.Fallback>CN</Avatar.Fallback>
            </Avatar.Root>
            <ChevronDown size={22} color="#717171" class="" />
        </Popover.Trigger>    
    {:else}
        <a href="/login" class="flex flex-row duration-150 rounded-lg gap-2 items-center">
            <img src={"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} class="w-9 h-9 rounded-full object-cover" />
            <ChevronDown size={22} color="#717171" class="" />
        </a>
    {/if}
    <Popover.Content class="mr-2 w-[250px] bg-white shadow-lg rounded-md p-1 pb-1">
        <div class="font-medium leading-none py-2 px-2 text-sm">My Account</div>
        <div class="h-px bg-border/60 my-1 mx-[-0.25rem]" />
        
        <a onclick={() => {
            isOpen = false;
        }} href="/profile" class="items-center gap-2 rounded-sm hover:cursor-default duration-150 px-2 py-2 text-sm hover:bg-secondary w-full flex flex-row">
            <Profile size={20} class="opacity-50" />
            Profile
        </a>

        <button onclick={() => {
            isOpen = false;
        }} class="items-center gap-2 rounded-sm hover:cursor-default duration-150 px-2 py-2 text-sm hover:bg-secondary w-full flex flex-row">
            <Billing size={20} class="opacity-50" />
            Billing
        </button>

        <button onclick={() => {
            isOpen = false;
        }} class="items-center gap-2 rounded-sm hover:cursor-default duration-150 px-2 py-2 text-sm hover:bg-secondary w-full flex flex-row">
            <Listings size={20} class="opacity-50" />
            Listings
        </button>

        <button onclick={() => {
            isOpen = false;
        }} class="items-center gap-2 rounded-sm hover:cursor-default duration-150 px-2 py-2 text-sm hover:bg-secondary w-full flex flex-row">
            <Settings size={20} class="opacity-50" />
            Settings
        </button>

        <div class="h-px bg-border/60 my-1 mx-[-0.25rem]" />

        <button onclick={() => {
            try {
                signOut(auth);
            } catch (error) {
                toast.error(error.message)
            }
            isOpen = false;
        }} class="items-center gap-2 rounded-sm hover:cursor-default duration-150 px-2 py-2 text-sm hover:bg-secondary w-full flex flex-row">
            <LogOut size={20} class="opacity-50" />
            Log Out
        </button>
    </Popover.Content>
</Popover.Root>