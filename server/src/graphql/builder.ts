import SchemaBuilder from '@giraphql/core';
import { Context } from './context';

export const builder = new SchemaBuilder<{
	Context: Context;
	Scalars: {
		Date: {
			Input: Date;
			Output: Date;
		};
	};
}>({});

builder.queryType({});
