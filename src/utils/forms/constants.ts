import { InsertForm, InsertFormType } from 'src/api/forms/base';

export type FormType = "person"|"school"|"institution"|"citation";

export const defaultForms: Record<FormType, InsertForm> = {
	person: [
		{
			type: InsertFormType.CONTENT,
			value: {
				id: -1,
				type: "person",
				name: "",
				date_created: new Date(),
				date_modified: new Date(),
				content: {
					orcId: "",
					pronounceLink: "",
					tags: [],
					websites: [],
					description: "",
				},
			}
		},
	],
	school: [
		{
			type: InsertFormType.CONTENT,
			value: {
				id: -1,
				type: "school",
				name: "",
				date_created: new Date(),
				date_modified: new Date(),
				content: {
					location: "",
					tags: [],
					websites: [],
					description: "",
				},
			}
		},
	],
	institution: [
		{
			type: InsertFormType.CONTENT,
			value: {
				id: -1,
				type: "institution",
				name: "",
				date_created: new Date(),
				date_modified: new Date(),
				content: {
					location: "",
					tags: [],
					websites: [],
					description: "",
				},
			}
		},
	],
	citation: [
		{
			type: InsertFormType.CITATION,
			value: {
				id: -1,
				name: "",
				collection: "",
				date_created: new Date(),
				date_modified: new Date(),
				content: {
					description: "",
				},
			}
		},
	]
};
