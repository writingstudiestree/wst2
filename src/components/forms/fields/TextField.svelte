<script lang="ts">
	import FieldContainer from './FieldContainer.svelte';

	type InputType = "textarea" | "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";

	export let field: [number, string];
	export let type: InputType = "text";
	export let name: string = "";
	export let placeholder: string = "";
	export let required: boolean = false;
	export let transform = (s: string) => s;
	export let value: string;
	$: value = transform(rawValue);

	let rawValue = value || "";

	function setType(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<FieldContainer {field} let:isValid>
	{#if name}
	<label class="form-label" for={field[1]}>
		{name}{#if required}<span class="text-danger">*</span>{/if}
	</label>
	{/if}

	{#if type === "textarea"}
	<textarea
		id={field[1]}
		class={"form-control " + (!isValid ? "is-invalid" : "")}
		bind:value={rawValue}
		{placeholder}
		rows="3"
		aria-describedby={"tip" in $$slots ? (field[1] + "-tip") : null}
	/>
	{:else}
	<input
		use:setType
		id={field[1]}
		class={"form-control " + (!isValid ? "is-invalid" : "")}
		bind:value={rawValue}
		{placeholder}
		aria-describedby={"tip" in $$slots ? (field[1] + "-tip") : null}
	>
	{/if}

	{#if "tip" in $$slots}
	<small id={field[1] + "-tip"} class="form-text text-muted">
		<slot name="tip" />
	</small>
	{/if}

	<slot />
</FieldContainer>
