import { builder } from '../builder';

builder.queryType({
	fields: (t) => ({
		hello: t.string({
			args: {
				name: t.arg.string(),
			},
			resolve: (_parent, { name }) => `hello, ${name || 'World'}`,
		}),
	}),
});
