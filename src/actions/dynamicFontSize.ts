interface DynamicFontSizeOptions {
	maxFontSize?: number;
	minFontSize?: number;
	minHeight?: number;
}

const dynamicFontSizeSubscribers: (() => void)[] = [];

let previousBodyWidth = 0;
const resizeObserver = new ResizeObserver((entries) => {
	const bodyWidth = entries[0].contentRect.width;

	if (bodyWidth !== previousBodyWidth) {
		previousBodyWidth = bodyWidth;
		for (const subscriber of dynamicFontSizeSubscribers) {
			subscriber();
		}
	}
});

function addDynamicFontSizeSubscriber(subscriber: () => void) {
	if (dynamicFontSizeSubscribers.length === 0) {
		resizeObserver.observe(document.body);
	}

	dynamicFontSizeSubscribers.push(subscriber);
}

function removeDynamicFontSizeSubscriber(subscriber: () => void) {
	const index = dynamicFontSizeSubscribers.indexOf(subscriber);

	if (index > -1) {
		dynamicFontSizeSubscribers.splice(index, 1);
	}

	if (dynamicFontSizeSubscribers.length === 0) {
		resizeObserver.unobserve(document.body);
	}
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
	const resizeCallback = () => {
		adjustFontSize(options);
	};

	addDynamicFontSizeSubscriber(resizeCallback);

	function adjustFontSize(options?: DynamicFontSizeOptions) {
		const { maxFontSize = 100, minFontSize = 5, minHeight = 0 } = options || {};
		let fontSize = maxFontSize;

		el.style.lineHeight = '1';
		el.style.wordBreak = 'break-all';
		el.style.fontSize = `${fontSize}px`;
		const style = getComputedStyle(el);
		const paddingRatio =
			parseFloat(style.paddingTop) /
			(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
		const paddingVertical = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
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
			options = newOptions;
			adjustFontSize(newOptions);
		},
		destroy() {
			removeDynamicFontSizeSubscriber(resizeCallback);
		}
	};
}
