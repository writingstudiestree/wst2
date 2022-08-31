import * as zod from 'zod';
import type { ContentWithDefaults, RelationsWithDefaults, CitationsWithDefaults, AttributionsWithDefaults } from '../types';

const UID = zod.number();

export const personSchema: zod.ZodSchema<ContentWithDefaults> = zod.object({
	id: UID,
	type: zod.enum(["person"]),
	name: zod.string().min(1).max(1000),
	content: zod.object({
		orcId: zod.string().optional(),
		pronounceLink: zod.string().url().or(zod.literal("")).optional(),
		tags: zod.array(
			zod.string()
		).optional(),
		websites: zod.array(
			zod.string().url()
		).optional(),
		description: zod.string().optional(),
	}),
});

export const schoolSchema: zod.ZodSchema<ContentWithDefaults> = zod.object({
	id: UID,
	type: zod.enum(["school"]),
	name: zod.string().min(1).max(1000),
	content: zod.object({
		location: zod.string().regex(/(^.+, ["A-Z"]+, United States$)|(^.+, ["A-Za-z"]+$)/),
		tags: zod.array(
			zod.string()
		).optional(),
		websites: zod.array(
			zod.string().url()
		).optional(),
		description: zod.string().optional(),
	}),
});

export const institutionSchema: zod.ZodSchema<ContentWithDefaults> = zod.object({
	id: UID,
	type: zod.enum(["institution"]),
	name: zod.string().min(1).max(1000),
	content: zod.object({
		location: zod.string().regex(/(^.+, ["A-Z"]+, United States$)|(^.+, ["A-Za-z"]+$)/),
		tags: zod.array(
			zod.string()
		).optional(),
		websites: zod.array(
			zod.string().url()
		).optional(),
		description: zod.string().optional(),
	}),
});

export const relationSchema: zod.ZodSchema<RelationsWithDefaults> = zod.object({
	id: UID,
	type: zod.enum(['mentored', 'studied at', 'worked at', 'worked alongside', 'served on']),
	subtype: zod.string().max(255),
	link_from: zod.number(),
	link_to: zod.number(),
	year_start: zod.number(),
	year_end: zod.number().optional(),
	content: zod.object({
		department: zod.string().optional(),
		description: zod.string().optional(),
	}),
});

export const citationSchema: zod.ZodSchema<CitationsWithDefaults> = zod.object({
	id: UID,
	name: zod.string().min(1).max(255),
	collection: zod.string().max(255),
	content: zod.object({
		description: zod.string().optional(),
	}),
});

export const attributionSchema: zod.ZodSchema<AttributionsWithDefaults> = zod.object({
	id: UID,
	type: zod.enum(['content', 'relations']),
	link_material: zod.number(),
	link_citation: zod.number(),
});
