import { GraphQLUpload } from "graphql-upload";
import { builder } from "src/graphql/builder";

// TODO: fix the typecasting
builder.scalarType("Date", {
    serialize: (value) => {
        return new Date(value as string | number | Date);
    },
    parseValue: (value) => {
        return new Date(value as string | number | Date);
    },
});

builder.scalarType("Upload", {
    serialize: GraphQLUpload.serialize,
    parseValue: GraphQLUpload.parseValue,
});
