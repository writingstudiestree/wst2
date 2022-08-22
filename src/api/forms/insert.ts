import { InsertForm, InsertFormType, isRecordType, filterRecordType, InsertFormRecord } from './base';
import * as db from '../db';

export async function insertForm(form: InsertForm) : Promise<InsertFormRecord | void> {
	// map local (within `form`) ids to created database ids
	const contentIdMap: Map<number, number> = new Map();
	const relationIdMap: Map<number, number> = new Map();
	const citationIdMap: Map<number, number> = new Map();
	const attributionIdMap: Map<number, number> = new Map();

	for (const record of filterRecordType(form, InsertFormType.CONTENT)) {
		const { id, ...value } = record.value;

		if (id < 0) {
			// Insert content node & update map with returned id
			const newId = await db.insertContent(value);
			contentIdMap.set(id, newId);
		} else {
			await db.updateContent({ id, ...value });
			contentIdMap.set(id, id);
		}
	}

	// Insert relation nodes using the `contentIdMap`
	for (const record of filterRecordType(form, InsertFormType.RELATION)) {
		const { id, ...value } = record.value;

		// Translate any local ids (< 0) to database ids in `contentIdMap`
		if (value.link_to < 0) {
			const link_to = contentIdMap.get(value.link_to);
			if (link_to === undefined) throw new Error("Form is missing a relation link_to node");
			value.link_to = link_to;
		}

		if (value.link_from < 0) {
			const link_from = contentIdMap.get(value.link_from);
			if (link_from === undefined) throw new Error("Form is missing a relation link_from node");
			value.link_from = link_from;
		}

		// Insert relation node & update map with returned id
		const newId = await db.insertRelation(value);
		relationIdMap.set(id, newId);
	}

	for (const record of filterRecordType(form, InsertFormType.CITATION)) {
		const { id, ...value } = record.value;

		// Insert citation node & update map with returned id
		const newId = await db.insertCitation(value);
		citationIdMap.set(id, newId);
	}

	for (const record of filterRecordType(form, InsertFormType.ATTRIBUTION)) {
		const { id, ...value } = record.value;

		// Translate any local ids (< 0) to database ids in id maps
		if (value.link_material < 0) {
			let link_material;
			if (value.type === "content") link_material = contentIdMap.get(value.link_material);
			if (value.type === "relations") link_material = relationIdMap.get(value.link_material);
			if (link_material === undefined) throw new Error("Form is missing an attribution link_material node");
			value.link_material = link_material;
		}

		if (value.link_citation < 0) {
			const link_citation = citationIdMap.get(value.link_citation);
			if (link_citation === undefined) throw new Error("Form is missing an attribution link_citation node");
			value.link_citation = link_citation;
		}

		// Insert attribution node
		const newId = await db.insertAttribution(value);
		attributionIdMap.set(id, newId);
	}

	// get the first node's new database ID
	if (form[0]) {
		let id = form[0].value.id;
		if (isRecordType(form[0], InsertFormType.CONTENT))
			id = contentIdMap.get(id) || id;
		if (isRecordType(form[0], InsertFormType.RELATION))
			id = relationIdMap.get(id) || id;
		if (isRecordType(form[0], InsertFormType.CITATION))
			id = citationIdMap.get(id) || id;
		if (isRecordType(form[0], InsertFormType.ATTRIBUTION))
			id = attributionIdMap.get(id) || id;

		if (id >= 0) {
			return {
				type: form[0].type,
				value: {
					...form[0].value,
					id,
				}
			};
		}
	}
}