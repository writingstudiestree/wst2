<script lang="ts">
	import type { Content } from '../../api/types';

	import BasicInformation from "../personIntakeComponents/BasicInformation.svelte";
	import Tags from "../personIntakeComponents/Tags.svelte";
	import Degrees from "../personIntakeComponents/Degrees.svelte";

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
	bind:pronounceLink={value.content.pronounceLink}
/>

<Tags bind:enteredTags={value.content.tags}/>