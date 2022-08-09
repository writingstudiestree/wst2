import { readable, writable } from 'svelte/store';

/**
 * @type {import('$app/stores').getStores}
 */
export const getStores = () => ({
	navigating: readable(null),
	page: readable({ url: new URL('http://localhost'), params: {} }),
	session: writable(null),
	updated: readable(false)
});

/** @type {typeof import('$app/stores').page} */
export const page = {
	subscribe(fn) {
		return getStores().page.subscribe(fn);
	}
};

/** @type {typeof import('$app/stores').navigating} */
export const navigating = {
	subscribe(fn) {
		return getStores().navigating.subscribe(fn);
	}
};

/** @type {typeof import('$app/stores').session} */
export const session = {
	subscribe(fn) {
		return getStores().session.subscribe(fn);
	}
};

/** @type {typeof import('$app/stores').updated} */
export const updated = {
	subscribe(fn) {
		return getStores().updated.subscribe(fn);
	}
};
