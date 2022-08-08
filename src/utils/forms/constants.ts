import { InsertForm, InsertFormType } from 'src/api/forms/base';

export type FormType = "person"|"school"|"institution"|"citation";

export const defaultForms: Record<FormType, InsertForm> = {
	person: {
		'-1': {
			type: InsertFormType.CONTENT,
			value: {
				id: -1,
				type: "person",
				name: "",
				content: {
					orcId: "",
					pronounceLink: "",
					tags: [],
					websites: [],
					description: "",
				},
			}
		},
	},
	school: {
		'-1': {
			type: InsertFormType.CONTENT,
			value: {
				id: -1,
				type: "school",
				name: "",
				content: {
					location: "",
					tags: [],
					websites: [],
					description: "",
				},
			}
		},
	},
	institution: {
		'-1': {
			type: InsertFormType.CONTENT,
			value: {
				id: -1,
				type: "institution",
				name: "",
				content: {
					location: "",
					tags: [],
					websites: [],
					description: "",
				},
			}
		},
	},
	citation: {
		'-1': {
			type: InsertFormType.CITATION,
			value: {
				id: -1,
				name: "",
				collection: "",
				content: {
					description: "",
				},
			}
		},
	}
};
