<script lang="ts">
	import type { Content } from 'src/api';
	import SchoolDescription from '../schoolntakeComponents/SchoolDescription.svelte';
	import SchoolLocation from '../schoolntakeComponents/SchoolLocation.svelte';
	import SchoolTags from '../schoolntakeComponents/SchoolTags.svelte';
	import MultiEntry from './fields/MultiEntry.svelte';
	
	/*export let value: Content & {
		content: {
			location: "",
			tags: [],
			websites: []
		}
	};*/
	export let value: Content & {
		content: any,
	};
</script>
<h1 class="textCenter">New School or University</h1>
<div class = "card card-body mb-3">
	<h2>1. Basic Information</h2>
	<p>Let's start with some basic information about the school or university</p>
	<p><span class="text-danger">*</span>Required fields</p>
	<MultiEntry
		field={[value.id, "name"]}
		label = "School Name"
		firstPlaceholder = "This school's most common name"
		nextPlaceholder = "Acronym, abbreviation, or alternative name"
		addMessage = "+ Add an abbreviation or acronym"
		bind:entriesAsString={value.name}
	/>
	<br/>
	<MultiEntry
		field={[value.id, "content.websites"]}
		label = "Websites"
		firstPlaceholder = "Enter this school's website, relevant department pages, etc. One at a time, please!"
		nextPlaceholder = "Additional site"
		addMessage = "+ Add another site"
		required = {false}
		bind:entriesAsList = {value.content.websites}
	/>
</div>

<SchoolLocation
	bind:location={value.content.location}
/>

<SchoolTags
	bind:enteredTags={value.content.tags}
/>

<SchoolDescription
	bind:description={value.content.description}
/>
