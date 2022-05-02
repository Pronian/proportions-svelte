interface DynamicFontSizeOptions {
	maxFontSize?: number;
	minFontSize?: number;
	minHeight?: number;
}

/**
 * Reduces the font size of the given element until its text fits on one line.
 * @param el - the element to reduce the font size of
 * @param options.maxFontSize - the maximum font size that the element can have
 * @param options.minFontSize - the minimum font size that the element can have
 * @param options.minHeight - when provided, the element height will be increased to this value.
 * The padding will scale proportionally to achieve this.
 */
export function dynamicFontSize(el: HTMLElement, options?: DynamicFontSizeOptions) {
	function adjustFontSize(options?: DynamicFontSizeOptions) {
		const { maxFontSize = 100, minFontSize = 5, minHeight = 0 } = options || {};
		let fontSize = maxFontSize;

		el.style.lineHeight = '1';
		el.style.wordBreak = 'break-all';
		const style = getComputedStyle(el);
		const paddingRatio =
			parseFloat(style.paddingTop) /
			(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
		const paddingVertical = parseInt(style.paddingTop) + parseInt(style.paddingBottom);
		let realTextHeight = el.clientHeight - paddingVertical;

		while (realTextHeight > fontSize && fontSize > minFontSize) {
			fontSize -= 0.5;
			el.style.fontSize = `${fontSize}px`;
			realTextHeight = el.clientHeight - paddingVertical;
		}

		el.style.lineHeight = '';
		el.style.wordBreak = '';

		if (minHeight && minHeight > el.clientHeight) {
			el.style.paddingTop = '0';
			el.style.paddingBottom = '0';

			const additionalPadding = minHeight - el.clientHeight;
			el.style.paddingTop = `${additionalPadding * paddingRatio}px`;
			el.style.paddingBottom = `${additionalPadding * (1 - paddingRatio)}px`;
		}
	}

	adjustFontSize(options);

	return {
		update(newOptions: DynamicFontSizeOptions) {
			adjustFontSize(newOptions);
		}
	};
}
