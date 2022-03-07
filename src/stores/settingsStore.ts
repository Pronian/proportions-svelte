import { createWritableLS } from './writableLocalStorage';
import type { ColorTheme } from '../util/colors';

function getThemePreference(): ColorTheme {
	const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	return isDark ? 'dark' : 'light';
}

interface SettingsModel {
	theme: ColorTheme;
	roundingDigits: number;
}

const initialSettings: SettingsModel = {
	theme: getThemePreference(),
	roundingDigits: 3
};

export const settingsStore = createWritableLS('settings', initialSettings, 1500);
