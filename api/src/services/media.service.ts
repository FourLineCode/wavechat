import { FileUpload } from 'graphql-upload';
import { getS3Client } from 'src/aws/s3';
import { getConfig } from 'src/internal/config';

export interface File {
	filename: string;
	mimetype: string;
	encoding: string;
}
export interface UploadResponse {
	url: string;
	file: File;
}

export async function uploadSingleFile(stream: Promise<FileUpload>): Promise<UploadResponse> {
	const config = getConfig();
	const client = getS3Client();

	const { filename, mimetype, encoding, createReadStream } = await stream;
	const file = {
		filename,
		mimetype,
		encoding,
	};

	const ext = '.' + file.filename.split('.').pop() ?? 'media';
	const key = `media-${Date.now().toString()}${ext}`;

	const response = await client
		.upload({ Bucket: config.s3BucketName, Key: key, Body: createReadStream() })
		.promise();

	return {
		file,
		url: `http://${config.cdnHost}/${config.s3BucketName}/${response.Key}`,
	};
}

export async function uploadMultipleFiles(
	streams: Promise<FileUpload>[]
): Promise<UploadResponse[]> {
	const config = getConfig();
	const client = getS3Client();

	let res: UploadResponse[] = [];

	for (const stream of streams) {
		const { filename, mimetype, encoding, createReadStream } = await stream;
		const file = {
			filename,
			mimetype,
			encoding,
		};

		const ext = '.' + file.filename.split('.').pop() ?? 'media';
		const key = `media-${Date.now().toString()}${ext}`;

		const response = await client
			.upload({ Bucket: config.s3BucketName, Key: key, Body: createReadStream() })
			.promise();

		res.push({
			file,
			url: `http://${config.cdnHost}/${config.s3BucketName}/${response.Key}`,
		});
	}

	return res;
}
