import chroma from 'chroma-js';

export type ColorTheme = 'dark' | 'light';

const styleSheet = document.styleSheets[0];
const colorRuleIndex = styleSheet.cssRules.length;

/* Dark Theme:
--eerie-black: #151519ff;
--carolina-blue: #4ea5d9ff;
--raw-sienna: #ea8c55ff;
--forest-green-crayola: #63a375ff;
--ghost-white: #f4f4f9ff

https://coolors.co/151519-4ea5d9-ea8c55-63a375-f4f4f9
*/

const darkThemeColors = [
	['bg-color', '#151519'],
	['primary-color', '#4ea6da'],
	['secondary-color', '#ea8c55'],
	['text-color', '#e8e8f2']
];

/* Light Theme:
--cultured: #f4f4f6ff;
--carolina-blue: #359ad4ff;
--raw-sienna: #ea8c55ff;
--forest-green-crayola: #63a375ff;
--rich-black-fogra-39: #09090bff;

https://coolors.co/f4f4f6-359ad4-ea8c55-63a375-09090b
*/

const lightThemeColors = [
	['bg-color', '#F4F4F6'],
	['primary-color', '#359AD4'],
	['secondary-color', '#EA8C55'],
	['text-color', '#09090B']
];

export function generateAppColors(themeName: ColorTheme) {
	const themeColors = themeName === 'dark' ? darkThemeColors : lightThemeColors;
	const properties: string[] = [];

	for (const [name, value] of themeColors) {
		properties.push(`--${name}: ${value}`);

		const color = chroma(value);

		for (let i = 1; i < 10; i++) {
			properties.push(`--${name}-a${i}: ${color.alpha(0.1 * i).css()}`);
		}
	}

	if (styleSheet.cssRules.length > colorRuleIndex) {
		styleSheet.deleteRule(colorRuleIndex);
	}
	styleSheet.insertRule(`:root{${properties.join(';')}}`, colorRuleIndex);
}
