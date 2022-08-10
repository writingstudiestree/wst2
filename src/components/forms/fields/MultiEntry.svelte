<script lang="ts">
import TextField from "./TextField.svelte";

    export let field: [number, string];
    type InputType = "names" | "websites";
    let entries: string[] = [""];
    const newField = () =>
    {
        entries = [...entries, ""];
        console.log(entries);
    };

</script>
{#each entries as entry, i}
    <TextField
    field={field}
    name="Full name"
    placeholder="Your preferred name (first and last, if applicable)"
    required
    bind:value={entries[i]}
    />
{/each}
<button on:click = {newField}>I have another name</button>