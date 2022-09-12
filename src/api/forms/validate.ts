import { ZodError, ZodType } from 'zod';
import type { Content, Relations } from '../types';
import { InsertForm, InsertFormRecord, InsertFormType, InsertFormTypes, InsertFormError, isRecordType } from './base';
import * as schemata from './schemata';
import { browser } from '$app/environment';

/**
 * Validate a Zod schema, mapping any caught errors into the `InsertFormError` type.
 *
 * @param key The key of the form, used in error objects
 * @param schema The object schema to validate against
 * @param record A form record to be validated
 * @returns Any caught errors, or an empty array if none were found.
 */
function validateSchema<T extends InsertFormType>(
	key: number,
	schema: ZodType<Partial<InsertFormTypes[T]>>,
	record: InsertFormRecord<T>
) : InsertFormError[] {
	const errors: InsertFormError[] = [];

	try {
		// attempt to validate schema on record
		schema.parse(record.value);
	} catch (e) {
		// catch any thrown ZodError
		if (e instanceof ZodError) {
			// for each issue, append to errors array
			for (const issue of e.issues) {
				errors.push({
					key,
					field: issue.path.join("."),
					message: issue.message,
				});
			}
		} else {
			console.error("Error validating content schemata", e, record);

		}
	}

	return errors;
}

/**
 * Ensures that a node referenced by an id actually exists in the
 * database and has the correct expected type.
 *
 * On the client, this function always returns true.
 */
export async function validateEntryType(
	key: number,
	form: InsertForm,
	id: number,
	type: InsertFormType,
	subtypes?: string[]
) {
	const errors: InsertFormError[] = [];

	if (id < 0) {
		// check the id locally in the form object
		const record = form.find(r => r.value.id === id);

		// if the record doesn't exist, return error
		if (!record || !isRecordType(record, type))
			errors.push({ key, message: `Record ${id} referenced by ${key} is missing the corresponding entry type ${type}` });

		// if the record does exist, and it is a content node, ensure that it has the correct type
		if (record && type === InsertFormType.CONTENT && isRecordType(record, InsertFormType.CONTENT)) {
			if (subtypes && !subtypes.includes(record.value.type))
				errors.push({ key, message: `Record ${id} referenced by ${key} is missing the expected content type ${subtypes} - it is actually a ${record.value.type}` });
		}

		return errors;
	}

	// db module cannot be imported on the client
	const db = browser ? null : await import("src/api/db");
	if (!db) return errors;

	// check content records in the database
	if (type === InsertFormType.CONTENT) {
		const content = await db.getContent(id);

		// if the content doesn't exist, return error
		if (!content)
			errors.push({key, message: `Content #${id} referenced by ${key} is missing from the database` });

		// if the content does exist, ensure that it has the correct type
		if (content && subtypes && !subtypes.includes(content.type))
			errors.push({ key, message: `Content #${id} referenced by ${key} is missing the expected content type ${subtypes} - it is actually a ${content.type}` });
	}

	// check citation records in the database
	if (type === InsertFormType.CITATION) {
		const citation = await db.getCitation(id);

		// if the citation doesn't exist, return error
		if (!citation)
			errors.push({key, message: `Citation #${id} referenced by ${key} is missing from the database` });
	}

	return errors;
}

const validateRelationTypes: {
	[key in Relations["type"]]: [Content["type"][], Content["type"][]]
} = {
	"mentored": [["person"], ["person"]],
	"studied at": [["person"], ["school"]],
	"worked at": [["person"], ["school", "institution"]],
	"worked alongside": [["person"], ["person"]],
	"served on": [["person"], ["institution"]],
}

/**
 * Validates all nodes/fields in the provided form state,
 * and returns an array of all errors encountered in the form.
 *
 * @param form The complete form state to validate.
 * @returns Any errors encountered, or an empty array if successful.
 */
export async function validateForm(form: InsertForm) : Promise<InsertFormError[]> {
	const errors: InsertFormError[] = [];

	// validate relation/attribution links
	for (const record of form) {
		const key = record.value.id;

		if (isRecordType(record, InsertFormType.CONTENT)) {
			const contentSchemata = {
				person: schemata.personSchema,
				school: schemata.schoolSchema,
				institution: schemata.institutionSchema,
			};

			errors.push(
				...validateSchema(key, contentSchemata[record.value.type], record)
			);
		}

		// ensure that both link_from and link_to are valid content nodes in RELATION
		if (isRecordType(record, InsertFormType.RELATION)) {
			errors.push(
				...validateSchema(key, schemata.relationSchema, record)
			);

			const [typeFrom, typeTo] = validateRelationTypes[record.value.type];

			errors.push(
				// validate link_from reference type
				...await validateEntryType(key, form, record.value.link_from, InsertFormType.CONTENT, typeFrom)
			);

			errors.push(
				// validate link_to reference type
				...await validateEntryType(key, form, record.value.link_to, InsertFormType.CONTENT, typeTo)
			);
		}

		if (isRecordType(record, InsertFormType.CITATION)) {
			errors.push(
				...validateSchema(key, schemata.citationSchema, record)
			);
		}

		// ensure that both link_material and link_citation are valid nodes in ATTRIBUTION
		if (isRecordType(record, InsertFormType.ATTRIBUTION)) {
			errors.push(
				...validateSchema(key, schemata.attributionSchema, record)
			);

			if (record.value.type === "content") {
				errors.push(
					// validate link_material reference type as CONTENT
					...await validateEntryType(key, form, record.value.link_material, InsertFormType.CONTENT)
				);
			}

			if (record.value.type === "relations") {
				errors.push(
					// validate link_material reference type as RELATION
					...await validateEntryType(key, form, record.value.link_material, InsertFormType.RELATION)
				);
			}

			errors.push(
				// validate link_citation reference type
				...await validateEntryType(key, form, record.value.link_citation, InsertFormType.CITATION)
			);
		}
	}

	return errors;
}
