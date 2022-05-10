interface Element {
	inert?: boolean;
}

/**
 * Mark the sibling elements of the given element as inert.
 * @param el - the element on which the action is applied
 * @param enabled - whether to enable or disable the inert mode
 */
export function inertSiblings(el: HTMLElement, enabled = false) {
	let siblings: Element[] | HTMLCollection = [];

	function setInertForSiblings(enabled: boolean) {
		siblings = el.parentElement?.children || siblings || [];

		for (const sibling of siblings) {
			if (sibling !== el && 'inert' in sibling) {
				sibling.inert = enabled;
			}
		}
	}

	setInertForSiblings(enabled);

	return {
		update(newEnabled: boolean) {
			setInertForSiblings(newEnabled);
		},
		destroy() {
			setInertForSiblings(false);
		}
	};
}
