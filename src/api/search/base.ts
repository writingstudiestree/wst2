import type { Content, Relations } from "../types";

export type SearchQuery = {
	// (strict) filter type of content nodes
	content_type?: string | null;
	// (FULLTEXT) find name of content nodes
	content_name?: string | null;
	// (strict) comma-separated interest tags of content node
	content_tags?: string | null;
	// (bidirectional) filter content nodes by relation with another node
	relation_with?: number | null;
	// (strict) filter type of relations
	relation_type?: string | null;
	// pagination
	last_id?: number | null;
};

export type SearchResult = {
	content: Content,
	relation?: Relations,
};
