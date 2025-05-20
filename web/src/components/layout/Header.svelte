<script lang="ts">
  import * as Select from '$components/ui/select'

  import LocationPin from '@lucide/svelte/icons/map-pinned'
  import PieChart from '@lucide/svelte/icons/chart-pie'
  import People from '@lucide/svelte/icons/users-round'
  import Star from '@lucide/svelte/icons/star'
  import CalendarIcon from '@lucide/svelte/icons/calendar'

  const locations = [
    { value: 'ny', label: 'New York' },
    { value: 'la', label: 'Los Angeles' },
    { value: 'chi', label: 'Chicago' },
    { value: 'hou', label: 'Houston' },
    { value: 'phx', label: 'Phoenix' }
  ]

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

<div class="border-b w-full h-[5.5rem] px-6 gap-4 flex items-center">
  <Select.Root type="single" name="location" bind:value={location}>
    <Select.Trigger class={`w-[13rem] text-left ${location ? 'bg-primaryFlat border-none text-primary' : ''}`}>
      <p class="flex flex-row items-center gap-2">
        <LocationPin size={18} />
        {locations.find((l) => l.value === location)?.label ?? 'Select a location'}
      </p>
    </Select.Trigger>
    <Select.Content>
      <Select.Group>
        {#each locations as loc}
          <Select.Item value={loc.value} label={loc.label} />
        {/each}
      </Select.Group>
    </Select.Content>
  </Select.Root>

  <Select.Root type="single" name="industry" bind:value={industry}>
    <Select.Trigger class={`w-[15rem] text-left ${industry ? 'bg-primaryFlat border-none text-primary' : ''}`}>
      <p class="flex flex-row items-center gap-2">
        <PieChart size={18} />
        {industries.find((i) => i.value === industry)?.label ?? 'Business Industries'}
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
    <Select.Trigger class={`w-[15rem] text-left ${role ? 'bg-primaryFlat border-none text-primary' : ''}`}>
      <p class="flex flex-row items-center gap-2">
        <People size={18} />
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
    <Select.Trigger class={`w-[13rem] text-left ${size ? 'bg-primaryFlat border-none text-primary' : ''}`}>
      <p class="flex flex-row items-center gap-2">
        <Star size={18} />
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
    <Select.Trigger class={`w-[13rem] text-left ${date ? 'bg-primaryFlat border-none text-primary' : ''}`}>
      <p class="flex flex-row items-center gap-2">
        <CalendarIcon size={18} />
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
