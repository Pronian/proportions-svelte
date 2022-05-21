import { cubicInOut } from 'svelte/easing';

export function sideSlide(
	node: HTMLElement,
	options: {
		isEnabled?: boolean;
		duration?: number;
		delay?: number;
		easing?: typeof cubicInOut;
		side?: 'left' | 'right';
		isAbsolute?: boolean;
	}
) {
	const {
		isEnabled = true,
		duration = 400,
		delay = 0,
		easing = cubicInOut,
		side = 'left',
		isAbsolute = true
	} = options;
	const directionModifier = side === 'left' ? -1 : 1;

	if (!isEnabled) {
		return {};
	}

	return {
		delay,
		duration,
		easing,
		css: (_t: number, u: number) => {
			if (isAbsolute) {
				return `transform: translateX(${node.clientWidth * u * directionModifier}px);`;
			} else {
				return `margin-${side}: -${node.clientWidth * u}px;`;
			}
		}
	};
}
