export interface SVGObj {
	attrs: { [key: string]: string };
	body: string;
}

function attrsToObj(attrs: string): { [key: string]: string } {
	const obj: { [key: string]: string } = {};

	for (const attr of attrs.replace(/"\s*$/, '').split('" ')) {
		const [key, value] = attr.trim().split('="');

		obj[key] = value.trim();
	}

	return obj;
}

const defaultAttrs = attrsToObj('fill="none" viewBox="0 0 24 24" stroke="currentColor"');

export const arrowNarrowRight: SVGObj = {
	attrs: defaultAttrs,
	body: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>'
};

export const refresh: SVGObj = {
	attrs: defaultAttrs,
	body: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>'
};

export const cogSolid: SVGObj = {
	attrs: attrsToObj('fill="none" viewBox="0 0 20 20" stroke="currentColor"'),
	body: '<path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>'
};

export const cross: SVGObj = {
	attrs: attrsToObj('fill="currentColor" viewBox="0 0 20 20"'),
	body: '<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>'
};

export const plus: SVGObj = {
	attrs: attrsToObj('fill="currentColor" viewBox="0 0 20 20"'),
	body: `<path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>`
};
