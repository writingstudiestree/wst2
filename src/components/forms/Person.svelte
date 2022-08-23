<script lang="ts">
	import type { Content } from 'src/api';

	import TextField from './fields/TextField.svelte';
	import MultiEntry from './fields/MultiEntry.svelte';
	import Tags from './fields/Tags.svelte';

	export let value: Content & {
    content: any,
	};
</script>

<h1 class="textCenter">New Person</h1>

<div class="inside">
	<h2>1. Basic Information</h2>
	<p>Enter some basic information about the person being added</p>
	<div class="form-group">
		<p><span class="text-danger">*</span>Required fields</p>

		<MultiEntry
			field={[value.id, "name"]}
			label = "Full name"
			firstPlaceholder = "Your preferred name (first and last if applicable)"
			nextPlaceholder = "Additional name"
			addMessage = "+ I use another name"
			bind:entriesAsString={value.name}
		/>
		<br/>
		<TextField
			field={[value.id, "content.orcId"]}
			name="ORCiD"
			bind:value={value.content.orcId}
		>
			<span slot="tip">
				An ORCiD is a persistent identifier you control, which can help distinguish you from others with the same name – or match you to your work when your name changes. Learn more or create one at <a href="https://orcid.org/">orcid.org</a>.
			</span>
		</TextField>

		<TextField
			field={[value.id, "content.pronounceLink"]}
			name="Pronunciation Link"
			type="url"
			bind:value={value.content.pronounceLink}
		>
			<span slot="tip">
				Is there a recording of this person's name at <a href="https://kairos.technorhetoric.net/scholarnames/">Kairos ScholarNames</a> or elsewhere? Please share a link here.
			</span>
		</TextField>
	</div>
</div>
<div class="inside">
	<h2>2. Websites</h2>
	<p>Where can we find this person online?</p>
	<div class="form-group">
		<MultiEntry
			field={[value.id, "content.websites"]}
			label = "Websites"
			firstPlaceholder = "Enter your LinkedIn, Blog, Social Media, Academic Website, etc. One at a time, please!"
			nextPlaceholder = "Additional site"
			addMessage = "+ Add another site"
			required = {false}
			bind:entriesAsList = {value.content.websites}
		/>
	</div>
</div>
<div class="inside">
	<h2>3. Interests</h2>
	<p>What areas of interest or focus does this person have?</p>
	<div class="form-group">
		<Tags
			bind:enteredTags = {value.content.tags}
		/>
	</div>
</div>
<div class="inside">
	<h2>4. Identity</h2>
	<p>How does this person identify?</p>
	<p>TO FILL HERE: importance of this section, explanation of data, etc.</p>
	<div class="form-group">
		<Tags
			bind:enteredTags = {value.content.identity}
		/>
	</div>
</div>
<div class="inside">
	<h2>5. Additional Description</h2>
	<div class="form-group">
		<div class="form-group">
			<textarea class="form-control" bind:value = {value.content.description} id="additionalDescription" rows="3"></textarea>
			<span class = "smallText">Keep in mind: You'll be forming relationships with other entries in the next step!</span>
		</div>
	</div>
</div>
