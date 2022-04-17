import { getUuidV4 } from '../util/uuid';
import { roundIfNeeded } from '../util/number';
import { createWritableLS } from './writableLocalStorage';

export interface ExpressionValues {
	expression: string;
	computed: number;
}

export interface ExpressionValuesWithId extends ExpressionValues {
	id: string;
}

export interface ProportionModel {
	a: ExpressionValues;
	b: ExpressionValues;
	c: ExpressionValues;
	cArr: ExpressionValuesWithId[];
}

const initialStore: ProportionModel = {
	a: {
		computed: 1,
		expression: ''
	},
	b: {
		computed: 1,
		expression: ''
	},
	c: {
		computed: 1,
		expression: ''
	},
	cArr: []
};

const store = createWritableLS('proportionModel', initialStore, 3000);

/**
 * Gets the result of the proportion calculation, formatted and accounting for errors.
 * @param roundingDigits - the number of digits to round to
 * @param cArrId - if the ID of the cArr element is provided, the result will be calculated from the cArr element
 * @returns the result of the calculation or an error message
 */
function getResult(roundingDigits: number, cArrId?: string) {
	const { a, b, c, cArr } = store.get();

	if (a.computed === 0) {
		return "Can't divide by zero";
	}

	if (a.expression === '' || b.expression === '' || c.expression === '') {
		return 'Fill values for result';
	}

	let result: number | undefined = undefined;
	let cArrValue: ExpressionValuesWithId | undefined = undefined;

	if (cArrId) {
		cArrValue = cArr.find((cArrItem) => cArrItem.id === cArrId);
	}

	if (cArrId && cArrValue) {
		result = roundIfNeeded((cArrValue.computed * b.computed) / a.computed, roundingDigits);
	} else {
		result = roundIfNeeded((c.computed * b.computed) / a.computed, roundingDigits);
	}

	return result.toString();
}

/**
 * Inverts the ratio of the proportion and swaps the result values with the input values.
 * @param roundingDigits - the number of digits to round to
 */
function swap(roundingDigits: number) {
	const storeValue = store.get();

	// Result values need to be computed first,
	// otherwise information will be lost when the values are swapped
	for (const cItem of storeValue.cArr) {
		cItem.expression = getResult(roundingDigits, cItem.id);
	}

	storeValue.c.expression = getResult(roundingDigits);
	const temp = storeValue.b;
	storeValue.b = storeValue.a;
	storeValue.a = temp;

	store.set(storeValue);
}

/**
 * Adds a new C proportion to the cArr array.
 */
function addCProp() {
	const storeValue = store.get();

	let lastValue: number;
	if (storeValue.cArr.length > 0) {
		lastValue = storeValue.cArr[storeValue.cArr.length - 1].computed;
	} else {
		lastValue = storeValue.c.computed;
	}

	storeValue.cArr.push({
		id: getUuidV4(),
		computed: lastValue + 1,
		expression: ''
	});

	store.set(storeValue);
}

export const proportionStore = {
	...store,
	getResult,
	swap,
	addCProp
};
