<script type="ts">
	import type { Content } from 'src/api';
	export let value: Content & {
		content: any,
	};

	$: name = value.name?.split("|")[0];
	$: extraNames = value.name?.split("|").slice(1).join(", ");

	$: showWebsites = value.content.websites?.filter((s: any) => !!s).join(", ") || "none provided";

	$: showTags = value.content.tags?.filter((s: any) => !!s).join(", ") || "none provided";

	$: showDescription = value.content.description || "none provided";

	$: showOrcid = value.content.orcId || "none provided";

	$: showPronounceLink = value.content.pronounceLink || "none provided";

	$: showIdentity = value.content.identity?.filter((s: any) => !!s).join(", ") || "none provided";

</script>
<h1 class = "textCenter">Form relationships</h1>
<div class = "card card-body mb-3">
	<h2>Getting Ready</h2>
	<p>Now that your node has been created, it is time to start forming relationships within the network! First, let's take a look at your current entry:</p>
	<div class = "card card-body mb-2">
		<h2>New {value.type} - {name}</h2>
		{#if extraNames}
		<span>Also known as: {extraNames}</span>
		{/if}
		<ul class="list-group">
			{#if value.type === "person"}
			<li class="list-group-item"><b>ORCiD:</b><br/>{showOrcid}</li>
			<li class="list-group-item"><b>Pronunciation Link:</b><br/>{showPronounceLink}</li>
			<li class="list-group-item"><b>Websites:</b><br/>{showWebsites}</li>
			<li class="list-group-item"><b>Areas of Focus:</b><br/>{showTags}</li>
			<li class="list-group-item"><b>Identity descriptors:</b><br/>{showIdentity}</li>
			<li class="list-group-item"><b>Additional description:</b><br/>{showDescription}</li>
			{/if}
			{#if value.type === "school" || value.type === "institution"}
			<li class="list-group-item"><b>Location:</b><br/>{value.content.location}</li>
			<li class="list-group-item"><b>Websites:</b><br/>{showWebsites}</li>
			<li class="list-group-item"><b>Areas of Focus:</b><br/>{showTags}</li>
			<li class="list-group-item"><b>Additional description:</b><br/>{showDescription}</li>
			{/if}
		</ul>
	</div>
	<p>See any errors? Use the 'back' button at the top of the page to correct them before we start integrating your node in to the network!</p>
</div>