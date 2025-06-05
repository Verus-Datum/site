<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { registrationSchema, type RegistrationSchema } from './schema';
	import * as Form from '$components/ui/form';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import { Input } from '$components/ui/input';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import TransparentLogo from '$assets/transparent.png';
	import { auth } from '$utils/firebase';
	import { toast } from 'svelte-sonner';
	import { API_URL } from '$utils/api';
	import { currentUser } from '$states/CurrentUser.svelte';
	import type { User } from '$types/User';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { userService } from '$services/userService';

	type PageData = {
		data: {
			form: SuperValidated<Infer<RegistrationSchema>>;
		};
	};

	let { data }: PageData = $props();
	let registering = $state(false);

	const form = superForm(data.form, {
		validators: zodClient(registrationSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;

	let errors = $state();

	$effect(() => {
		currentUser.requiresNotAuthed();
		form.errors.subscribe((errs) => {
			errors = errs;
		});
	});

	async function handleSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();
		const result = await form.validateForm();
		if (!result.valid) return;
		registering = true;

		const email = $formData.email;
		const password = $formData.password;
		const first_name = $formData.firstName;
		const last_name = $formData.lastName;

		try {
			form.errors.set({});
			errors = {};

			await userService.registerUser(email, password, first_name, last_name);

			toast.success('Account successfully created!', {
				description: 'You can now browse and contact business owners'
			});
			registering = false;
			goto('/');
		} catch (error) {
			console.error('Firebase auth error:', error);
			toast.error(error.message);
			registering = false;
		}
	}
</script>

<main
	in:fly={{ y: 20, duration: 650 }}
	class="mx-auto mb-8 flex h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-32 md:w-[100%] md:px-8 md:pt-40 lg:w-[80%] 2xl:w-[60%]"
>
	<header class="flex flex-col items-center justify-center gap-2 text-center">
		<img
			src={TransparentLogo}
			alt="Verus Datum"
			class="h-14 w-14 rounded-full bg-primary p-1"
		/>
		<h1 class="mt-2 text-2xl font-semibold">Create an account</h1>
		<h2 class="text-muted-foreground">Start using Verus Datum today</h2>
	</header>
	<form
		onsubmit={handleSubmit}
		method="POST"
		use:enhance
		class="flex w-full flex-col gap-6 md:w-[25rem]"
	>
		<div class="flex flex-row gap-6">
			<Form.Field {form} name="firstName" class="w-full">
				<Form.Control>
					<Form.Label>First Name</Form.Label>
					<Input
						disabled={registering}
						placeholder="John"
						type="text"
						bind:value={$formData.firstName}
					/>
					{#if errors}
						<Form.FieldErrors />
					{/if}
				</Form.Control>
			</Form.Field>
			<Form.Field {form} name="lastName" class="w-full">
				<Form.Control>
					<Form.Label>Last Name</Form.Label>
					<Input
						disabled={registering}
						placeholder="Smith"
						type="text"
						bind:value={$formData.lastName}
					/>
					{#if errors}
						<Form.FieldErrors />
					{/if}
				</Form.Control>
			</Form.Field>
		</div>
		<Form.Field {form} name="email" class="w-full">
			<Form.Control>
				<Form.Label>Choose an email address</Form.Label>
				<Input
					disabled={registering}
					placeholder="Email address"
					type="email"
					bind:value={$formData.email}
				/>
				{#if errors}
					<Form.FieldErrors />
				{/if}
			</Form.Control>
		</Form.Field>
		<Form.Field {form} name="password" class="w-full">
			<Form.Control>
				<Form.Label>Create a password</Form.Label>
				<Input
					disabled={registering}
					placeholder="Password"
					type="password"
					bind:value={$formData.password}
				/>
				{#if errors}
					<Form.FieldErrors />
				{/if}
			</Form.Control>
		</Form.Field>
		<p class="text-xs text-muted-foreground">
			By creating a Verus Datum account, I agree to Verus Datum's <a
				href="/terms"
				class="underline underline-offset-1">Terms of Service</a
			>
			and <a href="/privacy-policy" class="underline underline-offset-1">Privacy Policy</a>.
		</p>
		<Form.Button disabled={registering} class="rounded-full"
			>Continue
			{#if registering}
				<LoaderCircle class="animate-spin" />
			{/if}
		</Form.Button>
		<a class="text-center text-sm text-primary" href="/login">
			Already have an account? Log in here
		</a>
	</form>
</main>
