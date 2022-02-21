type StringKeyValueObject = { [key: string]: string };

/**
 * Provides a set of two functions with a WeakMap shared between them.
 * `setStyle` will set the style of the given node while saving the original style to a WeakMap.
 * `restoreStyles` will reset the style of the given node to the original style from the WeakMap.
 * @returns - A set of two functions. `setStyle` and `restoreStyles`.
 */
export function createStyleMemo() {
	const map = new WeakMap<HTMLElement, StringKeyValueObject>();

	/**
	 * Will set the style of the given node while saving the original style to a WeakMap.
	 * @param element - The element to set the style on.
	 * @param styleProp - The style property to set.
	 * @param styleValue - The value to set the style property to.
	 */
	function setStyle(element: HTMLElement, styleProp: string, styleValue: string) {
		const originalValue = element.style.getPropertyValue(styleProp);

		const styleObj = map.get(element);

		if (styleObj && styleObj[styleProp] === undefined) {
			// Once a value is set, it should not be overwritten
			styleObj[styleProp] = originalValue;
		} else if(!styleObj) {
			map.set(element, { [styleProp]: originalValue });
		}

		element.style.setProperty(styleProp, styleValue);
	}

	/**
	 * Will restore the style properties modified by `setStyle` to their original values.
	 * @param element - the element to restore the style on.
	 */
	function restoreStyles(element: HTMLElement) {
		const styleObj = map.get(element);
		if (!styleObj) return;

		for (const [styleProp, styleValue] of Object.entries(styleObj)) {
			element.style.setProperty(styleProp, styleValue);
		}

		map.delete(element);
	}

	return {
		setStyle,
		restoreStyles,
	}
}