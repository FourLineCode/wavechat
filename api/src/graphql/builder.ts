import SchemaBuilder from "@pothos/core";
import DataloaderPlugin from "@pothos/plugin-dataloader";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import ValidationPlugin from "@pothos/plugin-validation";
import { FileUpload } from "graphql-upload";
import { Context } from "src/graphql/context";

// GraphQL schema builder by Pothos plugin
export const builder = new SchemaBuilder<{
    Context: Context;
    Scalars: {
        Date: {
            Input: Date;
            Output: Date;
        };
        Upload: {
            Input: Promise<FileUpload>;
            Output: FileUpload;
        };
    };
    AuthScopes: {
        public: boolean;
        user: boolean;
        admin: boolean;
        internal: boolean;
    };
}>({
    plugins: [ScopeAuthPlugin, DataloaderPlugin, ValidationPlugin],
    authScopes: async (context) => ({
        // TODO: make public based on csrf token validity
        public: context.public,
        user: context.authorized,
        admin: context.admin,
        internal: context.internal,
    }),
});

// Define the default query type on the schema (required)
builder.queryType({
    authScopes: {
        public: true,
    },
    // TODO: temporary
    fields: (t) => ({
        hello: t.string({
            args: { name: t.arg({ type: "String", required: false }) },
            resolve: (_parent, { name }) => (name ? `Hello, ${name}` : "Hello World!"),
        }),
    }),
});

// Define the default mutation type on the schema (required)
builder.mutationType({
    authScopes: {
        public: true,
    },
});
