import * as zod from 'zod';
import type { Content, Citations, Relations, Attributions } from '../types';

const UID = zod.number().lt(0);

export const personSchema: zod.ZodSchema<Content> = zod.object({
	id: UID,
	type: zod.enum(["person"]),
	name: zod.string().min(1),
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

export const schoolSchema: zod.ZodSchema<Content> = zod.object({
	id: UID,
	type: zod.enum(["school"]),
	name: zod.string().min(1),
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

export const institutionSchema: zod.ZodSchema<Content> = zod.object({
	id: UID,
	type: zod.enum(["institution"]),
	name: zod.string().min(1),
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

export const relationSchema: zod.ZodSchema<Relations> = zod.object({
	id: UID,
	type: zod.enum(['mentored', 'studied at', 'worked at', 'worked alongside', 'served on']),
	subtype: zod.string(),
	link_from: zod.number(),
	link_to: zod.number(),
	year_start: zod.number().int({ message: "Invalid year" }).positive({ message: "Invalid year" }),
	year_end: zod.number().optional(),
	content: zod.object({
		description: zod.string().optional(),
	}),
});

export const citationSchema: zod.ZodSchema<Citations> = zod.object({
	id: UID,
	name: zod.string().min(1),
	collection: zod.string(),
	content: zod.object({
		description: zod.string().optional(),
	}),
});

export const attributionSchema: zod.ZodSchema<Attributions> = zod.object({
	id: UID,
	type: zod.enum(['content', 'relations']),
	link_material: zod.number(),
	link_citation: zod.number(),
});
