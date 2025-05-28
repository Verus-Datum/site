<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
	import { registrationSchema, type RegistrationSchema } from "./schema";
    import * as Form from "$components/ui/form";
    import LoaderCircle from "@lucide/svelte/icons/loader-circle";
	import { Input } from "$components/ui/input";
    import Logo from "$assets/logo.png"
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import TransparentLogo from "$assets/transparent.png"
    import { auth } from '$utils/firebase';
    import { toast } from 'svelte-sonner';
    import { API_URL } from "$utils/api";
	import { onMount } from "svelte";
	import { currentUser } from "$states/CurrentUser.svelte";
    import type { User } from "$types/User";
	import { goto } from "$app/navigation";
	import { fly } from "svelte/transition";

    type PageData = {
        data: {
            form: SuperValidated<Infer<RegistrationSchema>>
        }
    }

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
    })

    async function handleSubmit(event) {
        event.preventDefault();
        const result = await form.validateForm();
        if (!result.valid) return;
        registering = true;

        const email = $formData.email;
        const password = $formData.password;
        const first_name = $formData.firstName;
        const last_name = $formData.lastName;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const res = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    email: email,
                    firebase_uid: userCredential.user.uid,
                }),
            })

            form.errors.set({});
            errors = {};

            const user = await res.json() as User;
            currentUser.firebase = userCredential.user;
            currentUser.user = user;

            toast.success("Account successfully created!", {
                description: "You can now browse and contact business owners"
            })
            registering = false;
            goto("/")
        } catch (error) {
            console.error('Firebase auth error:', error);
            toast.error(error.message)
            registering = false;
        }
    }
</script>


<main in:fly={{ y: 20, duration: 650 }} class="w-full md:w-[100%] h-screen lg:w-[80%] 2xl:w-[60%] px-8 mx-auto flex-col gap-10 flex items-center justify-start pt-40">
    <header class="flex flex-col gap-2 items-center justify-center text-center">
        <img src={TransparentLogo} alt="Verus Datum" class="w-14 h-14 bg-primary rounded-full p-1" />
        <h1 class="text-2xl font-semibold mt-2">
            Create an account
        </h1>
        <h2 class="text-muted-foreground">
            Start using Verus Datum today
        </h2>
    </header>
    <form onsubmit={handleSubmit} method="POST" use:enhance class="md:w-[25rem] w-full flex flex-col gap-6">
        <div class="flex flex-row gap-6">
            <Form.Field {form} name="firstName" class="w-full">
                <Form.Control>
                    <Form.Label>First Name</Form.Label>
                    <Input disabled={registering} placeholder="John" type="text" bind:value={$formData.firstName} />
                    {#if errors}
                        <Form.FieldErrors />
                    {/if}
                </Form.Control>
            </Form.Field>
            <Form.Field {form} name="lastName" class="w-full">
                <Form.Control>
                    <Form.Label>Last Name</Form.Label>
                    <Input disabled={registering} placeholder="Smith" type="text" bind:value={$formData.lastName} />
                    {#if errors}
                        <Form.FieldErrors />
                    {/if}
                </Form.Control>
            </Form.Field>
        </div>
        <Form.Field {form} name="email" class="w-full">
            <Form.Control>
                <Form.Label>Choose an email address</Form.Label>
                <Input disabled={registering} placeholder="Email address" type="email" bind:value={$formData.email} />
                {#if errors}
                    <Form.FieldErrors />
                {/if}
            </Form.Control>
        </Form.Field>
        <Form.Field {form} name="password" class="w-full">
            <Form.Control>
                <Form.Label>Create a password</Form.Label>
                <Input disabled={registering} placeholder="Password" type="password" bind:value={$formData.password} />
                {#if errors}
                    <Form.FieldErrors />
                {/if}
            </Form.Control>
        </Form.Field>
        <p class="text-xs text-muted-foreground">
            By creating a Verus Datum account, I agree to Verus Datum's <a href="/terms" class="underline underline-offset-1">Terms of Service</a> and <a href="/privacy-policy" class="underline underline-offset-1">Privacy Policy</a>.
        </p>
        <Form.Button disabled={registering} class="rounded-full">Continue
            {#if registering}
                <LoaderCircle class="animate-spin" />
            {/if}
        </Form.Button>
        <a class="text-center text-primary text-sm" href="/login">
            Already have an account? Log in here
        </a>
    </form>
</main>
