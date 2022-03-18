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

const darkThemeColors = {
	'bg-color': '#151519',
	'primary-color': '#4ea6da',
	'secondary-color': '#ea8c55',
	'text-color': '#e8e8f2',
}

/* Light Theme:
--cultured: #f4f4f6ff;
--carolina-blue: #359ad4ff;
--raw-sienna: #ea8c55ff;
--forest-green-crayola: #63a375ff;
--rich-black-fogra-39: #09090bff;

https://coolors.co/f4f4f6-359ad4-ea8c55-63a375-09090b
*/

const lightThemeColors = {
	'bg-color': '#F4F4F6',
	'primary-color': '#359AD4',
	'secondary-color': '#EA8C55',
	'text-color': '#09090B',
};

function generateAlphaColorProps(colorName: string, colorValue: string): string[] {
	const result: string[] = [];
	const color = chroma(colorValue);
	for (let i = 1; i < 10; i++) {
		const alphaColor = color.alpha(i/10).css();
		result.push(`--${colorName}-alpha-${i * 10}: ${alphaColor}`);
	}

	return result;
}

function generateDarkLightColorProps(colorName: string, colorValue: string, isDark: boolean): string[] {
	const result: string[] = [];
	const color = chroma(colorValue);
	const highlighColorFn = isDark ? 'brighten' : 'darken';
	const concealColorFn = isDark ? 'darken' : 'brighten';
	for (let i = 0; i < 100; i++) {
		const paddedStep = i.toString().padStart(2, '0');
		const highlighColor = color[highlighColorFn](i / 100).css();
		const concealColor = color[concealColorFn](i / 100).css();
		result.push(`--${colorName}-highlight-${paddedStep}: ${highlighColor}`);
		result.push(`--${colorName}-conceal-${paddedStep}: ${concealColor}`);
	}
	return result;
}

function generateMixColorProps(colorName: string, colorPostfix: string, colorStartValue: string, colorEndValue: string): string[] {
	const result: string[] = [];
	for (let i = 1; i < 100; i++) {
		const paddedStep = i.toString().padStart(2, '0');
		const mixColor = chroma.mix(colorStartValue, colorEndValue, i / 100).css();
		result.push(`--${colorName}-${colorPostfix}-${paddedStep}: ${mixColor}`);
	}
	return result;
}

export function generateAppColors(themeName: ColorTheme) {
	const themeColors = themeName === 'dark' ? darkThemeColors : lightThemeColors;
	const properties: string[] = [];

	const isThemeDark = chroma(themeColors['bg-color']).luminance() < 0.5;

	for (const [name, value] of Object.entries(themeColors)) {
		properties.push(`--${name}: ${value}`);
		properties.push(...generateAlphaColorProps(name, value));

		if (name === 'bg-color' || name === 'text-color') {
			properties.push(...generateDarkLightColorProps(name, value, isThemeDark));
		} else {
			properties.push(...generateMixColorProps(name, 'highlight', value, themeColors['text-color']));
			properties.push(...generateMixColorProps(name, 'conceal', value, themeColors['bg-color']));
		}
	}

	if (styleSheet.cssRules.length > colorRuleIndex) {
		styleSheet.deleteRule(colorRuleIndex);
	}
	styleSheet.insertRule(`:root{${properties.join(';')}}`, colorRuleIndex);
}
