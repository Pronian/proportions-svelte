/**
 * Creates a debounced function that, when invoked, invokes `fn` at most once per `ms` milliseconds.
 * @param fn - the function to debounce
 * @param ms - the number of milliseconds to debounce for
 * @returns the debounced function
 */
export function debounce<A = unknown, R = void>(fn: (args: A) => R, ms = 300)  {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (args: A) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(args), ms);
	};
};