<script lang="ts">
	import type { Content } from 'src/api';

	import BasicInformation from "../personIntakeComponents/BasicInformation.svelte";
	import Tags from "../personIntakeComponents/Tags.svelte";
	import Websites from '../personIntakeComponents/Websites.svelte';
	import IdentityTags from '../personIntakeComponents/IdentityTags.svelte';
	import Description from '../personIntakeComponents/Description.svelte';

	/*export let value: Content & {
		content: {
			orcId: string,
			pronounceLink: string,
			tags: string[],
			websites: string[],
			description: string,
		}
	};*/
	export let value: Content & {
    content: any,
	};
</script>

<h1 class="textCenter">New Person</h1>
<BasicInformation
	bind:name={value.name}
	bind:ORCiD={value.content.orcId}
/>

<Websites
	bind:websites={value.content.websites}
	bind:pronounceLink={value.content.pronounceLink}
/>

<Tags bind:enteredTags={value.content.tags}/>

<IdentityTags bind:enteredTags={value.content.Identity}/>

<Description bind:description={value.content.description}/>