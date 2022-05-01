interface DynamicFontSizeOptions {
	maxFontSize?: number;
	minFontSize?: number;
}

/**
 * Reduces the font size of the given element until its text fits on one line.
 * @param el - the element to reduce the font size of
 * @param options.maxFontSize - the maximum font size that the element can have
 * @param options.minFontSize - the minimum font size that the element can have
 */
export function dynamicFontSize(el: HTMLElement, options?: DynamicFontSizeOptions) {
	const { maxFontSize = 100, minFontSize = 5 } = options || {};

	function adjustFontSize(maxFontSize: number, minFontSize: number) {
		let fontSize = maxFontSize;
		el.style.lineHeight = '1';
		el.style.wordBreak = 'break-all';
		const style = getComputedStyle(el);
		const paddingVertical = parseInt(style.paddingTop) + parseInt(style.paddingBottom);
		let realTextHeight = el.clientHeight - paddingVertical;

		while (realTextHeight > fontSize && fontSize > minFontSize) {
			fontSize -= 0.5;
			el.style.fontSize = `${fontSize}px`;
			realTextHeight = el.clientHeight - paddingVertical;
		}

		el.style.lineHeight = '';
		el.style.wordBreak = '';
	}

	adjustFontSize(maxFontSize, minFontSize);

	return {
		update(newOptions: DynamicFontSizeOptions) {
			const { maxFontSize = 100, minFontSize = 1 } = newOptions || {};
			adjustFontSize(maxFontSize, minFontSize);
		}
	};
}
