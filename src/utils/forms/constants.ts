import { InsertForm, InsertFormType } from 'src/api/forms/base';

export type FormType = "person"|"school"|"institution";

export const contentIcons: Record<FormType, string> = {
	person: "person",
	school: "school",
	institution: "diversity_3",
};

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
	]
};
