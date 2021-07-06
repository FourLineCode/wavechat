import SchemaBuilder from '@giraphql/core';
import DataloaderPlugin from '@giraphql/plugin-dataloader';
import ScopeAuthPlugin from '@giraphql/plugin-scope-auth';
import ValidationPlugin from '@giraphql/plugin-validation';
import { Context } from './context';

export const builder = new SchemaBuilder<{
	Context: Context;
	Scalars: {
		Date: {
			Input: Date;
			Output: Date;
		};
	};
	AuthScopes: {
		public: boolean;
		user: boolean;
		admin: boolean;
	};
}>({
	plugins: [ScopeAuthPlugin, DataloaderPlugin, ValidationPlugin],
	authScopes: async (context) => ({
		// TODO: make public based on csrf token validity
		public: context.public,
		user: context.authorized,
		admin: !!context.admin,
	}),
});

builder.queryType({
	authScopes: {
		public: true,
	},
	// TODO: temporary
	fields: (t) => ({
		hello: t.string({
			args: { name: t.arg({ type: 'String', required: false }) },
			resolve: (_parent, { name }) => (name ? `Hello, ${name}` : 'Hello World!'),
		}),
	}),
});

builder.mutationType({
	authScopes: {
		public: true,
	},
});
