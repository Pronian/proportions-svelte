import { writable } from 'svelte/store';
import { debounce } from '../util/metaFunctions';

/**
 * A writable Svelte store that saves its value to localStorage in the background.
 * @param key - the key to use for the store value in localStorage
 * @param defaultValue - the default value to use if the store value is
 * not found in localStorage
 * @param debounceMs - the number of milliseconds to debounce before saving to
 * localStorage. Instant saving if not debounced.
 * @returns a writable Svelte store
 */
export function createWritableLS<T>(key: string, defaultValue: T, debounceMs: number = 0) {
	let storeValue = defaultValue;

	if (localStorage.hasOwnProperty(key)) {
		try {
			storeValue = JSON.parse(localStorage.getItem(key) as string);
		} catch (error) {
			console.warn(`Error parsing localStorage value for key ${key}:`, error);
			storeValue = defaultValue;
		}
	}

	const { set: storeSet, subscribe } = writable(storeValue);

	let setLS: (value: T) => void;
	if (debounceMs > 0) {
		setLS = debounce((value: T) => {
			localStorage.setItem(key, JSON.stringify(value));
		}, debounceMs);
	} else {
		setLS = (value: T) => {
			localStorage.setItem(key, JSON.stringify(value));
		};
	}

	function wrappedSet(value: T) {
		storeValue = value;
		storeSet(value);
		setLS(value);
	}

	function update(fn: (value: T) => T) {
		const updatedValue = fn(storeValue);
		storeValue = updatedValue;
		storeSet(updatedValue);
		setLS(updatedValue);
	}

	function get() {
		return storeValue;
	}

	return {
		subscribe,
		set: wrappedSet,
		update,
		get
	};
}
