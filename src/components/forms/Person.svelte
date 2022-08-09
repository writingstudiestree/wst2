<script lang="ts">
	import type { Content } from 'src/api';

	import Tags from "../personIntakeComponents/Tags.svelte";
	import Websites from '../personIntakeComponents/Websites.svelte';
	import IdentityTags from '../personIntakeComponents/IdentityTags.svelte';
	import Description from '../personIntakeComponents/Description.svelte';
	import TextField from './fields/TextField.svelte';

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

		<TextField
			field={[value.id, "name"]}
			name="Full name"
			placeholder="Your preferred name (first and last, if applicable)"
			required
			bind:value={value.name}
		/>

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

<Websites
	bind:websites={value.content.websites}
/>

<Tags bind:enteredTags={value.content.tags}/>

<IdentityTags bind:enteredTags={value.content.Identity}/>

<Description bind:description={value.content.description}/>
