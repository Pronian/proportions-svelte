import { cubicInOut } from 'svelte/easing';

export function sideSlide(
	node: HTMLElement,
	options: {
		duration?: number;
		delay?: number;
		easing?: typeof cubicInOut;
		side?: 'left' | 'right';
	}
) {
	const { duration = 400, delay = 0, easing = cubicInOut, side = 'left' } = options;
	const directionModifier = side === 'left' ? -1 : 1;
	return {
		delay,
		duration,
		easing,
		css: (_t: number, u: number) => {
			return `transform: translateX(${node.clientWidth * u * directionModifier}px);`;
		}
	};
}
