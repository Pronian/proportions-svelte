export interface ExpressionValues {
	expression: string;
	computed: number;
}

export interface ProportionModel {
	a: ExpressionValues;
	b: ExpressionValues;
	c: ExpressionValues;
	cArr: ExpressionValues[];
}
