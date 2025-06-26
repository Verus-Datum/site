<script lang="ts">
	import NotificationBell from '@lucide/svelte/icons/bell';
	import * as Popover from '$components/ui/popover';
	import * as DropdownMenu from '$components/ui/dropdown-menu';
	import * as Avatar from '$components/ui/avatar';
</script>

<Popover.Root>
	<Popover.Trigger class="relative">
		<p class="absolute left-4 top-0 rounded bg-chip-red px-1 text-xs text-white">2</p>
		<NotificationBell color="#717171" size={22} />
	</Popover.Trigger>
	<Popover.Content class="mr-2 w-[350px] p-1">
		<DropdownMenu.Label class="py-2.5 font-medium leading-none"
			>2 Notifications</DropdownMenu.Label
		>
		<div class="-mx-1 my-1 h-px bg-muted"></div>
		<button class="flex flex-row gap-2 rounded-md p-2 text-left hover:bg-secondary">
			<Avatar.Root class="h-10 w-10 rounded-full border">
				<Avatar.Fallback>DM</Avatar.Fallback>
			</Avatar.Root>
			<header class="flex flex-col">
				<p class="line-clamp-2 h-auto text-sm text-muted-foreground">
					<span class="font-medium text-foreground"> Debra M. </span>
					Hi there, I saw your listing for AEY Inc. and I have a few qualified buyers who may
					be interested.
				</p>
			</header>
		</button>
		<button class="flex flex-row gap-2 rounded-md p-2 text-left hover:bg-secondary">
			<Avatar.Root class="h-10 w-10 rounded-full border">
				<Avatar.Fallback>JD</Avatar.Fallback>
			</Avatar.Root>
			<header class="flex flex-col">
				<p class="line-clamp-2 h-auto text-sm text-muted-foreground">
					<span class="font-medium text-foreground"> James D. </span>
					I'd love to schedule a quick call to discuss further. When would be a good time?
				</p>
			</header>
		</button>
	</Popover.Content>
</Popover.Root>
