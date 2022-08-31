<script lang="ts">
	import type { Content } from 'src/api';

	import TextField from './fields/TextField.svelte';
	import MultiEntry from './fields/MultiEntry.svelte';
	import Tags from './fields/Tags.svelte';

	export let value: Content & {
    content: any,
	};

	// Removes a URL prefix, such as "https://orcid.org/...", from a string
	function transformRemovePrefix(s: string) {
		return s.split('/').slice(-1)[0] || "";
	}

	function transformIntoURL(s: string) {
		if (s && !s.startsWith("http"))
			return `https://${s}`;
		return s;
	}
</script>

<h1 class="textCenter">New Person</h1>

<div class="card card-body mb-3">
	<h2>1. Basic Information</h2>
	<p>Enter some basic information about the person being added</p>
	<div class="form-group">
		<p><span class="text-danger">*</span>Required fields</p>

		<MultiEntry
			field={[value.id, "name"]}
			label="Full name"
			firstPlaceholder="Preferred name (first and last if applicable)"
			nextPlaceholder="Additional name"
			addMessage="+ Also known as"
			bind:entriesAsString={value.name}
		/>

		<TextField
			field={[value.id, "content.orcId"]}
			name="ORCiD"
			placeholder="0000-0001-2345-6789"
			transform={transformRemovePrefix}
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
			transform={transformIntoURL}
			bind:value={value.content.pronounceLink}
		>
			<span slot="tip">
				Is there a recording of this person's name at <a href="https://kairos.technorhetoric.net/scholarnames/">Kairos ScholarNames</a> or elsewhere? Please share a link here.
			</span>
		</TextField>
	</div>
</div>
<div class="card card-body mb-3">
	<h2>2. Websites</h2>
	<p>Where can we find this person online?</p>
	<div class="form-group">
		<MultiEntry
			field={[value.id, "content.websites"]}
			label="Websites"
			firstPlaceholder="Link to an online profile, academic website, blog, etc. One at a time, please!"
			nextPlaceholder="Additional site"
			addMessage="+ Add another site"
			required={false}
			bind:entriesAsList={value.content.websites}
		/>
	</div>
</div>
<div class="card card-body mb-3">
	<h2>3. Interests</h2>
	<p>What areas of interest or focus does this person have?</p>
	<div class="form-group">
		<Tags
			field={[value.id, "content.tags"]}
			bind:enteredTags={value.content.tags}
		/>
	</div>
</div>
<div class="card card-body mb-3">
	<h2>4. Identity</h2>
	<p>How does this person identify?</p>
	<p>We recognize that asking you to name identity categories is fraught: some databases have the potential for abuse or surveillance, for example, and many people occupy different identity categories that can change over time. Nevertheless, we also know that what goes uncounted can be discounted; that it is currently hard for graduate students to find institutions where their experience of race, ethnicity, gender, disability, or religion will be familiar and welcomed; and that scholars often want to make claims about equity or the lack thereof, but data is hard to come by. We hope you will be able to share what you know first-hand or can verify from this person's writing, and we're happy to <a href="mailto:admin@writingstudiestree.org">discuss this further</a> if you have questions or suggestions!</p>
	<div class="form-group">
		<Tags
			field={[value.id, "content.identity"]}
			bind:enteredTags={value.content.identity}
		/>
	</div>
</div>
<div class = "card card-body mb-3">
	<h2>5. Additional Description</h2>
	<p>Is there any more information you would like to add?</p>
	<TextField
		field={[value.id, "content.description"]}
		type="textarea"
		bind:value={value.content.description}
	>
		<small class="text-muted">Keep in mind: You'll be forming relationships with other entries in the next step!</small>
	</TextField>
</div>
