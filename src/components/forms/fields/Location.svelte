<script lang="ts">
import FieldContainer from "./FieldContainer.svelte";

	export let location: string = "";
	export let field: [number, string];

	// location fields
	let cityName = "";
	let stateAbbrev = "";
	let countryName = "";
	let inUSA = true;
	const stateAbbrevList = ['', 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

	// Update value of location depending on fields selected by user
	$: if (inUSA) {
		location = ""+cityName+", "+stateAbbrev+", United States";
	} else {
		location = ""+cityName+", "+countryName;
	}
</script>

<FieldContainer {field} let:isValid>
	<span id={field[1]} /> <!-- For obtaining the position to scroll to on an error -->

	<div class="form-check">
		<input class="form-check-input" type="checkbox" bind:checked={inUSA} id={field[1] + "-isInUSA"}>
		<label class="form-check-label" for={field[1] + "-isInUSA"}>
			My institution is in the United States
		</label>
	</div>

	<div class="row">
		<div class="col col-6">
			<label for={field[1] + "-inputCity"}>City<span class="text-danger">*</span></label>
			<input
				type="text"
				bind:value={cityName}
				class={"form-control " + (!isValid ? "is-invalid" : "")}
				id={field[1] + "-inputCity"}
			>
		</div>

		{#if inUSA}
		<div class="col col-3">
			<label for={field[1] + "-inputState"}>State<span class="text-danger">*</span></label>
			<select
				id={field[1] + "-inputState"}
				class={"form-control form-select " + (!isValid ? "is-invalid" : "")}
				bind:value={stateAbbrev}
			>
				{#each stateAbbrevList as state}
				<option value={state}>{state}</option>
				{/each}
			</select>
		</div>
		{/if}

		<div class="col col-3">
			<label for={field[1] + "-inputCountry"}>Country</label>
			{#if inUSA}
			<input
				type="text"
				class={"form-control " + (!isValid ? "is-invalid" : "")}
				id={field[1] + "-inputCountry"}
				value="United States"
				readonly disabled
			>
			{:else}
			<input
				type="text"
				class={"form-control " + (!isValid ? "is-invalid" : "")}
				id={field[1] + "-inputCountry"}
				bind:value={countryName}
			>
			{/if}
		</div>
	</div>
</FieldContainer>
