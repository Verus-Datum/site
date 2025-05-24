import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { registrationSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '$utils/firebase';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(registrationSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registrationSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		return {
			form
		};
	}
};
