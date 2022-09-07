<script lang="ts">
	import { goto } from "$app/navigation";
	import { v4 as uuid } from 'uuid';
	import { FormType, defaultForms, draftForm, contentIcons } from 'src/utils/forms';
	import cloneDeep from 'lodash/cloneDeep';

	const provideForm = (formType: FormType) => {
		// insert a new draft under uuid with default form content
		const formId = uuid();

		// "deep clone" default form object to avoid modifications
		draftForm.createForm(formId, cloneDeep(defaultForms[formType]));

		// navigate to draft edit page
		goto(`/forms/${formId}`);
	}

	const links: {
		type: FormType,
		color: string,
		desc: string,
	}[] = [
	{ type: "person", color: "primary", desc: "Add a new person to the network." },
	{ type: "school", color: "success", desc: "Add a school or university to the network." },
	{ type: "institution", color: "warning", desc: "Add a non-school institution (e.g. an organization, conference, journal, etc) to the network." },
	];

	import type { PageData } from "./$types";
	export let data: PageData;
	$: ({ user } = data);
</script>
<div class="card mb-5">
	<div class="card-body">
		<h2 class="card-title">Add a new entry</h2>
		{#if user}
		<p class="card-subtitle text-muted mb-3">Please select the type of entry you would like to create:</p>

		<div id="form-links" class="row gx-3 gy-3">
			{#each links as link (link.type)}
			<div class="col col-12 col-lg-12">
				<button class={`btn btn-${link.color} w-100 h-100 p-2`} on:click={() => provideForm(link.type)}>
					<i class="material-icons" aria-hidden="true">{contentIcons[link.type]}</i>
					<h5>{link.type}</h5>
					<p>{link.desc}</p>
				</button>
			</div>
			{/each}
		</div>
		{:else}
		<p>
			Please <a href="#signin">sign in</a> in order to contribute to the site.
		</p>
		{/if}
	</div>
</div>

<div class="card mb-5">
	<div class="card-body">
		<h2 class="card-title">Want to edit an existing entry instead?</h2>
		<p class="card-text">Find an entry <a href="/explore/">from the Explore page</a> and select the page to edit.</p>

		<a href="/explore/" class="btn btn-primary d-inline-flex align-items-center">
			<i class="material-icons me-2" aria-hidden="true">explore</i>
			Explore
		</a>
	</div>
</div>

<style lang="scss">
	#form-links .btn {
		.material-icons {
			font-size: 2.5rem;
		}

		h5 {
			text-transform: capitalize;
			margin: 0;
		}
	}
</style>
