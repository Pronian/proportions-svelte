import { writable } from 'svelte/store';

const currentState = { isMenuOpen: false, areSettingsOpen: false };
const { subscribe, set } = writable(currentState);

export const uiState = {
	subscribe,
	toggleMenu(open?: boolean) {
		currentState.isMenuOpen = open ?? !currentState.isMenuOpen;
		if (currentState.isMenuOpen) currentState.areSettingsOpen = false;

		set(currentState);
	},
	toggleSettings(open?: boolean) {
		currentState.areSettingsOpen = open ?? !currentState.areSettingsOpen;
		if (currentState.areSettingsOpen) currentState.isMenuOpen = false;

		set(currentState);
	}
};
