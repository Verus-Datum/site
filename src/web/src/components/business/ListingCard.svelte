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

<div class="rounded-xl border w-full p-6 flex flex-col md:flex-row gap-6 shadow-ui">
    <img src={images[Math.floor(Math.random() * images.length)]} alt="Image" class="w-full md:w-96 h-60 shrink-0 object-cover rounded-lg" />
    <header class="flex flex-col w-full relative">
        <h1 class="text-3xl pb-4 font-semibold w-full flex items-center justify-between">
            {listing.name}
            <button class="text-muted-foreground hover:text-muted-foreground/80">
                <EllipisVertical size={24} />
            </button>
        </h1>

        <section class="flex flex-col gap-4">
            <div class="flex items-center gap-3 text-muted-foreground font-medium">
                <MapPin size={24} />
                {listing.address}
            </div>

            <div class="flex items-center gap-3 text-muted-foreground font-medium">
                <Provider size={24} />
                {listing.market}
            </div>

            <div class="flex items-center gap-3 text-muted-foreground font-medium">
                <Eye size={24} />
                2,466 viewed
            </div>

            <div class="flex items-center gap-3 text-muted-foreground font-medium">
                <Phone size={24} />
                26 requested contact
            </div>
        </section>

        <div class="flex flex-col gap-2 mt-6 md:hidden">
            <Button class="text-base bg-blue-flat text-blue-foreground hover:bg-blue-muted/30 font-normal w-full">
                View
            </Button>
            <Button class="text-base font-normal w-full">
                Request Referral
            </Button>
        </div>

        <div class="hidden md:flex absolute bottom-0 right-0 justify-end gap-2 mt-4">
            <Button class="text-base text-primary hover:text-primary/80 bg-transparent hover:bg-transparent font-normal">
                View
            </Button>
            <Button class="text-base font-normal">
                Request Referral
            </Button>
        </div>
    </header>
</div>