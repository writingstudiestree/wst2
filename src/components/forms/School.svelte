<script lang="ts">
	import type { Content } from 'src/api';
	import Tags from './fields/Tags.svelte';
	import MultiEntry from './fields/MultiEntry.svelte';
	import TextField from './fields/TextField.svelte';
	import Location from './fields/Location.svelte';

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

<div class="card card-body mb-3">
	<h2>2. Location</h2>
	<p>Where is your school located?</p>
	<Location
		field={[value.id, "content.location"]}
		bind:location={value.content.location}
	/>
</div>

<div class = "card card-body mb-3">
	<h2>3. Areas of Interest or Identity</h2>
	<p>What keywords would you use to describe this school?</p>
	<div class="form-group">
		<Tags
			field={[value.id, "content.tags"]}
			bind:enteredTags={value.content.tags}
		/>
	</div>
</div>

<div class = "card card-body mb-3">
	<h2>4. Additional Description</h2>
	<p>Is there any more information you would like to add?</p>
	<TextField
		field={[value.id, "content.description"]}
		type="textarea"
		bind:value={value.content.description}
	>
		<small class="text-muted">Keep in mind: You'll be forming relationships with other entries in the next step!</small>
	</TextField>
</div>
