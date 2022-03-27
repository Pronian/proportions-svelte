export interface SvelteAction<T> {
	(node: HTMLElement, options: T): { update?: (options: T) => void; destroy?: () => void };
}
