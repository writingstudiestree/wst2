import { InsertForm, InsertFormType, isRecordType } from "./base";

type InsertFormError = {
	key: string,
	field?: string,
	message: string,
};

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
	for (const [key, record] of Object.entries(form)) {
		// ensure that both link_from and link_to are valid content nodes in RELATION
		if (isRecordType(record, InsertFormType.RELATION)) {
			const linkFrom = form[record.value.link_from + ''];
			const linkTo = form[record.value.link_to + ''];

			if (!linkFrom || !isRecordType(linkFrom, InsertFormType.CONTENT))
				errors.push({ key, message: `Missing link_from element in record ${key}`});
			if (!linkTo || !isRecordType(linkTo, InsertFormType.CONTENT))
				errors.push({ key, message: `Missing link_to element in record ${key}` });
		}

		// ensure that both link_material and link_citation are valid nodes in ATTRIBUTION
		if (isRecordType(record, InsertFormType.ATTRIBUTION)) {
			const linkMaterial = form[record.value.link_material + ''];
			const linkCitation = form[record.value.link_citation + ''];

			if (!linkMaterial)
				errors.push({ key, message: `Missing link_material element in record ${key}` });
			if (record.value.type === "content" && !isRecordType(linkMaterial, InsertFormType.CONTENT))
				errors.push({ key, message: `link_material element ${key} is not the expected CONTENT type` });
			if (record.value.type === "relations" && !isRecordType(linkMaterial, InsertFormType.RELATION))
				errors.push({ key, message: `link_material element ${key} is not the expected RELATION type` });
			if (!linkCitation || !isRecordType(linkCitation, InsertFormType.CITATION))
				errors.push({ key, message: `Missing link_citation element in record ${key}` });
		}
	}

	return errors;
}
