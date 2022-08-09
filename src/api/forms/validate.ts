import { ZodError, ZodType } from 'zod';
import { InsertForm, InsertFormRecord, InsertFormType, InsertFormTypes, InsertFormError, isRecordType } from './base';
import * as schemata from './schemata';

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
	schema: ZodType<InsertFormTypes[T]>,
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
 * Validates all nodes/fields in the provided form state,
 * and returns an array of all errors encountered in the form.
 *
 * @param form The complete form state to validate.
 * @returns Any errors encountered, or an empty array if successful.
 */
export function validateForm(form: InsertForm) : InsertFormError[] {
	const errors: InsertFormError[] = [];

	// validate relation/attribution links
	for (const [key, record] of form.entries()) {
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

			const linkFrom = form.find(r => r.value.id === record.value.link_from);
			const linkTo = form.find(r => r.value.id === record.value.link_to);

			if (!linkFrom || !isRecordType(linkFrom, InsertFormType.CONTENT))
				errors.push({ key, message: `Missing link_from element in record ${key}`});
			if (!linkTo || !isRecordType(linkTo, InsertFormType.CONTENT))
				errors.push({ key, message: `Missing link_to element in record ${key}` });
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

			const linkMaterial = form.find(r => r.value.id === record.value.link_material);
			const linkCitation = form.find(r => r.value.id === record.value.link_citation);

			if (!linkMaterial)
				errors.push({ key, message: `Missing link_material element in record ${key}` });
			if (record.value.type === "content" && (!linkMaterial || !isRecordType(linkMaterial, InsertFormType.CONTENT)))
				errors.push({ key, message: `link_material element ${key} is not the expected CONTENT type` });
			if (record.value.type === "relations" && (!linkMaterial || !isRecordType(linkMaterial, InsertFormType.RELATION)))
				errors.push({ key, message: `link_material element ${key} is not the expected RELATION type` });
			if (!linkCitation || !isRecordType(linkCitation, InsertFormType.CITATION))
				errors.push({ key, message: `Missing link_citation element in record ${key}` });
		}
	}

	return errors;
}
