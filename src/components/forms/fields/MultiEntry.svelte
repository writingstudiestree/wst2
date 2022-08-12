<script lang="ts">

import { entriesIn } from "lodash";
import type { inferFormattedError } from "zod";
import FieldContainer from "./FieldContainer.svelte";
import TextField from "./TextField.svelte";

    export let entries: string[] = [""];
    let needsContent: boolean = true
    $: needsContent = entries[entries.length-1] === "";

    export let label: string = "Section Label";
    export let firstPlaceholder: string = "Enter the first entry here";
    export let nextPlaceholder: string = "Enter a subsequent entry here";
    export let addMessage: string = "+";
    export let required: boolean = true;

    const newField = () =>
    {
        entries = [...entries, ""];
    };
    const deleteField = (i: number) =>
    {
        entries = entries.slice(0, i).concat(entries.slice(i+1));
    };

</script>
<label class="form-label" for="first-entry">{label}{#if required}<span class = "red">*</span>{/if}
</label>
<div class="input-group">
    <input type="text" id="first-entry" class="form-control" placeholder={firstPlaceholder} bind:value={entries[0]}>
    <div class="input-group-append">
    </div>
</div>
{#each entries as entry, i} <!-- Additional entries -->
    {#if i >= 1}
        <div class="input-group">
            <input type="text" class="form-control" placeholder={nextPlaceholder} bind:value={entries[i]}>
            <div class="input-group-append">
            <button class="btn btn-outline-secondary" on:click={() => deleteField(i)} type="button">Delete this entry</button>
            </div>
        </div>
    {/if}
{/each}
<button class="btn bottom btn-outline-secondary" on:click={() => newField()} type="button" disabled={needsContent}>{addMessage}</button>
<style>
    .red
    {
        color:red;
    }
    .bottom
    {
        margin-bottom: 30px;
    }
</style>