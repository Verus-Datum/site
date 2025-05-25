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
        "https://www.petitpalais.paris.fr/sites/default/files/content/images/274a7179_0.jpg",
        "https://builtin.com/sites/www.builtin.com/files/styles/ckeditor_optimize/public/inline-images/Favor%203.jpeg",
        "https://k2space.imgix.net/app/uploads/2023/06/K2-Criteo-Office-Curator-LARGE-102-scaled.jpg?auto=format&fit=max&w=5000&q=90",
        "https://www.reuters.com/resizer/v2/EHRQCRVB6VNBJKECN6MCRQKD2A.jpg?auth=6872991dbba05561ae50f36a849f49629ff49bc39a99e8dea92137c1ca8bc5ff&height=628&width=1200&quality=80&smart=true",
        "https://images.ctfassets.net/kftzwdyauwt9/28i2D9RyoKNOyuTukSGkw/a4c5a97d081a7c2b1d5aa100fd85d28e/o1-preview-general.png?w=3840&q=90&fm=webp"
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