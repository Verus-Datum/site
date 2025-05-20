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

    let exampleUrl = "https://media.istockphoto.com/id/1413766112/photo/successful-mature-businessman-looking-at-camera-with-confidence.jpg?s=612x612&w=0&k=20&c=NJSugBzNuZqb7DJ8ZgLfYKb3qPr2EJMvKZ21Sj5Sfq4=";
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger class="flex flex-row duration-150 rounded-lg gap-2 items-center">
        <img src={exampleUrl} alt="User" class="rounded-full w-10 h-10 object-cover" />
        <ChevronDown size={22} color="#717171" class="" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="mr-2 w-[250px]">
        <DropdownMenu.Label class="font-medium leading-none py-2.5">My Account</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
            <Profile class="opacity-50" />
            Profile
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <Billing class="opacity-50" />
            Billing
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <Listings class="opacity-50" />
            Listings
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <Settings class="opacity-50" />
            Settings
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
            <LogOut class="opacity-50" />
            Log Out
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>