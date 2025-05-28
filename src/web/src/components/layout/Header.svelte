<script lang="ts">
    import * as Select from '$components/ui/select'

    import LocationPin from '@lucide/svelte/icons/map-pinned'
    import PieChart from '@lucide/svelte/icons/chart-pie'
    import People from '@lucide/svelte/icons/users-round'
    import Star from '@lucide/svelte/icons/star'
    import List from "@lucide/svelte/icons/list"
    import { page } from '$app/state'
    import CalendarIcon from '@lucide/svelte/icons/calendar'
    import { FloatingPanelState } from '$states/FloatingPanel.svelte'
    import { flyAndScale } from '$utils/shadcn'

    import { mapState } from "$states/MapState.svelte"
	import { type LngLatLike } from 'maplibre-gl';
	import FloatingPanel from '$components/ui/floating-panel/floating-panel.svelte';

    const locations = [
        { value: 'ny', label: 'New York', lng_lat: [-74.006, 40.7128] },
        { value: 'la', label: 'Los Angeles', lng_lat: [-118.2437, 34.0522] },
        { value: 'chi', label: 'Chicago', lng_lat: [-87.6298, 41.8781] },
        { value: 'hou', label: 'Houston', lng_lat: [-95.3698, 29.7604] },
        { value: 'phx', label: 'Phoenix', lng_lat: [-112.074, 33.4484] }
    ];

    const industries = [
        { value: 'retail', label: 'Retail' },
        { value: 'product', label: 'Product' },
        { value: 'services', label: 'Services' },
        { value: 'tech', label: 'Technology' }
    ]

    const roles = [
        { value: 'broker', label: 'Broker' },
        { value: 'owner', label: 'Owner' }
    ]

    const sizes = [
        { value: 'small', label: 'Small (1-10)' },
        { value: 'medium', label: 'Medium (11-50)' },
        { value: 'large', label: 'Large (51+)' }
    ]

    const dates = [
        { value: 'any', label: 'Any Date' },
        { value: 'last_7', label: 'Last 7 Days' },
        { value: 'last_30', label: 'Last 30 Days' },
        { value: 'this_year', label: 'This Year' }
    ]

    let location = ''
    let industry = ''
    let role = ''
    let size = ''
    let date = ''
</script>

{#if page.url.pathname === "/"}
    {#if false}
        <button onclick={() => {
            FloatingPanelState.open = true;
            FloatingPanelState.displaySnippet("brokers");
        }} transition:flyAndScale class="absolute hover:bg-secondary duration-200 top-[11.5rem] z-50 left-6 flex flex-row gap-2 items-center justify-center bg-white shadow-ui rounded-lg p-3 px-4 font-semibold">
            <List size={20} />
            <p class="hidden md:flex">Show List</p>
        </button>
    {/if}

    <div class="border-b w-full h-[5rem] absolute md:h-[5.5rem] md:mt-[4.5rem] md:px-6 md:gap-4 mt-[4rem] px-2 gap-2 z-50 bg-background overflow-x-auto hide-scrollbar overflow-y-hidden flex items-center">
        <Select.Root type="single" name="location" bind:value={location}>
            <Select.Trigger class={`w-auto h-11 shadow-sm min-w-[24ch] text-nowrap text-left ${location ? 'bg-blue-flat border-none text-primary' : ''}`}>
                <p class="flex flex-row items-center gap-2 {location ? 'text-blue-foreground' : ''}">
                    <LocationPin size={20} />
                    {locations.find((l) => l.value === location)?.label ?? 'Select a location'}
                </p>
            </Select.Trigger>
            <Select.Content>
                <Select.Group>
                    {#each locations as loc}
                        <Select.Item onclick={() => {
                            mapState.center = loc.lng_lat as LngLatLike;
                        }} value={loc.value} label={loc.label} />
                    {/each}
                </Select.Group>
            </Select.Content>
        </Select.Root>

        <Select.Root type="single" name="market" bind:value={industry}>
            <Select.Trigger class={`w-auto h-11 shadow-sm min-w-[22ch] text-nowrap text-left ${industry ? 'bg-blue-flat border-none text-primary' : ''}`}>
                <p class="flex flex-row items-center gap-2 {industry ? 'text-blue-foreground' : ''}">
                    <PieChart size={20} />
                    {industries.find((i) => i.value === industry)?.label ?? 'Market'}
                </p>
            </Select.Trigger>
            <Select.Content>
                <Select.Group>
                    {#each industries as i}
                    <Select.Item value={i.value} label={i.label} />
                    {/each}
                </Select.Group>
            </Select.Content>
        </Select.Root>

        <Select.Root type="single" name="role" bind:value={role}>
            <Select.Trigger class={`w-auto h-11 shadow-sm min-w-[22ch] text-nowrap text-left ${role ? 'bg-blue-flat border-none text-primary' : ''}`}>
                <p class="flex flex-row items-center gap-2 {role ? 'text-blue-foreground' : ''}">
                    <People size={20} />
                    {roles.find((r) => r.value === role)?.label ?? 'Brokers and Owners'}
                </p>
            </Select.Trigger>
            <Select.Content>
                <Select.Group>
                    {#each roles as r}
                    <Select.Item value={r.value} label={r.label} />
                    {/each}
                </Select.Group>
            </Select.Content>
        </Select.Root>

        <Select.Root type="single" name="size" bind:value={size}>
            <Select.Trigger class={`w-auto h-11 shadow-sm min-w-[22ch] text-nowrap text-left ${size ? 'bg-blue-flat border-none text-primary' : ''}`}>
                <p class="flex flex-row items-center gap-2 {size ? 'text-blue-foreground' : ''}">
                    <Star size={20} />
                    {sizes.find((s) => s.value === size)?.label ?? 'Any Size'}
                </p>
            </Select.Trigger>
            <Select.Content>
                <Select.Group>
                    {#each sizes as s}
                    <Select.Item value={s.value} label={s.label} />
                    {/each}
                </Select.Group>
            </Select.Content>
        </Select.Root>

        <Select.Root type="single" name="date" bind:value={date}>
            <Select.Trigger class={`w-auto h-11 shadow-sm min-w-[22ch] text-nowrap text-left ${date ? 'bg-blue-flat border-none text-primary' : ''}`}>
                <p class="flex flex-row items-center gap-2 {date ? 'text-blue-foreground' : ''}">
                    <CalendarIcon size={20} />
                    {dates.find((d) => d.value === date)?.label ?? 'Any Date'}
                </p>
            </Select.Trigger>
            <Select.Content>
                <Select.Group>
                    {#each dates as d}
                    <Select.Item value={d.value} label={d.label} />
                    {/each}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    </div>
{/if}