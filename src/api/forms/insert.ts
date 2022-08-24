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
			// Insert revision for updating content
			await db.insertRevision({
				type: "content",
				link_modifies: id,
				created: new Date(),
				content: {
					// TODO: add a property for the user that created the revision
					from: (await db.getContent(id)) as never,
					to: value as never,
				},
			});
			// Update content node in db
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

		if (id < 0) {
			// Insert relation node & update map with returned id
			const newId = await db.insertRelation(value);
			relationIdMap.set(id, newId);
		} else {
			// Insert revision for updating relation
			await db.insertRevision({
				type: "relations",
				link_modifies: id,
				created: new Date(),
				content: {
					// TODO: add a property for the user that created the revision
					from: (await db.getRelation(id)) as never,
					to: value as never,
				},
			});
			// Update relation node in db
			await db.updateRelation({ id, ...value });
			relationIdMap.set(id, id);
		}
	}

	for (const record of filterRecordType(form, InsertFormType.CITATION)) {
		const { id, ...value } = record.value;

		if (id < 0) {
			// Insert citation node & update map with returned id
			const newId = await db.insertCitation(value);
			citationIdMap.set(id, newId);
		} else {
			// Insert revision for updating citation
			await db.insertRevision({
				type: "citations",
				link_modifies: id,
				created: new Date(),
				content: {
					// TODO: add a property for the user that created the revision
					from: (await db.getCitation(id)) as never,
					to: value as never,
				},
			});
			// Update citation node in db
			await db.updateCitation({ id, ...value });
			citationIdMap.set(id, id);
		}
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

		if (id < 0) {
			// Insert attribution node
			const newId = await db.insertAttribution(value);
			attributionIdMap.set(id, newId);
		} else {
			// Update attribution node

			// TODO: this should never be invoked with our current usage, so I'm throwing an error here for now.
			//   If we need this behavior, the following line can be uncommented (and changes should be added to the Revision table)
			//   await db.updateAttribution({ id, ...value });

			throw new Error("Existing attribution nodes should not be updated.");
		}
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