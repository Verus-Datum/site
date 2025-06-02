<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { registrationSchema, type RegistrationSchema } from './schema';
	import * as Form from '$components/ui/form';
	import { Input } from '$components/ui/input';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import TransparentLogo from '$assets/transparent.png';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$utils/firebase';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { currentUser } from '$states/CurrentUser.svelte';
	import { fly } from 'svelte/transition';

	type PageData = {
		data: {
			form: SuperValidated<Infer<RegistrationSchema>>;
		};
	};

	$effect(() => {
		currentUser.requiresNotAuthed();
	});

	let { data }: PageData = $props();
	let loggingIn = $state(false);

	const form = superForm(data.form, {
		validators: zodClient(registrationSchema)
	});
	const { form: formData, enhance } = form;

	let errors = $state();

	$effect(() => {
		form.errors.subscribe((errs) => {
			errors = errs;
		});
	});

	async function handleSubmit(event) {
		event.preventDefault();
		const result = await form.validateForm();
		if (!result.valid) return;
		loggingIn = true;

		const email = $formData.email;
		const password = $formData.password;

		try {
			await signInWithEmailAndPassword(auth, email, password);
			toast.success('Successfully logged in!', {
				description: 'Welcome back!'
			});

			form.errors.set({});
			errors = {};

			goto('/');
			loggingIn = false;
		} catch (error) {
			console.error('Firebase auth error:', error);
			toast.error(error.message);
			loggingIn = false;
		}
	}
</script>

<main
	in:fly={{ y: 20, duration: 650 }}
	class="mx-auto flex h-screen w-full flex-col items-center justify-start gap-10 px-6 md:px-8 pt-32 mb-8 md:pt-40 md:w-[100%] lg:w-[80%] 2xl:w-[60%]"
>
	<header class="flex flex-col items-center justify-center gap-2 text-center">
		<img
			src={TransparentLogo}
			alt="Verus Datum"
			class="h-14 w-14 rounded-full bg-primary p-1"
		/>
		<h1 class="mt-2 text-2xl font-semibold">Welcome back</h1>
		<h2 class="text-muted-foreground">Sign in with your Verus Datum account</h2>
	</header>
	<form
		onsubmit={handleSubmit}
		method="POST"
		use:enhance
		class="flex w-full flex-col gap-6 md:w-[25rem]"
	>
		<Form.Field {form} name="email" class="w-full">
			<Form.Control>
				<Form.Label>Email</Form.Label>
				<Input
					disabled={loggingIn}
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
				<div class="flex flex-col gap-2">
					<Form.Label>Enter your password</Form.Label>
					<Input
						disabled={loggingIn}
						placeholder="Password"
						type="password"
						bind:value={$formData.password}
					/>
					{#if errors}
						<Form.FieldErrors />
					{/if}
					<a href="/forgot-password" class="text-sm text-primary"> Forgot my password </a>
				</div>
			</Form.Control>
		</Form.Field>
		<Form.Button disabled={loggingIn} class="rounded-full"
			>Continue
			{#if loggingIn}
				<LoaderCircle class="animate-spin" />
			{/if}
		</Form.Button>
		<a class="text-center text-sm text-primary" href="/register">
			Don't have an account? Create a free one here
		</a>
	</form>
</main>
