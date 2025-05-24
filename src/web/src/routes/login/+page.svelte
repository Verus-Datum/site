<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
	import { registrationSchema, type RegistrationSchema } from "./schema";
    import * as Form from "$components/ui/form";
	import { Input } from "$components/ui/input";
    import LoaderCircle from "@lucide/svelte/icons/loader-circle";
    import Logo from "$assets/logo.png"
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { auth } from '$utils/firebase';
    import { toast } from 'svelte-sonner';
	import { goto } from "$app/navigation";
	import { currentUser } from "$states/CurrentUser.svelte";
    
    type PageData = {
        data: {
            form: SuperValidated<Infer<RegistrationSchema>>
        }
    }

    $effect(() => {
        currentUser.requiresNotAuthed();
    })

    let { data }: PageData = $props();
    let loggingIn = $state(false);

    const form = superForm(data.form, {
        validators: zodClient(registrationSchema),
    });
    const { form: formData, enhance } = form;

    async function handleSubmit(event) {
        event.preventDefault();
        const result = await form.validateForm();
        if (!result.valid) return;
        loggingIn = true;

        const email = $formData.email;
        const password = $formData.password;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Successfully logged in!", {
                description: "Welcome back!"
            })
            goto("/")
            loggingIn = false;
        } catch (error) {
            console.error('Firebase auth error:', error);
            toast.error(error.message)
            loggingIn = false;
        }
    }
</script>

<main class="md:pt-40 pt-8 pb-8 w-full md:w-[100%] lg:w-[80%] 2xl:w-[60%] px-8 mx-auto flex-col gap-10 flex items-center justify-start">
    <header class="flex flex-col gap-2 items-center justify-center text-center">
        <img src={Logo} alt="Verus Datum" class="w-14 h-14 rounded-lg" />
        <h1 class="text-2xl font-semibold mt-2">
            Welcome back
        </h1>
        <h2 class="text-muted-foreground">
            Sign in to your Verus Datum account
        </h2>
    </header>
    <form onsubmit={handleSubmit} method="POST" use:enhance class="md:w-[25rem] w-full flex flex-col gap-4">
        <Form.Field {form} name="email" class="w-full">
            <Form.Control>
                <Form.Label>Email</Form.Label>
                <Input disabled={loggingIn} placeholder="Email address" type="email" bind:value={$formData.email} />
            </Form.Control>
        </Form.Field>
        <Form.Field {form} name="password" class="w-full">
            <Form.Control>
                <Form.Label>Enter your password</Form.Label>
                <Input disabled={loggingIn} placeholder="Password" type="password" bind:value={$formData.password} />
            </Form.Control>
        </Form.Field>
        <Form.Button disabled={loggingIn} class="rounded-full">Continue
            {#if loggingIn}
                <LoaderCircle class="animate-spin" />
            {/if}
        </Form.Button>
        <a class="text-center text-primary text-sm" href="/register">
            Not signed up yet? Register here
        </a>
    </form>
</main>