<script lang="ts">
    import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import { Button } from "$components/ui/button";
    import { generateFakeBroker, type Broker } from "$types/Broker";
	import { onMount } from "svelte";
    import MapPin from "@lucide/svelte/icons/map-pin";
    import Provider from "@lucide/svelte/icons/life-buoy";
	import FloatingPanel from "$components/ui/floating-panel/floating-panel.svelte";
	import { FloatingPanelState } from "$states/FloatingPanel.svelte";

    let brokers = $state<Broker[]>([]);

    onMount(() => {
        for (let index = 0; index < 8; index++) {
            brokers?.push(generateFakeBroker(-86.75, -86.45, 34.65, 34.85))
        }

        FloatingPanelState.addSnippet("brokers", AllBrokers)
    })
</script>

{#snippet AllBrokers()}
    <header>
        <h1 class="font-semibold py-1 text-2xl">
            Brokers
        </h1>
        <h2 class="flex flex-row text-muted-foreground font-medium gap-2 items-center">
            <span class="text-muted-foreground/60">in</span> Huntsville, AL
        </h2>
    </header>

    <div class="flex flex-col overflow-y-auto max-h-full w-full hide-scrollbar">
        <!-- This is such a mess, but it's just a demo -->
        {#if brokers.length > 0}
            {#each brokers as _broker}
                <div class="py-6 border-b flex flex-col gap-2 w-full">
                    <h1 class="text-lg font-semibold relative">{_broker.name}         
                        <Button onclick={() => {}} size="icon" class="p-1 h-auto w-auto text-muted-foreground hover:bg-opacity-50 absolute top-0 right-0" variant="secondary">
                        <ChevronRight size={18} />
                    </Button>
                    </h1>
                    <h2 class="text-muted-foreground flex flex-row items-center gap-2"><MapPin size={18} /> {_broker.address}</h2>
                    <h2 class="text-muted-foreground flex flex-row items-center gap-2"><Provider size={18} /> {_broker.market}</h2>
                </div>
            {/each}
        {/if}
    </div>
{/snippet}