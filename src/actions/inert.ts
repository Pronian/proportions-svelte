interface Element {
	inert?: boolean;
}

/**
 * Get the siblings of the specified element and update their `inert` attribute.
 * @param el - the element to get the siblings for
 * @param enabled - the value to set on the `inert` attribute
 * @returns the elements whose `inert` attribute was set
 */
function setInertForSiblings(el: HTMLElement, enabled: boolean) {
	const siblings = el.parentElement?.children || [];
	const modifiedElements: Element[] = [];

	for (const sibling of siblings as Element[]) {
		if (sibling !== el && 'inert' in sibling) {
			sibling.inert = enabled;
			modifiedElements.push(sibling);
		}
	}

	return modifiedElements;
}

/**
 * Walks up the DOM tree and sets the `inert` attribute on the siblings of the
 * specified element and the siblings of its parent elements.
 * @param el - the element from which to start walking up the DOM tree
 * @param enabled - the value to set on the `inert` attribute
 * @returns the elements whose `inert` attribute was set
 */
function walkUpTreeAndSetInert(el: HTMLElement, enabled: boolean) {
	let parent = el.parentElement;
	const modifiedElements: Element[] = setInertForSiblings(el, enabled);

	while (parent && parent.nodeName !== 'BODY') {
		modifiedElements.push(...setInertForSiblings(parent, enabled));
		parent = parent.parentElement;
	}

	return modifiedElements;
}

/**
 * Clears the `inert` attribute from the specified elements
 * by setting it to `false`.
 * @param elements - the elements whose `inert` attribute should be cleared
 */
function clearInertForElements(elements: Element[]) {
	for (const element of elements) {
		if ('inert' in element) {
			element.inert = false;
		}
	}
}

/**
 * Mark the sibling elements of the given element and the siblings of the
 * given element's parents as inert.
 * @param el - the element on which the action is applied
 * @param enabled - whether to enable or disable the inert mode
 */
export function inertSiblings(el: HTMLElement, enabled = false) {
	let modifiedElements = walkUpTreeAndSetInert(el, enabled);

	return {
		update(newEnabled: boolean) {
			clearInertForElements(modifiedElements);
			modifiedElements = walkUpTreeAndSetInert(el, newEnabled);
		},
		destroy() {
			clearInertForElements(modifiedElements);
		}
	};
}
