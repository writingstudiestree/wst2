<script type="ts">
	import AutoComplete from "simple-svelte-autocomplete";
	import TextField from "../forms/fields/TextField.svelte";

	import type { Relations } from "src/api/types";
	import CitationAddButton from "./CitationAddButton.svelte";
	export let value: Relations & {
		content: any,
	};

	//Get "link_from" node for name and type
	import { draftForm } from '../../utils/forms/stores';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { isRecordType, InsertFormType } from 'src/api/forms/base';
	import RemoveRelationButton from "./RemoveRelationButton.svelte";
	$: form = $draftForm[$page.params.uuid]?.form;
	let fromType: string = "[Error]";
	let fromName: string = "[Error]";
	$: for (let i = 0; i < (get(form)).length; i++)
	{
		if(get(form)[i].value.id == value.link_from)
		{
			let found = get(form)[i];
			if (isRecordType(found, InsertFormType.CONTENT))
			{
				fromType = found.value.type;
				fromName = found.value.name;
			}
		}
	}

	//Placeholders
	let exampleNodeList = [
		{ id: 1, name: "Jeff", type: "person" },
		{ id: 2, name: "Nick", type: "person" },
		{ id: 3, name: "Pitt", type: "school" },
		{ id: 4, name: "Penn State", type: "school" },
		{ id: 5, name: "Temple", type: "school" },
		{ id: 6, name: "Joshua", type: "person" },
		{ id: 6, name: "Boy Scouts of America", type: "institution" },
		{ id: 6, name: "Book Club", type: "institution" }
	]
	let filteredNodes: Object[] = [];
	$: filteredNodes = exampleNodeList.filter(node => node.type === selectedType.val);

	//Finding a target
	let selectedType = {val: "", display: ""};
	let possibleTypes: Object[] = [
		{val: "person", display: "Person"},
		{val: "school", display: "School or University"},
		{val: "institution", display: "Non-School Institution"}
	]
	$: if (fromType === "school")
	possibleTypes = [
		{val: "person", display: "Person"},
	]
	$: if (fromType === "institution")
	possibleTypes = [
		{val: "person", display: "Person"},
	]

	let target = {id: 0, name: "", type: ""};
	const clearTargetField = () => {
		target = {id: 0, name: "", type: ""};
	}

	//available relationships
	let relType = "";
	let subType = "";
	let requiresDept = false;
	let possRelationships: String[] = [""];
	$: if (fromType === "person" && target.type === "person")
	{
		possRelationships = ["Mentored", "Worked Alongside", "Was Mentored By"];
		requiresDept = false;
	}
	else if (fromType === "person" && target.type === "school")
	{
		possRelationships = ["Studied At", "Worked At"];
		requiresDept = true;
	}
	else if (fromType === "person" && target.type === "institution")
	{
		possRelationships = ["Served On", "Worked At"];
		requiresDept = false;
	}
	else if (fromType === "school" && target.type === "person")
	{
		possRelationships = ["Counts Among its Students", "Has Employed"];
		requiresDept = true;
	}
	else if (fromType === "institution" && target.type === "person")
	{
		possRelationships = ["Has Employed"]
		requiresDept = false;
	}

	if (!requiresDept)
	{
		value.content.department = "";
	}

	let isSwapped = false;
	const swapDestination = () =>
	{
		const tempVar = value.link_from;
		value.link_from = value.link_to;
		value.link_to = tempVar;
	};

	let possSubtypes: String[] = [""];
	$: if (relType === "mentored"  || relType === "was mentored by")
	{
		possSubtypes = ["as dissertation chair", "as a non-chair member of the dissertation committee", "as a writing program administrator", "as a WAC/WID administrator", "as a Writing Project site administrator", "as a professor (graduate)", "as a professor (undergraduate)", "as a teacher (secondary school)", "as a consultant", "as a formal advisor of a type not indicated above"];
		if (relType === "was mentored by")
		{
			if (!isSwapped)
			{
				swapDestination();
				isSwapped = true;
				value.link_from = target.id;
			}
		}
		else
		{
			if (isSwapped)
			{
				swapDestination();
				isSwapped = false;
			}
			value.link_to = target.id;
		}
		value.type = "mentored";
	}
	else if (relType === "studied at"  || relType === "counts among its students")
	{
		possSubtypes = ["toward a doctorate", "toward a master's degree", "toward an undergraduate degree", "toward a secondary (high school) diploma", "in a non-degree or other program"];
		if (relType === "counts among its students")
		{
			if (!isSwapped)
			{
				swapDestination();
				isSwapped = true;
				value.link_from = target.id;
			}
		}
		else
		{
			if (isSwapped)
			{
				swapDestination();
				isSwapped = false;
			}
			value.link_to = target.id;
		}
		value.type = "studied at"
	}
	else if (relType === "worked at"  || relType === "has employed")
	{
		possSubtypes = ["as a graduate student instructor", "as a professor (adjunct)", "as a professor (undergraduate)", "as a professor (graduate)", "as an administrator", "as other staff"];
		if (relType === "has employed")
		{
			if (!isSwapped)
			{
				swapDestination();
				isSwapped = true;
				value.link_from = target.id;
			}
		}
		else
		{
			if (isSwapped)
			{
				swapDestination();
				isSwapped = false;
			}
			value.link_to = target.id;
		}
		value.type = "worked at";
	}
	else if (relType === "worked alongside")
	{
		possSubtypes = ["as co-editors of a journal", "as co-editors of an anthology or collection", "as co-authors of an article", "as co-authors of a book", "as co-administrators of a writing program", "as co-administrators of a writing center", "as co-administrators of a WAC/WID program", "on the development of a digital project", "as formal collaborators of a type not indicated above"];
		value.type = "worked alongside";
		if (isSwapped)
		{
			swapDestination();
			isSwapped = false;
		}
		value.link_to = target.id;
	}
	else if (relType === "served on")
	{
		possSubtypes = ["as an editor", "as a founder", "as a committee chair", "as a committee member", "in a capacity not indicated above"];
		value.type = "served on";
		if (isSwapped)
		{
			swapDestination();
			isSwapped = false;
		}
		value.link_to = target.id;
	}
	//Date range
	let ongoing: boolean = false;
	let endYear: number;

	//Object fields
	//id is predefined
	$: value.subtype = subType;
	//link_from is predefined
	$: if (ongoing)
	{
		value.year_end = undefined;
		endYear = NaN;
	}
	else
	{
		value.year_end = endYear;
	}
	value.content.citationList = [];

</script>

<div class = "card card-body mb-3 minHeight">
	<div class="d-flex w-100 justify-content-end">
		<div class = "p-2 start-margin"><h3>New relationship</h3></div>
		<div class = "p-2 mr-auto"><RemoveRelationButton bind:id = {value.id}/></div>
	</div>

	<div class="d-inline-flex p-2 flex-wrap align-items-center">
		<div class = "rightSpace">Create a relationship between {fromName} and a</div>
		<div class = "rightSpace">
			<AutoComplete
				hideArrow={true}
				items="{possibleTypes}"
				labelFieldName="display"
				valueFieldName="val"
				bind:selectedItem="{selectedType}"
				inputClassName  = {"form-control form-control-sm form-select"}
				onChange = {clearTargetField()}
			/>
		</div>
		<div class = "rightSpace">named</div>
		<div>
			<AutoComplete
				hideArrow={true}
				labelFieldName="name"
				items="{filteredNodes}"
				bind:selectedItem="{target}"
				itemFilterFunction={"type" === selectedType.val}
				inputClassName  = {"form-control form-control-sm"}
			/>
		</div>
	</div>

	<div class = "cushion"/>

	{#if target.name != ""}
	<div class="d-inline-flex flex-wrap p-2 align-items-center">
		<div class = "rightSpace">{fromName}</div>
		<div class = "rightSpace smallMinWidth">
			<select class="form-control form-select" bind:value={relType}>
				{#each possRelationships as relationship}
				<option value = {relationship.toLowerCase()}>
					{relationship}
				</option>
				{/each}
			</select>
		</div>
		<div class = "rightSpace">{target.name}</div>
		<div class = "rightSpace largeMinWidth">
			<select class="form-control form-select" bind:value={subType}>
				{#each possSubtypes as subtype}
				<option value = {subtype.toLowerCase()}>
					{subtype}
				</option>
				{/each}
			</select>
		</div>
	</div>

	{#if requiresDept}
	<div class="d-inline-flex flex-wrap p-2 align-items-center">
		<TextField
			field={[value.id, "content.department"]}
			name="Department"
			bind:value={value.content.department}>
			<span slot="tip">
				Which school or university department was most involved in the relationship listed above?
			</span>
		</TextField>
	</div>
	{/if}

	<div class="d-inline-flex flex-wrap p-2 align-items-center">
		<div class = "rightSpace">From years</div>
		<div class = "rightSpace"><input type="number" class = "form-control numberWidth" bind:value={value.year_start}></div>
		<div class = "rightSpace">-</div>
		<div class = "rightSpace"><input type="number" class = "form-control numberWidth" bind:value={endYear} disabled={ongoing}></div>
		<div class = "rightSpace">
			<input class="form-check-input" type="checkbox" id="ongoingCheckbox" bind:checked={ongoing}>
			<label class="form-check-label" for="ongoingCheckbox">This relationship is ongoing/in progress</label>
		</div>
	</div>
	<hr/>
	<label for="additionalDescription">Additional description</label>
	<textarea class="form-control" bind:value = {value.content.description} id="additionalDescription" rows="3"></textarea>
	<hr/>
	<CitationAddButton bind:citationList = {value.content.citationList}/>
	{/if}
</div>

<style>
	.minHeight
	{
		min-height: 220px;
	}
	.smallMinWidth
	{
		min-width: 200px;
	}
	.largeMinWidth
	{
		min-width: 400px;
	}
	.rightSpace
	{
		margin-right: 5px;
	}
	.numberWidth
	{
		width: 90px;
	}
	.start-margin
	{
		margin-right: auto;
	}
</style>