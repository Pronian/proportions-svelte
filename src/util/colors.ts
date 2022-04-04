import chroma from 'chroma-js';

export type ColorTheme = 'dark' | 'light' | 'custom';

const styleSheet = document.styleSheets[0];
const colorRuleIndex = styleSheet.cssRules.length;

/* Dark Theme:
--eerie-black: #1c1c21ff;
--carolina-blue: #4ea5d9ff;
--raw-sienna: #ea8c55ff;
--forest-green-crayola: #63a375ff;
--ghost-white: #f4f4f9ff

https://coolors.co/1c1c21-4ea5d9-ea8c55-63a375-f4f4f9
*/

export const darkThemeColors = {
	'bg-color': '#1c1c21',
	'primary-color': '#4ea6da',
	'secondary-color': '#ea8c55',
	'text-color': '#e8e8f2'
};

/* Light Theme:
--cultured: #f1f1f4ff;
--carolina-blue: #359ad4ff;
--raw-sienna: #ea8c55ff;
--forest-green-crayola: #63a375ff;
--rich-black-fogra-39: #09090bff;

https://coolors.co/f1f1f4-359ad4-ea8c55-63a375-09090b
*/

export const lightThemeColors = {
	'bg-color': '#f1f1f4',
	'primary-color': '#359ad4',
	'secondary-color': '#ea8c55',
	'text-color': '#09090b'
};

// https://coolors.co/201e1f-ff5666-edae49-00798c-f4f4f9

export const defaultCustomColors = {
	'bg-color': '#201e1f',
	'primary-color': '#ff5666',
	'secondary-color': '#edae49',
	'text-color': '#f4f4f9'
};

function generateAlphaColorProps(colorName: string, colorValue: string): string[] {
	const result: string[] = [];
	const color = chroma(colorValue);
	for (let i = 1; i < 10; i++) {
		const alphaColor = color.alpha(i / 10).css();
		result.push(`--${colorName}-alpha-${i * 10}: ${alphaColor}`);
	}

	return result;
}

function generateDarkLightColorProps(
	colorName: string,
	colorValue: string,
	isDark: boolean
): string[] {
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

function generateMixColorProps(
	colorName: string,
	colorPostfix: string,
	colorStartValue: string,
	colorEndValue: string
): string[] {
	const result: string[] = [];
	for (let i = 1; i < 100; i++) {
		const paddedStep = i.toString().padStart(2, '0');
		const mixColor = chroma.mix(colorStartValue, colorEndValue, i / 100).css();
		result.push(`--${colorName}-${colorPostfix}-${paddedStep}: ${mixColor}`);
	}
	return result;
}

export function generateAppColors(
	themeName: ColorTheme,
	customThemeColors: typeof defaultCustomColors
) {
	const allThemeColors = {
		dark: darkThemeColors,
		light: lightThemeColors,
		custom: customThemeColors
	};
	const themeColors = allThemeColors[themeName];

	const properties: string[] = [];

	const isThemeDark = chroma(themeColors['bg-color']).luminance() < 0.5;

	for (const [name, value] of Object.entries(themeColors)) {
		properties.push(`--${name}: ${value}`);
		properties.push(...generateAlphaColorProps(name, value));

		if (name === 'bg-color' || name === 'text-color') {
			properties.push(...generateDarkLightColorProps(name, value, isThemeDark));
		} else {
			properties.push(
				...generateMixColorProps(name, 'highlight', value, themeColors['text-color'])
			);
			properties.push(...generateMixColorProps(name, 'conceal', value, themeColors['bg-color']));
		}
	}

	if (styleSheet.cssRules.length > colorRuleIndex) {
		styleSheet.deleteRule(colorRuleIndex);
	}
	styleSheet.insertRule(`:root{${properties.join(';')}}`, colorRuleIndex);
}
