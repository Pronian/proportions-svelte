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

export const proportionStore = {
	...store,
	getResult
};
