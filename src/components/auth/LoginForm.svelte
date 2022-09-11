<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from '$app/stores';
	import { app } from "src/utils/firebase";
	import * as firebase from "firebase/auth";
	import { onMount } from "svelte";
	import 'firebaseui/dist/firebaseui.css';

	onMount(async () => {
		// if not in browser, don't initialize firebaseui yet
		if (!browser) return;

		const firebaseui = await import('firebaseui');
		const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.getAuth(app));
		ui.start("#firebaseui-auth-container", {
			signInSuccessUrl: $page.url.toString(),
			signInOptions: [
				firebase.EmailAuthProvider.PROVIDER_ID,
			],
			callbacks: {
				signInSuccessWithAuthResult() {
					return false;
				},
			},
		});
	});
</script>

<div id="firebaseui-auth-container" />

<style lang="scss">
	// @import "https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css";

	:global(.mdl-shadow--2dp) {
		box-shadow: none;
	}
</style>
