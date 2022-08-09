<script lang="ts">
	import type { Content } from 'src/api';
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
<h1 class="textCenter">New School or University</h1>
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