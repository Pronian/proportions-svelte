declare namespace svelte.JSX {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface HTMLAttributes<T> {
		onclickOutside?: (e: CustomEvent) => void;
	}
}
