import fs from 'fs';
import { lexicographicSortSchema, printSchema } from 'graphql';
import path from 'path';
import { builder } from './builder';
import './resolvers';

export const schema = builder.toSchema({});

const schemaAsString = printSchema(lexicographicSortSchema(schema));

const filePath = './src/graphql/__generated__';
if (!fs.existsSync(filePath)) {
	fs.mkdirSync(filePath);
}

fs.writeFileSync(path.join(filePath, 'schema.graphql'), schemaAsString);
