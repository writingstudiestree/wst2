import { readable } from 'svelte/store';
import { browser } from '$app/environment';
import { User, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { PUBLIC_FIREBASE_KEY, PUBLIC_FIREBASE_APPID, PUBLIC_FIREBASE_PROJECTID } from '$env/static/public';

export const app = initializeApp({
	apiKey: PUBLIC_FIREBASE_KEY,
	authDomain: `${PUBLIC_FIREBASE_PROJECTID}.firebaseapp.com`,
	projectId: PUBLIC_FIREBASE_PROJECTID,
	storageBucket: `${PUBLIC_FIREBASE_PROJECTID}.appspot.com`,
	appId: PUBLIC_FIREBASE_APPID,
});

export const auth = getAuth(app);

export const user = readable<User|null>(null, (set) => {
	if (browser) {
		auth.onAuthStateChanged((user) => {
			set(user);
		});
	}
});
