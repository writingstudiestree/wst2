import * as zod from 'zod';
import type { ContentWithDefaults, RelationsWithDefaults, CitationsWithDefaults, AttributionsWithDefaults } from '../types';

const UID = zod.number();

const NAME = zod.string()
	.min(1, "Name field must not be empty")
	.max(1000)
	// Ensures that names are delimited by "|", and each name is not empty
	.regex(/^[^\|]+(\|[^\|]+)*$/, "Name field must not be empty");

export const personSchema: zod.ZodSchema<ContentWithDefaults> = zod.object({
	id: UID,
	type: zod.enum(["person"]),
	name: NAME,
	content: zod.object({
		// orcId is an ISO-27729 identifier; i.e. 16 numerical digits (with the possibility of the last digit being "X")
		// https://support.orcid.org/hc/en-us/articles/360006897674-Structure-of-the-ORCID-Identifier
		orcId: zod.string().regex(/^$|^([0-9]{4}\-){3}[0-9X]{4}$/, "Must be in the OrcID format: '0000-0001-2345-6789'").optional(),
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
	name: NAME,
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
	name: NAME,
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
	year_start: zod.number().int("Invalid year").positive("Invalid year"),
	year_end: zod.number().int("Invalid year").positive("Invalid year").optional(),
	content: zod.object({
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
