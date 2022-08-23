<script lang="ts">

	//Modal logic
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let title: string = "Title";
	export let show: boolean = false;

	function handleClose() {
		dispatch("close");
		show = false;
	}

	//Citation logic
	let source: string = "";
    let description: string = "";
    let selectedSource: string = "";
	export let citationList: any[];

    $: if (selectedSource !== "Other")
    source = selectedSource;
	
	const submitCitation = () =>
	{
		citationList = [{source, description}, ...citationList];
		handleClose();
	}

	let filled: boolean = false;
	$: filled = source !== "" && description !== "";

    const sourceTypes: string[] = ["", "Personal experience / memory", "Curriculum vitae or resume", "Alumni list", "Dissertation, thesis, or similar scholastic record", "Published document, including articles or acknowledgments", "Archival records or papers", "Interview", "Crowdsourced from the first Writing Studies Tree database", "Other"];
</script>

{#if show}
<div class="modal show" tabindex="-1" aria-modal="true" role="dialog" on:click={(e) => e.target === e.currentTarget && handleClose()}>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">{title}</h5>
				<button class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={handleClose}>
					<span class="d-none">Close</span>
				</button>
			</div>
			<div class="modal-body">
				<p><span class="red">*</span>Required fields</p> 
				<label for="source-select">What is the source of the citation?<span class="red">*</span></label>
				<select class="form-control custom-select form-select" id="source-select" bind:value={selectedSource}>
					{#each sourceTypes as sourceType}
					<option value = {sourceType}>
						{sourceType}
					</option>
					{/each}
				</select>
				{#if selectedSource === "Other"}
				<br/>
				<label for="other">Other<span class="red">*</span></label>
				<input type="text" class="form-control" id="other">
				{/if}
				<br/>
				<div class = "inception">In the following textbox, please try to include at least a name, source location, and date in your citation. However, we welcome more information and recommend citation softwares such as <a href="https://zbib.org/">zbib.org</a> to assist in your citation.</div>
				<label for="additionalDescription">Please provide a link, description, or full citation here: <span class="red">*</span></label>
				<textarea class="form-control" bind:value = {description} id="additionalDescription" rows="3"></textarea>
				<span class = "smallText">If your source is from a website, consider inserting <a href = "https://web.archive.org/save/">a web archive snapshot</a></span>
				<div class = "topPadding">
				<button class = "btn btn-success btn-sm" disabled = {!filled} on:click={() => submitCitation()}>Submit</button>
				<button class = "btn btn-danger btn-sm" on:click={() => handleClose()}>Cancel</button>
				</div>
			</div>
		</div>
	</div>
</div>
{/if}

<style lang="scss">
.modal.show {
	display: block;
	background-color: rgba(0, 0, 0, 0.5);
}
.red
{
	color:red;
}
.topPadding
{
	padding-top: 10px;	
}
</style>
