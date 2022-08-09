import type { Content, Relations, Citations, Attributions } from '../types';

export enum InsertFormType {
	CONTENT = "content",
	RELATION = "relation",
	CITATION = "citation",
	ATTRIBUTION = "attribution",
}

export type InsertFormTypes = {
	[InsertFormType.CONTENT]: Content,
	[InsertFormType.RELATION]: Relations,
	[InsertFormType.CITATION]: Citations,
	[InsertFormType.ATTRIBUTION]: Attributions,
};

export interface InsertFormRecord<T extends InsertFormType = InsertFormType> {
	type: T,
	value: InsertFormTypes[T],
};

export type InsertForm = InsertFormRecord[];

export type InsertFormError = {
	key: number,
	field?: string,
	message: string,
};

export function isRecordType<T extends InsertFormType>(record: InsertFormRecord, type: T): record is InsertFormRecord<T> {
	return record.type === type;
}

export function filterRecordType<T extends InsertFormType>(form: InsertForm, type: T) : InsertFormRecord<T>[] {
	const isType = (r: InsertFormRecord): r is InsertFormRecord<T> => isRecordType(r, type);
	return form.filter(isType);
}
