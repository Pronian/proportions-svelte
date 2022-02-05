import chroma from 'chroma-js';

export function generateAlphaColors(colorVarNames: string[]) {
    const computedStyle = window.getComputedStyle(document.documentElement);

    for (const colorVarName of colorVarNames) { 
        const color = chroma(computedStyle.getPropertyValue(colorVarName).trim());

        for (let i = 1; i < 10; i++) {
            document.documentElement.style.setProperty(`${colorVarName}-a${i}`, `${color.alpha(0.1 * i).css()}`);
        }
    }
}