import { ObjectRef } from '@giraphql/core';
import { GraphQLUpload } from 'graphql-upload';
import { builder } from 'src/graphql/builder';
import { services } from 'src/services';
import { File, UploadResponse } from 'src/services/media.service';

builder.scalarType('Upload', {
	serialize: GraphQLUpload.serialize,
	parseValue: GraphQLUpload.parseValue,
});

export const FileObject: ObjectRef<File, File> = builder.objectRef<File>('File').implement({
	name: 'File',
	description: 'File upload object',
	fields: (t) => ({
		filename: t.exposeString('filename'),
		mimetype: t.exposeString('mimetype'),
		encoding: t.exposeString('encoding'),
	}),
});

export const UploadResponseObject: ObjectRef<UploadResponse, UploadResponse> = builder
	.objectRef<UploadResponse>('UploadResponse')
	.implement({
		name: 'UploadResponse',
		description: 'Response object for file upload',
		fields: (t) => ({
			url: t.exposeString('url'),
			file: t.field({ type: FileObject, resolve: (parent) => parent.file }),
		}),
	});

builder.mutationField('uploadSingleFile', (t) =>
	t.field({
		type: UploadResponseObject,
		description: 'Upload single file',
		authScopes: { user: true },
		args: { file: t.arg({ type: 'Upload', required: true }) },
		resolve: async (_parent, { file }) => {
			return await services.media.uploadSingleFile(file);
		},
	})
);

builder.mutationField('uploadMultipleFiles', (t) =>
	t.field({
		type: [UploadResponseObject],
		description: 'Upload single file',
		authScopes: { user: true },
		args: { files: t.arg({ type: ['Upload'], required: true }) },
		resolve: async (_parent, { files }) => {
			return await services.media.uploadMultipleFiles(files);
		},
	})
);
