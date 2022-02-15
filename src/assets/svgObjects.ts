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

export const arrowNarrowRight: SVGObj = {
    attrs: attrsToObj('fill="none" viewBox="0 0 24 24" stroke="currentColor"'),
    body: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>'
}
