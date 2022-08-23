<script lang="ts">
	import type { Content } from 'src/api';
	import SchoolDescription from '../schoolntakeComponents/SchoolDescription.svelte';
	import SchoolLocation from '../schoolntakeComponents/SchoolLocation.svelte';
	import SchoolTags from '../schoolntakeComponents/SchoolTags.svelte';
	import InstitutionBasicInformation from '../institutionIntakeComponents/InstitutionBasicInformation.svelte';
import MultiEntry from './fields/MultiEntry.svelte';

	export let value: Content & {
		content: any,
	}; 
</script>
<h1 class="textCenter">New Non-school Institution</h1>
<div class = "inside">Is this institution a school or university? If so, click <a href = "/forms">here</a> to get redirected to our form menu.</div>
<div class = "inside">
	<h2>1. Basic Information</h2>
    <p>Let's start with some basic information about the institution</p>
    <p><span class="red">*</span>Required fields</p>
	<MultiEntry
			field={[value.id, "name"]}
			label = "Instiution Name"
			firstPlaceholder = "Your institution's most common name"
			nextPlaceholder = "Acronym, abbreviation, or alternative name"
			addMessage = "+ Add an abbreviation or acronym"
			bind:entriesAsString={value.name}
		/>
		<br/>
		<MultiEntry
			field={[value.id, "content.websites"]}
			label = "Websites"
			firstPlaceholder = "Enter your institution's website, social media, etc. One at a time, please!"
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

<style>
	.red
	{
		color: red;
	}
</style>