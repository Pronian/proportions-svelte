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
