import { goto } from '$app/navigation';
import type { AuthUser } from '$types/AuthUser';
import type { User } from '$types/User';
import { API_URL } from '$utils/api';
import { auth } from '$utils/firebase';
import { signOut, type User as FirebaseUser } from 'firebase/auth';

class CurrentUser implements AuthUser {
	firebase = $state<FirebaseUser | null>(null);
	user = $state<User | null>(null);
	loggedIn = $derived<boolean>(this.firebase !== null && this.user !== null);

	signOut(): void {
		signOut(auth);
	}

	requiresAuthed(): void {
		if (this.user === null && this.firebase === null) {
			goto('/');
		}
	}

	requiresNotAuthed(): void {
		if (this.user !== null && this.firebase !== null) {
			goto('/');
		}
	}

	async getUserInfo(): Promise<boolean> {
		if (this.firebase !== null && this.user === null) {
			try {
				const res = await fetch(`${API_URL}/users/${this.firebase.uid}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				});

				const user = (await res.json()) as User;
				this.user = user;
			} catch (error) {
				console.error(error);
				return false;
			}
		}

		return true;
	}
}

export const currentUser = new CurrentUser();
