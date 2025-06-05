import { currentUser } from '$states/CurrentUser.svelte';
import { API_URL } from '$utils/api';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '$utils/firebase';
import type { User } from '$types/User';

export const userService = {
	async registerUser(email: string, password: string, first_name: string, last_name: string) {
		const role = 'broker';
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const res = await fetch(`${API_URL}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				first_name: first_name,
				last_name: last_name,
				email: email,
				firebase_uid: userCredential.user.uid,
				role: role,
				profile_image_path: ''
			})
		});

		const user = (await res.json()) as User;
		currentUser.firebase = userCredential.user;
		currentUser.user = user;
	}
};
