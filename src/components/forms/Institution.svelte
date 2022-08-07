<script lang="ts">
	import type { Content } from '../../api/types';
    import SchoolDescription from '../schoolntakeComponents/SchoolDescription.svelte';
    import SchoolLocation from '../schoolntakeComponents/SchoolLocation.svelte';
    import SchoolTags from '../schoolntakeComponents/SchoolTags.svelte';
    import InstitutionBasicInformation from '../institutionIntakeComponents/InstitutionBasicInformation.svelte';

    export let value: Content & {
    content: any,
	};
</script>
<h1 class="textCenter">New Non-school Institution</h1>
<div class = "inside">Is this institution a school or university? If so, click <a href = "/forms">here</a> to get redirected to our form menu.</div>
<InstitutionBasicInformation
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