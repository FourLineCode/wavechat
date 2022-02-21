import { GraphQLScalarValueParser } from "graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { builder } from "src/graphql/builder";

builder.scalarType("Date", {
    serialize: (value) => new Date(value),
    parseValue: (value) => new Date(value as string | number | Date),
});

builder.scalarType("Upload", {
    serialize: GraphQLUpload.serialize,
    parseValue: GraphQLUpload.parseValue as GraphQLScalarValueParser<Promise<FileUpload>>,
});
