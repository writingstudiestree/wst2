<script lang="ts">
	import FieldContainer from './FieldContainer.svelte';

	type InputType = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";

	export let field: string;
	export let type: InputType = "text";
	export let name: string;
	export let placeholder: string = "";
	export let required: boolean = false;
	export let value: string;

	function setType(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<FieldContainer {field} let:isValid>
	<label class="form-label" for={field}>
		{name}{#if required}<span class="text-danger">*</span>{/if}
	</label>

	<input
		use:setType
		id={field}
		class={"form-control " + (!isValid ? "is-invalid" : "")}
		bind:value={value}
		{placeholder}
		aria-describedby={"tip" in $$slots ? (field + "-tip") : null}
	>

	{#if "tip" in $$slots}
	<small id={field + "-tip"} class="form-text text-muted">
		<slot name="tip" />
	</small>
	{/if}

	<slot />
</FieldContainer>
