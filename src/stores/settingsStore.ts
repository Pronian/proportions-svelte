import { createWritableLS } from './writableLocalStorage';

function getThemePreference(): 'dark' | 'light' {
	const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	return isDark ? 'dark' : 'light';
}

interface SettingsModel {
	theme: 'dark' | 'light';
	roundingDigits: number;
}

const initialSettings: SettingsModel = {
	theme: getThemePreference(),
	roundingDigits: 3
};

export const settingsStore = createWritableLS('settings', initialSettings);
