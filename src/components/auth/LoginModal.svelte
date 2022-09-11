<script lang="ts">
	import { page } from "$app/stores";
	import Modal from "../Modal.svelte";
	import LoginForm from "./LoginForm.svelte";

	export let show: boolean = false;
</script>

<Modal
	title="Sign In"
	bind:show={show}
	on:close
>
	<LoginForm />
</Modal>
