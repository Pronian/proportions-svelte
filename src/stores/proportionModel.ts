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
export const proportionStore = store;
