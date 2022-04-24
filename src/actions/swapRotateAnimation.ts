import { createStyleMemo } from '../util/styleMemo';

export function createSwapAnimation(options?: {
	duration?: number;
	easingCSS?: string;
	verticalOriginOffset?: number;
}) {
	const { duration = 500, easingCSS = 'ease-in-out', verticalOriginOffset = 0 } = options || {};

	const transitionString = `transform ${duration}ms ${easingCSS}`;
	const { setStyle, restoreStyles } = createStyleMemo();

	let isAnimating = false;
	let timeout: ReturnType<typeof setTimeout>;
	let leftElement: HTMLElement;
	let leftChildElement: HTMLElement;
	let rightElement: HTMLElement;
	let rightChildElement: HTMLElement;
	let verticalCenter: number;

	function updateTransitionStyles(
		node: HTMLElement,
		transformOriginX: number = 0,
		rotationDeg: number = 0
	) {
		setStyle(node, 'transform', `rotate(${rotationDeg}deg)`);
		const transformOriginValue =
			transformOriginX !== 0
				? `${transformOriginX}px ${verticalCenter}px`
				: `center ${verticalCenter}px`;
		setStyle(node, 'transform-origin', transformOriginValue);
		setStyle(node, 'transition', transitionString);
	}

	function hideDocumentOverflow() {
		const docEl = document.documentElement;
		const hasXScrollbar = docEl.scrollWidth > docEl.clientWidth;
		const hasYScrollbar = docEl.scrollHeight > docEl.clientHeight;
		setStyle(docEl, 'overflow-x', hasXScrollbar ? '' : 'hidden');
		setStyle(docEl, 'overflow-y', hasYScrollbar ? '' : 'hidden');
	}

	function triggerAnimation(onCompleteCallback = () => {}) {
		if (isAnimating) {
			clearTimeout(timeout);
			restoreStyles(leftElement, leftChildElement, rightElement, rightChildElement);
			isAnimating = false;
		}

		if (leftElement && leftChildElement && rightElement && rightChildElement) {
			verticalCenter = leftElement.offsetHeight / 2 + verticalOriginOffset;
			const fullHorizontalSpace =
				rightElement.getBoundingClientRect().right - leftElement.getBoundingClientRect().left;
			const xCenter = fullHorizontalSpace / 2;
			const xCenterAccordingRightElement = rightElement.offsetWidth - xCenter;

			hideDocumentOverflow();

			updateTransitionStyles(leftElement, xCenter, 180);
			updateTransitionStyles(leftChildElement, 0, -180);

			updateTransitionStyles(rightElement, xCenterAccordingRightElement, 180);
			updateTransitionStyles(rightChildElement, 0, -180);

			isAnimating = true;

			timeout = setTimeout(() => {
				restoreStyles(
					leftElement,
					leftChildElement,
					rightElement,
					rightChildElement,
					document.documentElement
				);
				isAnimating = false;
				onCompleteCallback();
			}, duration);
		}
	}

	function actionRotateRight(node: HTMLElement) {
		if (node.firstElementChild instanceof HTMLElement === false) return;
		leftElement = node;
		leftChildElement = node.firstElementChild as HTMLElement;
	}

	function actionRotateLeft(node: HTMLElement) {
		if (node.firstElementChild instanceof HTMLElement === false) return;
		rightElement = node;
		rightChildElement = node.firstElementChild as HTMLElement;
	}

	return {
		triggerAnimation,
		actionRotateRight,
		actionRotateLeft
	};
}
