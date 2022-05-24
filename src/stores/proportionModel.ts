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
	starred: boolean;
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
	cArr: [],
	starred: false
};

const store = createWritableLS('proportionModel', initialStore, 3000);
let roundingDigits = 3;

/**
 * Gets the result of the proportion calculation, formatted and accounting for errors.
 * @param cArrId - if the ID of the cArr element is provided, the result will be calculated from the cArr element
 * @param overwriteError - when a string is provided, it will be used as the error message instead of the default
 * @returns the result of the calculation or an error message
 */
function getResult(cArrId?: string, overwriteError?: string) {
	const { a, b, c, cArr } = store.get();

	if (a.computed === 0) {
		return overwriteError || "Can't divide by zero";
	}

	if (a.expression === '' || b.expression === '' || c.expression === '') {
		return overwriteError || 'Fill values for result';
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
 */
function swap() {
	const storeValue = store.get();

	// Result values need to be computed first,
	// otherwise information will be lost when the values are swapped
	for (const cItem of storeValue.cArr) {
		cItem.expression = getResult(cItem.id);
	}

	storeValue.c.expression = getResult();
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

/**
 * Updates the value of the cArr element with the given ID.
 * @param id - the id of the cArr element to update
 * @param newValues - the new values to set
 */
function updateCProp(id: string, newValues: ExpressionValues) {
	const storeValue = store.get();

	const index = storeValue.cArr.findIndex((c) => c.id === id);

	if (index > -1) {
		storeValue.cArr[index] = { ...newValues, id };
		store.set(storeValue);
	}
}

function deleteCProp(id: string) {
	const storeValue = store.get();

	const index = storeValue.cArr.findIndex((c) => c.id === id);

	if (index > -1) {
		storeValue.cArr.splice(index, 1);
		store.set(storeValue);
	}
}

/**
 * Updates the rounding the store uses for calculations.
 * @param newRoundingDigits - the new number of digits to round to
 */
function updateRounding(newRoundingDigits: number) {
	roundingDigits = newRoundingDigits;
	// Notify subscribers that the store has updated, so that they can update
	// their values
	store.update((storeValue) => storeValue);
}

export const proportionStore = {
	...store,
	getResult,
	swap,
	addCProp,
	updateCProp,
	deleteCProp,
	updateRounding
};
