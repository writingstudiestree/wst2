<script lang="ts">
	import { goto } from "$app/navigation";
	import { v4 as uuid } from 'uuid';
	import { FormType, defaultForms, draftForms } from 'src/utils/forms';
	import { get } from 'svelte/store';

	const provideForm = (formType: FormType) => {
		// insert a new draft under uuid with default form content
		const formId = uuid();
		const forms = get(draftForms);

		draftForms.set({
			...forms,

			// "deep clone" default form object to avoid modifications
			[formId]: JSON.parse(JSON.stringify(defaultForms[formType]))
		});

		// navigate to draft edit page
		goto(`/forms/${formId}`);
	}

	const links: {
		type: FormType,
		color: string,
		icon: string,
		desc: string,
	}[] = [
	{ type: "person", color: "primary", icon: "person", desc: "Add a new person to the network." },
	{ type: "school", color: "success", icon: "school", desc: "Add a school or university to the network." },
	{ type: "institution", color: "warning", icon: "domain", desc: "Add a non-school institution (e.g. an organization, conference, journal, etc) to the network." },
	{ type: "citation", color: "secondary", icon: "book", desc: "Introduce a reference or archive that new information is sourced from." },
	];
</script>
<div class="card mb-5">
	<div class="card-body">
		<h2 class="card-title">Add a new entry</h2>
		<p class="card-subtitle text-muted mb-3">Please select the type of entry you would like to create:</p>

		<div id="form-links" class="row gx-3 gy-3">
			{#each links as link (link.type)}
			<div class="col col-12 col-lg-6">
				<button class={`btn btn-${link.color} w-100 h-100 p-2`} on:click={() => provideForm(link.type)}>
					<i class="material-icons" aria-hidden="true">{link.icon}</i>
					<h5>{link.type}</h5>
					<p>{link.desc}</p>
				</button>
			</div>
			{/each}
		</div>
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
