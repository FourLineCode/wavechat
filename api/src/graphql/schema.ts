import fs from 'fs';
import { lexicographicSortSchema, printSchema } from 'graphql';
import path from 'path';
import { builder } from 'src/graphql/builder';
import 'src/graphql/resolvers';

// Convert builder data to graphql schema
export const schema = builder.toSchema({});

/* Write the schema as string to a schema.graphql file */
const schemaAsString = printSchema(lexicographicSortSchema(schema));

const filePath = './src/graphql/__generated__';
if (!fs.existsSync(filePath)) {
	fs.mkdirSync(filePath);
}

fs.writeFileSync(path.join(filePath, 'schema.graphql'), schemaAsString);
