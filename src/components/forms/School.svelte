<script lang="ts">
	import type { Content } from '../../api/types';
	import SchoolBasicInformation from '../schoolntakeComponents/SchoolBasicInformation.svelte';
import SchoolDescription from '../schoolntakeComponents/SchoolDescription.svelte';
import SchoolLocation from '../schoolntakeComponents/SchoolLocation.svelte';
import SchoolTags from '../schoolntakeComponents/SchoolTags.svelte';

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

<SchoolBasicInformation
	bind:name={value.name}
	bind:websites={value.content.websites}
/>

<SchoolLocation
	bind:location={value.content.location}
/>

<SchoolTags
	bind:enteredTags={value.content.tags}
/>

<SchoolDescription
	bind:description={value.content.description}
/>