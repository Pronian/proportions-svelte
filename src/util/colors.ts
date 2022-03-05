import chroma from 'chroma-js';

export type ColorTheme = 'dark' | 'light';

const styleSheet = document.styleSheets[0];
const colorRuleIndex = styleSheet.cssRules.length;

export function generateAlphaColors(colorVarNames: string[]) {
	const computedStyle = window.getComputedStyle(document.documentElement);

	const properties: string[] = [];

	for (const colorVarName of colorVarNames) {
		const color = chroma(computedStyle.getPropertyValue(colorVarName).trim());

		for (let i = 1; i < 10; i++) {
			properties.push(`${colorVarName}-a${i}: ${color.alpha(0.1 * i).css()}`);
		}
	}

	styleSheet.insertRule(`:root{${properties.join(';')}}`, colorRuleIndex);
}
