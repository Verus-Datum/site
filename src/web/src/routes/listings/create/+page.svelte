<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Input } from '$components/ui/input';
	import { Checkbox } from '$components/ui/checkbox';
	import * as Form from '$components/ui/form';
	import {
		superForm,
		type Infer,
		type SuperValidated
	} from 'sveltekit-superforms';
	import { formSchema, type FormSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { currentUser } from '$states/CurrentUser.svelte';
	import { API_URL } from '$utils/api';
	import type { CreateListingResponse } from 'src/schemas/Listing';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	let addressHasError = $state(false);
	let creatingListing = $state(false);

	$effect(() => {
		form.errors.subscribe((errors) => {
			addressHasError =
				!!errors.addressLine1?.length ||
				!!errors.city?.length ||
				!!errors.state?.length ||
				!!errors.zip?.length;
		});
	});

	const { form: formData, enhance } = form;

	async function handleSubmit() {
		creatingListing = true;

		try {
			const res = await fetch(`${API_URL}/listings`, {
				method: 'POST',
				body: JSON.stringify({
					name: $formData.businessName,
					address: $formData.isOnline
						? 'The Internet'
						: `${$formData.addressLine1}${$formData.addressLine2 ? ', ' + $formData.addressLine2 : ''}, ${$formData.city}, ${$formData.state} ${$formData.zip}`,
					market: $formData.industryMarket,
					city: $formData.city,
					state: $formData.state,
					zip_code: $formData.zip,
					contact_method: $formData.isPublic ? 'public' : 'private',
					longitude: 0, // replace with actual value
					latitude: 0, // replace with actual value
					asking_price: $formData.askingPrice,
					revenue_per_yr: $formData.annualRevenue,
					gross_per_yr: $formData.annualGross,
					profit_per_yr: $formData.annualProfit,
					user_id: currentUser.user?.id,
					online: $formData.isOnline
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const data = (await res.json()) as CreateListingResponse;
			toast.success('Successfully created listing!');
			goto(`/listings/${data.id}`);
		} catch (error) {
			creatingListing = false;
			toast.error(`Error creating listing: ${error.message}`);
		}
	}
</script>

<main
	in:fly={{ y: 20, duration: 650 }}
	class="mx-auto flex w-full flex-col items-start justify-start gap-10 px-8 pb-8 pt-8 md:w-[100%] md:pt-20 lg:w-[80%] 2xl:w-[55%] 3xl:w-[40%]"
>
	<header class="flex w-full flex-col gap-3 pt-20">
		<h1 class="w-full text-center text-3xl font-semibold md:text-left">Sell Your Business</h1>
		<h2 class="text-center font-medium text-muted-foreground md:text-left">
			Create a listing to attract buyers and get your business in front of the right people.
		</h2>
	</header>

	<form method="POST" use:enhance onsubmit={handleSubmit} class="flex w-full flex-col gap-6">
		<Form.Field {form} name="businessName" class="flex w-full flex-col">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">Business Name</Form.Label>
					<Input
						disabled={creatingListing}
						{...props}
						bind:value={$formData.businessName}
						type="text"
						placeholder="ACME Inc."
						class="appearance-none font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
					/>
				{/snippet}
			</Form.Control>
			<Form.Description class="text-sm text-muted-foreground">
				This will be public to anyone.
			</Form.Description>
		</Form.Field>

		<Form.Field {form} name="industryMarket" class="flex w-full flex-col">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">Industry / Market</Form.Label>
					<Input
						disabled={creatingListing}
						{...props}
						bind:value={$formData.industryMarket}
						type="text"
						placeholder="Restaurant"
						class="appearance-none font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
					/>
				{/snippet}
			</Form.Control>
		</Form.Field>

		<Form.Field {form} name="isPublic" class="flex w-full flex-col">
			<Form.Control>
				{#snippet children({ props })}
					<div class="flex flex-row items-center gap-2">
						<Checkbox
							{...props}
							bind:checked={$formData.isPublic}
							class="appearance-none border-border font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
						/>
						<label for={props.id} class="text-sm"> Display Publicly </label>
					</div>
				{/snippet}
			</Form.Control>
		</Form.Field>

		<Form.Field {form} name="isOnline" class="flex w-full flex-col">
			<Form.Control>
				{#snippet children({ props })}
					<div class="flex flex-row items-center gap-2">
						<Checkbox
							{...props}
							bind:checked={$formData.isOnline}
							class="appearance-none border-border font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
						/>
						<label for={props.id} class="text-sm"> Online Business </label>
					</div>
				{/snippet}
			</Form.Control>
		</Form.Field>

		{#if !$formData.isOnline}
			<div class="flex flex-col gap-2">
				<label for="unknown" class="text-sm font-medium {addressHasError ? 'text-destructive' : ''}">
					Business Address
				</label>
				<div class="">
					<Form.Field {form} name="addressLine1" class="flex w-full flex-col">
						<Form.Control>
							{#snippet children({ props })}
								<Input
									disabled={creatingListing}
									{...props}
									bind:value={$formData.addressLine1}
									type="text"
									placeholder="Address Line 1"
									class="rounded-none rounded-t-lg font-medium"
									{...props}
								/>
							{/snippet}
						</Form.Control>
					</Form.Field>

					<Form.Field {form} name="addressLine2" class="flex w-full flex-col">
						<Form.Control>
							{#snippet children({ props })}
								<Input
									disabled={creatingListing}
									{...props}
									bind:value={$formData.addressLine2}
									type="text"
									placeholder="Address Line 2 (optional)"
									class="rounded-none border-transparent border-x-border border-b-border font-medium"
									{...props}
								/>
							{/snippet}
						</Form.Control>
					</Form.Field>

					<div class="flex flex-row">
						<Form.Field {form} name="city" class="flex w-full flex-col">
							<Form.Control>
								{#snippet children({ props })}
									<Input
										disabled={creatingListing}
										{...props}
										bind:value={$formData.city}
										type="text"
										placeholder="City"
										class="rounded-none rounded-bl-lg border-transparent border-b-border border-l-border border-r-border font-medium"
										{...props}
									/>
								{/snippet}
							</Form.Control>
						</Form.Field>

						<Form.Field {form} name="state" class="flex w-full flex-col">
							<Form.Control>
								{#snippet children({ props })}
									<Input
										disabled={creatingListing}
										{...props}
										bind:value={$formData.state}
										type="text"
										placeholder="State"
										class="rounded-none border-transparent border-b-border border-r-border font-medium"
										{...props}
									/>
								{/snippet}
							</Form.Control>
						</Form.Field>

						<Form.Field {form} name="zip" class="flex w-full flex-col">
							<Form.Control>
								{#snippet children({ props })}
									<Input
										disabled={creatingListing}
										{...props}
										bind:value={$formData.zip}
										type="string"
										placeholder="ZIP"
										class="rounded-none rounded-br-lg border-transparent border-b-border border-r-border font-medium"
										{...props}
									/>
								{/snippet}
							</Form.Control>
						</Form.Field>
					</div>
				</div>
			</div>
		{/if}

		<div class="relative my-6 flex h-[1px] items-center justify-start bg-border">
			<p class="top-0 mb-0.5 bg-background pr-6 font-medium">Financials</p>
		</div>

		<div class="grid grid-cols-2 grid-rows-2 gap-6">
			<Form.Field {form} name="askingPrice" class="flex w-full flex-col">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class="text-sm font-medium">Asking Price ($)</Form.Label>
						<Input
							disabled={creatingListing}
							{...props}
							type="number"
							placeholder="$450,000"
							class="appearance-none font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
							bind:value={$formData.askingPrice}
							{...props}
						/>
					{/snippet}
				</Form.Control>
			</Form.Field>

			<Form.Field {form} name="annualRevenue" class="flex w-full flex-col">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class="text-sm font-medium">Annual Revenue ($)</Form.Label>
						<Input
							disabled={creatingListing}
							{...props}
							type="number"
							placeholder="$850,000"
							class="appearance-none font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
							bind:value={$formData.annualRevenue}
							{...props}
						/>
					{/snippet}
				</Form.Control>
			</Form.Field>

			<Form.Field {form} name="annualGross" class="flex w-full flex-col">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class="text-sm font-medium">Annual Gross ($)</Form.Label>
						<Input
							disabled={creatingListing}
							{...props}
							type="number"
							placeholder="$550,000"
							class="appearance-none font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
							bind:value={$formData.annualGross}
							{...props}
						/>
					{/snippet}
				</Form.Control>
			</Form.Field>

			<Form.Field {form} name="annualProfit" class="flex w-full flex-col">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class="text-sm font-medium">Annual Profit ($)</Form.Label>
						<Input
							disabled={creatingListing}
							{...props}
							type="number"
							placeholder="$125,000"
							class="appearance-none font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
							bind:value={$formData.annualProfit}
							{...props}
						/>
					{/snippet}
				</Form.Control>
			</Form.Field>
		</div>

		<div class="ml-auto">
			<Form.Button disabled={creatingListing} class="w-auto">Submit for Review</Form.Button>
		</div>
	</form>
</main>
