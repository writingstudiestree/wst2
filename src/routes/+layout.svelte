<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from '$app/navigation';
	import "../app.scss";

	import Modal from "../components/Modal.svelte";

	import type { LayoutData } from "./$types";
	export let data: LayoutData;
	$: ({ user } = data);

	const links = [{
		type: 'link',
		name: 'Home',
		url: '/',
	},{
		type: 'link',
		name: 'About Us',
		url: '/about',
	},{
		type: 'link',
		name: 'Contribute',
		url: '/forms',
	},{
		type: 'link',
		name: 'Explore',
		url: '/explore/',
	}];
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
	<div class="container">
		<a class="navbar-brand" href="/">Writing Studies Tree</a>

		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				{#each links as link (link.url)}
				<li class="nav-item">
					<a class={`nav-link ${$page.url.pathname === link.url ? 'active' : ''}`} href={link.url}>{link.name}</a>
				</li>
				{/each}
			</ul>

			{#if user}
			<div class="d-flex align-items-center btn btn-dark" on:click={() => location.href = '/api/auth/logout'}>
				<i class="material-icons me-3">person</i>
				<div class="text-start">
					<p class="m-0">{user.displayName}</p>
					<small>{user.email}</small>
				</div>
			</div>
			{:else}
			<a href="#signin" class="btn btn-primary" role="button">Sign In</a>
			{/if}
		</div>
	</div>
</nav>

<Modal
	title="Sign In"
	show={!user && $page.url.hash === "#signin"}
	on:close={
		() => goto('#')
	}
>
	<form id="signIn" method="post" action="/api/auth/login">
		<div class="mb-3">
			<label for="signInEmail" class="form-label">Email address</label>
			<input type="email" class="form-control" id="signInEmail" name="email" placeholder="name@example.com">
		</div>

		<div class="mb-3">
			<label for="signInPassword" class="form-label">Password</label>
			<input type="password" class="form-control" id="signInPassword" name="password">
		</div>

		<input hidden type="text" name="redirect" value={$page.url.toString()} />
	</form>

	<div slot="footer">
		<input type="submit" form="signIn" class="btn btn-primary" value="Sign In"/>
	</div>
</Modal>

<main class="container py-5">
	<slot />
</main>
