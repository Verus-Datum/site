<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
	import { registrationSchema, type RegistrationSchema } from "./schema";
    import * as Form from "$components/ui/form";
    import LoaderCircle from "@lucide/svelte/icons/loader-circle";
	import { Input } from "$components/ui/input";
    import Logo from "$assets/logo.png"
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { auth } from '$utils/firebase';
    import { toast } from 'svelte-sonner';
    import { API_URL } from "$utils/api";
	import { onMount } from "svelte";
	import { currentUser } from "$states/CurrentUser.svelte";
    import type { User } from "$types/User";
	import { goto } from "$app/navigation";

    type PageData = {
        data: {
            form: SuperValidated<Infer<RegistrationSchema>>
        }
    }

    let { data }: PageData = $props();
    let registering = $state(false);

    const form = superForm(data.form, {
        validators: zodClient(registrationSchema),
    });
    const { form: formData, enhance } = form;

    $effect(() => {
        currentUser.requiresNotAuthed();
    })

    async function handleSubmit(event) {
        event.preventDefault();
        const result = await form.validateForm();
        if (!result.valid) return;
        registering = true;

        const email = $formData.email;
        const password = $formData.password;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const res = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: "William",
                    last_name: "Neel",
                    email: email,
                    firebase_uid: userCredential.user.uid,
                }),
            })

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

<main class="md:pt-40 pt-8 pb-8 w-full md:w-[100%] lg:w-[80%] 2xl:w-[60%] px-8 mx-auto flex-col gap-10 flex items-center justify-start">
    <header class="flex flex-col gap-2 items-center justify-center text-center">
        <img src={Logo} alt="Verus Datum" class="w-14 h-14 rounded-lg" />
        <h1 class="text-2xl font-semibold mt-2">
            Create an account
        </h1>
        <h2 class="text-muted-foreground">
            Create your Verus Datum account
        </h2>
    </header>
    <form onsubmit={handleSubmit} method="POST" use:enhance class="md:w-[25rem] w-full flex flex-col gap-4">
        <Form.Field {form} name="email" class="w-full">
            <Form.Control>
                <Form.Label>Email</Form.Label>
                <Input disabled={registering} placeholder="Email address" type="email" bind:value={$formData.email} />
            </Form.Control>
        </Form.Field>
        <Form.Field {form} name="password" class="w-full">
            <Form.Control>
                <Form.Label>Create a password</Form.Label>
                <Input disabled={registering} placeholder="Password" type="password" bind:value={$formData.password} />
            </Form.Control>
        </Form.Field>
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
