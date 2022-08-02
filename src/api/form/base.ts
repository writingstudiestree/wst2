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

export interface InsertFormRecord<T extends InsertFormType> {
	type: T,
	value: InsertFormTypes[T],
};

export type InsertForm = Record<string, InsertFormRecord<InsertFormType>>;

export function isRecordType<T extends InsertFormType>(record: InsertFormRecord<any>, type: T): record is InsertFormRecord<T> {
	return record.type === type;
}
