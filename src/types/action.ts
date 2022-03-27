export interface SvelteAction<T = undefined> {
	(node: HTMLElement, options: T): { update?: (options: T) => void; destroy?: () => void };
}
