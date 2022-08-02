<script>
	import { page } from "$app/stores";
	import "../app.scss";

	import Modal from "../components/Modal.svelte";

	const links = [{
		type: 'link',
		name: 'Home',
		url: '/',
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

			<a href="#signin" class="btn btn-primary" role="button">Sign In</a>
		</div>
	</div>
</nav>

<Modal title="Sign In" show={$page.url.hash === "#signin"}>
	<form id="signIn">
		<div class="mb-3">
			<label for="signInEmail" class="form-label">Email address</label>
			<input type="email" class="form-control" id="signInEmail" placeholder="name@example.com">
		</div>

		<div class="mb-3">
			<label for="signInPassword" class="form-label">Password</label>
			<input type="password" class="form-control" id="signInPassword">
		</div>
	</form>

	<div slot="footer">
		<a href="./#" type="submit" class="btn btn-secondary">Cancel</a>
		<input type="submit" form="signIn" class="btn btn-primary" value="Sign In"/>
	</div>
</Modal>

<main class="container py-5">
	<slot />
</main>
