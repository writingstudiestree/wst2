<script lang="ts">
	import FieldContainer from '../forms/fields/FieldContainer.svelte';

	export let name: string = "";
	export let ORCiD: string = "";
</script>

<div class="inside">
	<h2>1. Basic Information</h2>
	<p>Enter some basic information about the person being added</p>
	<div>
		<div class="form-group">
			<p><span class="text-danger">*</span>Required fields</p>
			<FieldContainer field="name" let:isValid>
				<label class="form-label" for="fullname">Full name<span class="text-danger">*</span></label>
				<input
					type="text"
					id="fullname"
					class={"form-control " + (!isValid ? "is-invalid" : "")}
					aria-describedby="enterFullname"
					bind:value={name}
					placeholder="Your preferred name (first and last, if applicable)"
				>
			</FieldContainer>

			<br/>

			<label for="orcid">ORCiD</label>
			<input type="text" id="orcid" class="form-control" aria-describedby="enterOrcid" bind:value = {ORCiD}>
			<small id="orcid-tip" class="form-text text-muted">
				Don't have one? Create one <a href="https://orcid.org/">here</a>
			</small>
		</div>
	</div>
</div>
