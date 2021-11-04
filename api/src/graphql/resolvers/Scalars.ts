import { builder } from 'src/graphql/builder';

// TODO: fix the typecasting
builder.scalarType('Date', {
	serialize: (value) => {
		return new Date(value as string | number | Date);
	},
	parseValue: (value) => {
		return new Date(value as string | number | Date);
	},
});
