<script lang="ts">
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
