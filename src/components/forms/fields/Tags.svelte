<script lang="ts">
	import Tags from "svelte-tags-input";
	import FieldContainer from "./FieldContainer.svelte";

	export let field: [number, string];
	export let enteredTags: string[] = [];

	export let autoComplete: string[] = [];
	export let placeholder: string = "Not sure what to put here? Start typing and see which tags other users have used before!";

	function addInterest(event: any) {
		enteredTags = event.detail.tags;
	}
</script>

<FieldContainer {field}>
	<Tags
		on:tags={addInterest}
		addKeys={[13]}
		maxTags={false}
		allowPaste={true}
		allowDrop={true}
		splitWith={", "}
		onlyUnique={true}
		removeKeys={[8]}
		placeholder={placeholder}
		autoComplete={autoComplete}
		name={field[1]}
		id={field[1]}
		allowBlur={true}
		disable={false}
		minChars={0}
		onlyAutocomplete={false}
		labelShow={false}
	/>
	<small class="text-muted">Press enter to add an entry. Add multiple!</small>
</FieldContainer>
