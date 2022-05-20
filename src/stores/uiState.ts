import { writable } from 'svelte/store';

const currentState = {
	isMenuOpen: false,
	isMenuStatic: false,
	areSettingsOpen: false
};

const { subscribe, set } = writable(currentState);

export const uiState = {
	subscribe,
	setMenuStatic: (isStatic: boolean) => {
		currentState.isMenuStatic = isStatic;

		if (!isStatic && currentState.isMenuOpen && currentState.areSettingsOpen) {
			currentState.isMenuOpen = false;
		}

		// Needs to be executed outside of the event scope from which this method is called.
		queueMicrotask(() => set(currentState));
	},
	toggleMenu(open?: boolean) {
		currentState.isMenuOpen = open ?? !currentState.isMenuOpen;
		if (currentState.isMenuOpen && !currentState.isMenuStatic) currentState.areSettingsOpen = false;

		set(currentState);
	},
	toggleSettings(open?: boolean) {
		currentState.areSettingsOpen = open ?? !currentState.areSettingsOpen;
		if (currentState.areSettingsOpen && !currentState.isMenuStatic) currentState.isMenuOpen = false;

		set(currentState);
	}
};
