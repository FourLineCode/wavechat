import { builder } from '../builder';

builder.scalarType('Date', {
	serialize: (value) => {
		return new Date(value);
	},
	parseValue: (value) => {
		return new Date(value);
	},
});
