// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, getIdToken, onAuthStateChanged, signOut } from 'firebase/auth';
import { currentUser } from '$states/CurrentUser.svelte';

const firebaseConfig = {
	apiKey: 'AIzaSyB72BPUim5gZsFx922_N7qJ_zy135w1Nlo',
	authDomain: 'verus-datum-site.firebaseapp.com',
	projectId: 'verus-datum-site',
	storageBucket: 'verus-datum-site.firebasestorage.app',
	messagingSenderId: '631799312558',
	appId: '1:631799312558:web:eb20ba765076a7215cbd3f',
	measurementId: 'G-ESZL2PN7GD'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

onAuthStateChanged(auth, async (firebaseUser) => {
	if (currentUser) {
		currentUser.firebase = firebaseUser ?? null;
	}

	if (firebaseUser) {
		const token = await getIdToken(firebaseUser);
		const userInfo = await currentUser.getUserInfo();

		if (!userInfo) {
			signOut(auth);
			currentUser.firebase = null;
			currentUser.loggedIn = false;
			currentUser.user = null;
		}
	}
});
