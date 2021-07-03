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
		public: true,
		user: context.authorized,
		admin: !!context.admin,
	}),
});

builder.queryType({});
builder.mutationType({});
