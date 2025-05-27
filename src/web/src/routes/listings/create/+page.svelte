<script lang="ts">
    import { fly } from "svelte/transition";
    import { Input } from "$components/ui/input";
    import { Checkbox } from "$components/ui/checkbox";
    import { Button } from "$components/ui/button";
    import * as Form from "$components/ui/form";
    import { superForm, type FormPath, type Infer, type SuperValidated } from "sveltekit-superforms";
    import { formSchema, type FormSchema } from "./schema";
    import { zodClient } from "sveltekit-superforms/adapters";
	import { currentUser } from "$states/CurrentUser.svelte";
	import { API_URL } from "$utils/api";
    import type { CreateListing, CreateListingResponse } from "src/schemas/Listing";
	import { goto } from "$app/navigation";
	import { toast } from "svelte-sonner";

    let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } =
        $props();

    const form = superForm(data.form, {
        validators: zodClient(formSchema),
    });

    type FieldName = FormPath<Infer<FormSchema>>;
    let addressHasError = $state(false);
    let creatingListing = $state(false);
    $effect(() => {
        form.errors.subscribe((errors) => {
            addressHasError =
                !!errors.addressLine1?.length ||
                !!errors.city?.length ||
                !!errors.state?.length ||
                !!errors.zip?.length;
        })
    })

    const { form: formData, enhance } = form;

    async function handleSubmit() {
        creatingListing = true;
        
        try {
            const res = await fetch(`${API_URL}/listings`, {
                method: 'POST',
                body: JSON.stringify({
                    name: $formData.businessName,
                    address: `${$formData.addressLine1}${$formData.addressLine2 ? ', ' + $formData.addressLine2 : ''}, ${$formData.city}, ${$formData.state} ${$formData.zip}`,
                    market: $formData.industryMarket,
                    contact_method: $formData.isPublic ? 'public' : 'private',
                    longitude: 0, // replace with actual value
                    latitude: 0, // replace with actual value
                    asking_price: $formData.askingPrice,
                    revenue_per_yr: $formData.annualRevenue,
                    gross_per_yr: $formData.annualGross,
                    profit_per_yr: $formData.annualProfit,
                    user_id: currentUser.user?.id,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json() as CreateListingResponse;
            toast.success("Successfully created listing!")
            goto(`/listings/${data.id}`)
        } catch (error) {
            creatingListing = false;
            toast.error(`Error creating listing: ${error.message}`)
        }
    }
</script>

<main in:fly={{ y: 20, duration: 650 }} class="md:pt-20 pt-8 pb-8 w-full md:w-[100%] lg:w-[80%] 2xl:w-[30%] px-8 mx-auto flex-col gap-10 flex items-start justify-start">
    <header class="pt-20 w-full flex flex-col gap-3">
        <h1 class="text-3xl md:text-left text-center w-full font-semibold">
            Sell Your Business
        </h1>
        <h2 class="text-muted-foreground font-medium text-center md:text-left">
            Create a listing to attract buyers and get your business in front of the right people.
        </h2>
    </header>

    <form method="POST" use:enhance onsubmit={handleSubmit} class="w-full flex flex-col gap-6">
        <Form.Field {form} name="businessName" class="w-full flex flex-col">
            <Form.Control>
                {#snippet children({ props })}
                    <Form.Label class="font-medium text-sm">
                        Business Name
                    </Form.Label>
                    <Input disabled={creatingListing} {...props} bind:value={$formData.businessName} type="text" placeholder="ACME Inc." class="font-medium appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                {/snippet}
            </Form.Control>
            <Form.Description class="text-sm text-muted-foreground">
                This will be public to anyone.
            </Form.Description>
        </Form.Field>

        <Form.Field {form} name="industryMarket" class="w-full flex flex-col">
            <Form.Control>
                {#snippet children({ props })}
                    <Form.Label class="font-medium text-sm">
                        Industry / Market
                    </Form.Label>
                    <Input disabled={creatingListing} {...props} bind:value={$formData.industryMarket} type="text" placeholder="Restaurant" class="font-medium appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                {/snippet}
            </Form.Control>
        </Form.Field>

        <Form.Field {form} name="isPublic" class="w-full flex flex-col">
            <Form.Control>
                {#snippet children({ props })}
                    <div class="flex flex-row gap-2 items-center">
                        <Checkbox {...props} bind:checked={$formData.isPublic} class="font-medium appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                        <label for={props.id} class="text-sm">
                            Display listing publicly
                        </label>
                    </div>
                {/snippet}
            </Form.Control>
        </Form.Field>

        <div class="flex flex-col gap-2">
            <label class="font-medium text-sm {addressHasError ? "text-destructive" : ""}">
                Business Address
            </label>
            <div class="">
                <Form.Field {form} name="addressLine1" class="w-full flex flex-col">
                    <Form.Control>
                        {#snippet children({ props })}
                            <Input disabled={creatingListing} {...props} bind:value={$formData.addressLine1} type="text" placeholder="Address Line 1" class="font-medium rounded-none rounded-t-lg" {...props} />
                        {/snippet}
                    </Form.Control>
                </Form.Field>

                <Form.Field {form} name="addressLine2" class="w-full flex flex-col">
                    <Form.Control>
                        {#snippet children({ props })}
                            <Input disabled={creatingListing} {...props} bind:value={$formData.addressLine2} type="text" placeholder="Address Line 2 (optional)" class="font-medium rounded-none border-transparent border-x-border border-b-border" {...props} />
                        {/snippet}
                    </Form.Control>
                </Form.Field>

                <div class="flex flex-row">
                    <Form.Field {form} name="city" class="w-full flex flex-col">
                        <Form.Control>
                            {#snippet children({ props })}
                                <Input disabled={creatingListing} {...props} bind:value={$formData.city} type="text" placeholder="City" class="font-medium rounded-none border-transparent border-l-border border-b-border rounded-bl-lg border-r-border" {...props} />
                            {/snippet}
                        </Form.Control>
                    </Form.Field>

                    <Form.Field {form} name="state" class="w-full flex flex-col">
                        <Form.Control>
                            {#snippet children({ props })}
                                <Input disabled={creatingListing} {...props} bind:value={$formData.state} type="text" placeholder="State" class="font-medium rounded-none border-transparent border-b-border border-r-border" {...props} />
                            {/snippet}
                        </Form.Control>
                    </Form.Field>

                    <Form.Field {form} name="zip" class="w-full flex flex-col">
                        <Form.Control>
                            {#snippet children({ props })}
                                <Input disabled={creatingListing} {...props} bind:value={$formData.zip} type="string" placeholder="ZIP" class="font-medium rounded-none border-transparent border-r-border border-b-border rounded-br-lg" {...props} />
                            {/snippet}
                        </Form.Control>
                    </Form.Field>
                </div>
            </div>
        </div>

        <div class="h-[1px] bg-border my-6 relative flex items-center justify-start">
            <p class="top-0 bg-background pr-6 mb-0.5 font-medium">
                Financials
            </p>
        </div>

        <div class="grid grid-cols-2 grid-rows-2 gap-6">
            <Form.Field {form} name="askingPrice" class="w-full flex flex-col">
                <Form.Control>
                    {#snippet children({ props })} 
                        <Form.Label class="font-medium text-sm">Asking Price ($)</Form.Label>
                        <Input disabled={creatingListing} {...props} type="number" placeholder="$450,000" class="font-medium appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" bind:value={$formData.askingPrice} {...props} />
                    {/snippet}
                </Form.Control>
            </Form.Field>

            <Form.Field {form} name="annualRevenue" class="w-full flex flex-col">
                <Form.Control>
                    {#snippet children({ props })} 
                        <Form.Label class="font-medium text-sm">Annual Revenue ($)</Form.Label>
                        <Input disabled={creatingListing} {...props} type="number" placeholder="$850,000" class="font-medium appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" bind:value={$formData.annualRevenue} {...props} />
                    {/snippet}
                </Form.Control>
            </Form.Field>

            <Form.Field {form} name="annualGross" class="w-full flex flex-col">
                <Form.Control>
                    {#snippet children({ props })} 
                        <Form.Label class="font-medium text-sm">Annual Gross ($)</Form.Label>
                        <Input disabled={creatingListing} {...props} type="number" placeholder="$550,000" class="font-medium appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" bind:value={$formData.annualGross} {...props} />
                    {/snippet}
                </Form.Control>
            </Form.Field>

            <Form.Field {form} name="annualProfit" class="w-full flex flex-col">
                <Form.Control>
                    {#snippet children({ props })} 
                        <Form.Label class="font-medium text-sm">Annual Profit ($)</Form.Label>
                        <Input disabled={creatingListing} {...props} type="number" placeholder="$125,000" class="font-medium appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" bind:value={$formData.annualProfit} {...props} />
                    {/snippet}
                </Form.Control>
            </Form.Field>
        </div>

        <div class="ml-auto">
            <Form.Button disabled={creatingListing} class="w-auto">
                Submit for Review
            </Form.Button>
        </div>
    </form>
</main>
