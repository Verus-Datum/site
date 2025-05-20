<script lang="ts">
    import NotificationBell from '@lucide/svelte/icons/bell'    
    import * as Popover from "$components/ui/popover"
    import * as DropdownMenu from "$components/ui/dropdown-menu"
</script>

<Popover.Root>
    <Popover.Trigger class="relative">
        <p class="absolute bg-chip-red top-0 left-4 text-white px-1 text-xs rounded">
            2
        </p>
        <NotificationBell color="#717171" size={22} />
    </Popover.Trigger>
    <Popover.Content  class="mr-2 p-1 w-[350px]">
        <DropdownMenu.Label class="font-medium leading-none py-2.5">Notifications</DropdownMenu.Label>
        <div class="bg-muted -mx-1 my-1 h-px"></div>
        <button class="p-2 flex flex-row gap-2 hover:bg-secondary text-left rounded-lg">
            <img src={"https://freedesignfile.com/upload/2017/05/Embrace-folder-young-business-woman-Stock-Photo.jpg"} class="h-10 w-10 border rounded-full object-cover" />
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
            <img src={"https://t4.ftcdn.net/jpg/01/34/51/81/360_F_134518160_5DyP0y6YqXQgG6FdorIvpk7M6CBNrglm.jpg"} class="h-10 w-10 border rounded-full object-cover" />
            <header class="flex flex-col">
                <p class="h-auto line-clamp-2 text-sm text-muted-foreground">
                    <span class="font-medium text-foreground">
                        Dexter M.
                    </span>
                    I'd love to schedule a quick call to discuss further. When would be a good time?
                </p>
            </header>
        </button>
    </Popover.Content>
</Popover.Root>