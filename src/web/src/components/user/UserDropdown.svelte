<script lang="ts">
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import { Button } from "$components/ui/button";
    import * as DropdownMenu from "$components/ui/dropdown-menu"

    import Profile from "@lucide/svelte/icons/user";
    import Billing from "@lucide/svelte/icons/credit-card";
    import LogOut from "@lucide/svelte/icons/log-out";
    import Briefcase from "@lucide/svelte/icons/briefcase-business"
    import Listings from "@lucide/svelte/icons/clipboard-list"
    import Provider from "@lucide/svelte/icons/life-buoy"
    import Settings from "@lucide/svelte/icons/settings"

    let exampleUrl = "https://www.jpmorgan.com/content/dam/jpm/treasury-services/headshots/headshot-shahrokh-moinian.jpg";
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger class="flex flex-row duration-150 rounded-lg gap-2 items-center">
        <img src={exampleUrl} alt="User" class="rounded-full w-8 h-8 object-cover" />
        <ChevronDown size={22} color="#717171" class="" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="mr-2 w-[250px]">
        <DropdownMenu.Label class="font-medium leading-none py-2.5">My Account</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <a href="/profile">
            <DropdownMenu.Item>
                <Profile size={24} class="opacity-50" />
                Profile
            </DropdownMenu.Item>
        </a>
        <DropdownMenu.Item>
            <Billing size={24} class="opacity-50" />
            Billing
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <Listings size={24} class="opacity-50" />
            Listings
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <Settings size={24} class="opacity-50" />
            Settings
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
            <LogOut size={24} class="opacity-50" />
            Log Out
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>