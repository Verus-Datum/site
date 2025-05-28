<script lang="ts">
    import { Button } from "$components/ui/button";
    import MapPin from "@lucide/svelte/icons/map-pin";
    import Provider from "@lucide/svelte/icons/life-buoy";
    import Plus from "@lucide/svelte/icons/plus";
    import Phone from "@lucide/svelte/icons/phone";
    import Eye from "@lucide/svelte/icons/eye";
    import EllipisVertical from "@lucide/svelte/icons/ellipsis-vertical";
    import ArrowRight from "@lucide/svelte/icons/arrow-right";
    import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right"
    import { currentUser } from "$states/CurrentUser.svelte";
    import { onMount } from "svelte";
    import type { Business } from "$types/Business";
	import { formatCurrency } from "$utils/currency";
    
    type Props = {
        listing: Business;
    };

    let { listing }: Props = $props();

    let images = [
        "https://www.upmenu.com/wp-content/uploads/2022/08/Small-Cafe-Interior-Design.jpg",
        "https://weadesign.com/wp-content/uploads/2024/01/office-interior-designs.webp",
        "https://www.avantisystemsusa.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-08-at-3.08.52-PM.png",
        "https://images.squarespace-cdn.com/content/v1/5d6d67f2387da800015dc00e/e242ea2f-e67f-4991-85bc-6c07b48bcc73/Jude_WetCoffee_-6.jpg",
        "https://www.blankcreatives.com.au/wp-content/uploads/2022/12/Wonderwood-cafe_09_WEB.jpg"
    ]
</script>

<a href="/listings/example" class="rounded-lg hover:bg-secondary duration-200 border w-full flex flex-col">
    <img src={images[Math.floor(Math.random() * images.length)]} alt="Image" class="w-full border-b h-48 rounded-t-lg shrink-0 object-cover" />
    <section class="p-3">
        <h1 class="text-xl font-semibold flex items-center gap-2">
            {listing.name}
        </h1>

        <data class="flex flex-col gap-1 py-1">
            <span class="font-semibold text-primary text-lg flex items-center gap-1">
                {formatCurrency(listing.asking_price)}
            </span>
            <span class="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <Phone size={14} /> {listing.contact_method} <Provider class="ml-2" size={14} /> {listing.market}
            </span>
            <span class="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <MapPin size={14} /> {listing.address}
            </span>
        </data>
    </section>
</a>
