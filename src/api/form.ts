import type { Content, Relations, Citations, Attributions } from './types';

export enum InsertFormType {
	content = "content",
	relation = "relation",
	citation = "citation",
	attribution = "attribution",
}

export type InsertFormTypes = {
	[InsertFormType.content]: Content,
	[InsertFormType.relation]: Relations,
	[InsertFormType.citation]: Citations,
	[InsertFormType.attribution]: Attributions,
};

export interface InsertFormRecord<T extends InsertFormType> {
	type: T,
	value: InsertFormTypes[T],
};

export type InsertForm = Record<string, InsertFormRecord<any>>;
