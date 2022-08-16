<script type="ts">
    import type { Content } from 'src/api';
    export let value: Content & {
    content: any,
	};

	//All
	let extraNames: string = "";
	for (let i = 1; i < value.content.tempNames.length; i++) {
		if (value.content.tempNames[i] !== "" && i === 1)
		extraNames += value.content.tempNames[i];
		if (value.content.tempNames[i] !== "" && i != 1)
		extraNames += ", " + value.content.tempNames[i];
	}

	let showWebsites: string = "";
	if (value.content.websites.length === 0 || value.content.websites === [''])
	{
		showWebsites = "none provided"
	}
	else
	{
		for (let i = 0; i < value.content.websites.length; i++) {
		if (value.content.websites[i] !== "" && i === 0)
		showWebsites += value.content.websites[i];
		if (value.content.websites[i] !== "" && i !== 0)
		showWebsites += ", " + value.content.websites[i];
	}
	}

	let showTags: string = "";
	if (value.content.tags.length === 0)
	{
		showTags = "none provided"
	}
	else
	{
		for (let i = 0; i < value.content.tags.length; i++) {
		if (value.content.tags[i] !== "" && i === 0)
		showTags += value.content.tags[i];
		if (value.content.tags[i] !== "" && i !== 0)
		showTags += ", " + value.content.tags[i];
	}
	}

	let showDescription: string = "";
	if (value.content.description === "" || value.content.description === undefined)
	{
		showDescription = "none provided"
	}
	else
	{
		showDescription = value.content.description;
	}

	//Person
	let showOrcid: string = "";
	if (value.content.orcId === "" || value.content.orcId === undefined)
	{
		showOrcid = "none provided"
	}
	else
	{
		showOrcid = value.content.orcId;
	}

	let showPronounceLink: string = "";
	if (value.content.pronounceLink === "" || value.content.pronounceLink === undefined)
	{
		showPronounceLink = "none provided"
	}
	else
	{
		showPronounceLink = value.content.pronounceLink;
	}

	let showIdentity: string = "";
	if (value.content.identity.length === 0)
	{
		showIdentity = "none provided"
	}
	else
	{
		for (let i = 0; i < value.content.identity.length; i++) {
		if (value.content.identity[i] !== "" && i === 0)
		showIdentity += value.content.identity[i];
		if (value.content.identity[i] !== "" && i !== 0)
		showIdentity += ", " + value.content.identity[i];
	}
	};

</script>
<h1 class = "textCenter">Form relationships</h1>
			<div class = "inside">
				<h2>Getting Ready</h2>
				<p>Now that your node has been created, it is time to start forming relationships within the network! First, let's take a look at your current entry:</p>
				<div class = "inception">
					<h2>New {value.type} - {value.content.tempNames[0]}</h2>
					{#if value.content.tempNames.length > 1}
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
					</ul>

					
				</div>
				<p>See any errors? Use the 'back' button at the top of the page to correct them before we start integrating your node in to the network!</p>
			</div>