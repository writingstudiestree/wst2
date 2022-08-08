import { InsertForm, InsertFormType } from '../../api/form/base';

export type FormType = "person"|"school"|"institution"|"citation";

export const defaultForms: Record<FormType, InsertForm> = {
	person: {
		'0': {
			type: InsertFormType.CONTENT,
			value: {
				id: 0,
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
		'0': {
			type: InsertFormType.CONTENT,
			value: {
				id: 0,
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
		'0': {
			type: InsertFormType.CONTENT,
			value: {
				id: 0,
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
		'0': {
			type: InsertFormType.CITATION,
			value: {
				id: 0,
				name: "",
				collection: "",
				content: {
					description: "",
				},
			}
		},
	}
};
