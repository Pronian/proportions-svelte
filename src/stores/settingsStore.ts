import { createWritableLS } from './writableLocalStorage';
import { type ColorTheme, defaultCustomColors } from '../util/colors';

function getThemePreference(): ColorTheme {
	const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	return isDark ? 'dark' : 'light';
}

interface SettingsModel {
	theme: ColorTheme;
	customThemeColors: typeof defaultCustomColors;
	roundingDigits: number;
}

const initialSettings: SettingsModel = {
	theme: getThemePreference(),
	customThemeColors: defaultCustomColors,
	roundingDigits: 3
};

export const settingsStore = createWritableLS('settings', initialSettings, 1500);
