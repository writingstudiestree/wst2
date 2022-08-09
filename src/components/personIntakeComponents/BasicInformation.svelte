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
			<input type="text" id="orcid" class="form-control" aria-describedby="orcid-tip" bind:value = {ORCiD}>
			<small id="orcid-tip" class="form-text text-muted">
				An ORCiD is a persistent identifier you control, which can help distinguish you from others with the same name – or match you to your work when your name changes. Learn more or create one at <a href="https://orcid.org/">orcid.org</a>.
			</small>
		</div>
	</div>
</div>
