import type { InsertForm } from '../../api/form';

export type FormType = "person"|"school"|"institution"|"citation";

export const defaultForms: Record<FormType, InsertForm> = {
	person: {
		'0': {
			type: "content",
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
			type: "content",
			value: {
				id: 0,
				type: "school",
				name: "",
				content: {
					location: "",
					tags: [],
					websites: [],
				},
			}
		},
	},
	institution: {
		'0': {
			type: "content",
			value: {
				id: 0,
				type: "institution",
				name: "",
				content: {
					location: "",
					tags: [],
					websites: [],
				},
			}
		},
	},
	citation: {
		'0': {
			type: "citation",
			value: {
				name: "",
				collection: "",
				content: {
					description: "",
				},
			}
		},
	}
};
