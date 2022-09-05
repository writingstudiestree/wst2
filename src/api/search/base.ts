import type { Content, Relations } from "../types";

export type SearchQuery = {
	// (strict) filter type of content nodes
	content_type?: string;
	// (FULLTEXT) find name of content nodes
	content_name?: string;
	// (strict) interest tags of content node
	content_tag?: string;
	// (bidirectional) filter content nodes by relation with another node
	relation_with?: number;
	// (strict) filter type of relations
	relation_type?: string;
	// pagination
	last_id?: number;
};

export type SearchResult = {
	content: Content,
	relation?: Relations,
};
