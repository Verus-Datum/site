import type { AuthUser } from '$types/AuthUser';
import type { User } from '$types/User';
import { type User as FirebaseUser } from 'firebase/auth';

class CurrentUser implements AuthUser {
	firebase = $state<FirebaseUser | null>(null);
	user = $state<User | null>(null);
}

export const currentUser = new CurrentUser();
