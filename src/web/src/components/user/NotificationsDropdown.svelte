<script lang="ts">
    import NotificationBell from '@lucide/svelte/icons/bell'    
    import * as Popover from "$components/ui/popover"
    import * as DropdownMenu from "$components/ui/dropdown-menu"
    import * as Avatar from '$components/ui/avatar';
</script>

<Popover.Root>
    <Popover.Trigger class="relative">
        <p class="absolute bg-chip-red top-0 left-4 text-white px-1 text-xs rounded">
            2
        </p>
        <NotificationBell color="#717171" size={22} />
    </Popover.Trigger>
    <Popover.Content  class="mr-2 p-1 w-[350px]">
        <DropdownMenu.Label class="font-medium leading-none py-2.5">2 Notifications</DropdownMenu.Label>
        <div class="bg-muted -mx-1 my-1 h-px"></div>
        <button class="p-2 flex flex-row gap-2 hover:bg-secondary text-left rounded-lg">
            <Avatar.Root class="h-10 w-10 border rounded-full">
                <Avatar.Fallback>DM</Avatar.Fallback>
            </Avatar.Root>
            <header class="flex flex-col">
                <p class="h-auto line-clamp-2 text-sm text-muted-foreground">
                    <span class="font-medium text-foreground">
                        Debra M.
                    </span>
                    Hi there, I saw your listing for AEY Inc. and I have a few qualified buyers who may be interested.
                </p>
            </header>
        </button>
        <button class="p-2 flex flex-row gap-2 hover:bg-secondary text-left rounded-lg">
            <Avatar.Root class="h-10 w-10 border rounded-full">
                <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar.Root>           
            <header class="flex flex-col">
                <p class="h-auto line-clamp-2 text-sm text-muted-foreground">
                    <span class="font-medium text-foreground">
                        James D.
                    </span>
                    I'd love to schedule a quick call to discuss further. When would be a good time?
                </p>
            </header>
        </button>
    </Popover.Content>
</Popover.Root>