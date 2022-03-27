import { createStyleMemo } from '../util/styleMemo';
import type { SvelteAction } from '../types/action';

type TransitionCallback = (isStart: boolean, isIntro: boolean) => void;

/**
 * Calls a function when a Svelte transition is about to start or end.
 * @param node - The node to watch for transitions on.
 * @param callback - The function to call. The first parameter is true when the transition is about to start, false when it is about to end. The second parameter is true when the transition is an intro, false when it is an outro.
 */
export const transitionCallback: SvelteAction<TransitionCallback> = function (
	node: HTMLElement,
	callback
) {
	let startInto = () => {
		callback(true, true);
	};
	let endIntro = () => {
		callback(false, true);
	};
	let startOutro = () => {
		callback(true, false);
	};
	let endOutro = () => {
		callback(false, false);
	};

	function setListeners(add: boolean) {
		const action = add ? 'addEventListener' : 'removeEventListener';
		node[action]('introstart', startInto);
		node[action]('introend', endIntro);
		node[action]('outrostart', startOutro);
		node[action]('outroend', endOutro);
	}

	setListeners(true);

	return {
		update(newCallback) {
			setListeners(false);
			startInto = () => {
				newCallback(true, true);
			};
			endIntro = () => {
				newCallback(false, true);
			};
			startOutro = () => {
				newCallback(true, false);
			};
			endOutro = () => {
				newCallback(false, false);
			};
			setListeners(true);
		},
		destroy() {
			setListeners(false);
		}
	};
};

/**
 * An action that applies CSS styles while a svelte transition is playing.
 * @param node - The node to use for tracking the transition.
 * @param options.element - The element to apply the styles to.
 * @param options.styles - An object whose keys are kebab case CSS properties and values are CSS values. These styles will be applied during the transition and cleared when the transition ends.
 */
export const stylesDuringTransition: SvelteAction<{
	element: HTMLElement;
	styles: { [key: string]: string };
}> = function (node: HTMLElement, { element, styles }) {
	const { setStyle, restoreStyles } = createStyleMemo();
	const callbackAction = transitionCallback(node, (isStart) => {
		if (isStart) {
			for (const [key, value] of Object.entries(styles)) {
				setStyle(element, key, value);
			}
		} else {
			restoreStyles(element);
		}
	});

	return {
		update({ element, styles }) {
			callbackAction.destroy?.();
			restoreStyles();

			callbackAction.update?.((isStart) => {
				if (isStart) {
					for (const [key, value] of Object.entries(styles)) {
						setStyle(element, key, value);
					}
				} else {
					restoreStyles(element);
				}
			});
		},
		destroy() {
			callbackAction.destroy?.();
			restoreStyles();
		}
	};
};
