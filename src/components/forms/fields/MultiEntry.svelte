<script lang="ts">
import { entriesIn } from "lodash";

import type { inferFormattedError } from "zod";

import TextField from "./TextField.svelte";

    type InputType = "names" | "websites";
    let entries: string[] = [""];
    let needsContent: boolean = true
    $: needsContent = entries[entries.length-1] === "";
    const newField = () =>
    {
        //entries = entries.slice(0, i+1).concat("").concat(entries.slice(i+1));
        //console.log(entries);
        entries = [...entries, ""];
    };
    const deleteField = (i: number) =>
    {
        entries = entries.slice(0, i).concat(entries.slice(i+1));
        console.log(entries);
    };

</script>
{#each entries as entry, i}
    {#if i === 0}
    <div class="input-group">
        <input type="text" class="form-control" placeholder="Prefered name (first and last if applicable)" bind:value={entries[i]}>
        <div class="input-group-append">
        </div>
    </div>
    {:else}
    <div class="input-group">
        <input type="text" class="form-control" placeholder="Additional name" bind:value={entries[i]}>
        <div class="input-group-append">
        <button class="btn btn-outline-secondary" on:click={() => deleteField(i)} type="button">Delete this entry</button>
        </div>
    </div>
    {/if}
{/each}
<button class="btn btn-outline-secondary" on:click={() => newField()} type="button" disabled={needsContent}>+ Add alternate name</button>