export function evaluateNumberExpression(value: string): number | undefined {
    let result: number | undefined = undefined;

    try {
        let fn = new Function(`return ${value};`);
        let computedValue = fn();
        if (typeof computedValue === 'number' && Number.isFinite(computedValue)) {
            result = computedValue;
        } else {
            result = undefined;
        }
    } catch (error) {
        result = undefined;
    }

    return result;
}