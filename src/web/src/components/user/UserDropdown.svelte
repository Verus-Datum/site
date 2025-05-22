<script lang="ts">
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import { Button } from "$components/ui/button";
    import * as DropdownMenu from "$components/ui/dropdown-menu"
    import * as Popover from "$components/ui/popover";

    import Profile from "@lucide/svelte/icons/user";
    import Billing from "@lucide/svelte/icons/credit-card";
    import LogOut from "@lucide/svelte/icons/log-out";
    import Briefcase from "@lucide/svelte/icons/briefcase-business"
    import Listings from "@lucide/svelte/icons/clipboard-list"
    import Provider from "@lucide/svelte/icons/life-buoy"
    import Settings from "@lucide/svelte/icons/settings"
	import { type Snippet } from "svelte";

    let exampleUrl = "https://www.jpmorgan.com/content/dam/jpm/treasury-services/headshots/headshot-shahrokh-moinian.jpg";
    let isOpen = $state(false);

    $effect(() => {
        console.log(isOpen);
    })
</script>

<Popover.Root bind:open={isOpen}>
    <Popover.Trigger class="flex flex-row duration-150 rounded-lg gap-2 items-center">
        <img src={exampleUrl} alt="User" class="rounded-full w-8 h-8 object-cover" />
        <ChevronDown size={22} color="#717171" class="" />
    </Popover.Trigger>    
    <Popover.Content class="mr-2 w-[250px] bg-white shadow-lg rounded-md p-1 pb-1">
        <div class="font-medium leading-none py-2 px-2 text-sm">My Account</div>
        <div class="h-px bg-border/60 my-1 mx-[-0.25rem]" />

        <a href="/profile" class="items-center gap-2 rounded-sm hover:cursor-default duration-150 px-2 py-2 text-sm hover:bg-secondary w-full flex flex-row">
            <Profile size={20} class="opacity-50" />
            Profile
        </a>

        <button class="items-center gap-2 rounded-sm hover:cursor-default duration-150 px-2 py-2 text-sm hover:bg-secondary w-full flex flex-row">
            <Billing size={20} class="opacity-50" />
            Billing
        </button>

        <button class="items-center gap-2 rounded-sm hover:cursor-default duration-150 px-2 py-2 text-sm hover:bg-secondary w-full flex flex-row">
            <Listings size={20} class="opacity-50" />
            Listings
        </button>

        <button class="items-center gap-2 rounded-sm hover:cursor-default duration-150 px-2 py-2 text-sm hover:bg-secondary w-full flex flex-row">
            <Settings size={20} class="opacity-50" />
            Settings
        </button>

        <div class="h-px bg-border/60 my-1 mx-[-0.25rem]" />

        <button class="items-center gap-2 rounded-sm hover:cursor-default duration-150 px-2 py-2 text-sm hover:bg-secondary w-full flex flex-row">
            <LogOut size={20} class="opacity-50" />
            Log Out
        </button>
    </Popover.Content>
</Popover.Root>