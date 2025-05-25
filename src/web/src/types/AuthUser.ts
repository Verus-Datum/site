import { type User as FirebaseUser } from 'firebase/auth';
import type { User } from './User';

export type AuthUser = {
	firebase: FirebaseUser | null;
	user: User | null;
	loggedIn: boolean;

	signOut: () => void;
	requiresAuthed: () => void;
	requiresNotAuthed: () => void;
	updateUserInfo: () => Promise<boolean>;
};
