import { MediaDTO } from '@shared/types/message';
import { FileUpload } from 'graphql-upload';
import { db } from 'prisma/connection';
import { getS3Client } from 'src/aws/s3';
import { getConfig } from 'src/internal/config';

export async function uploadSingleFile(stream: Promise<FileUpload>): Promise<MediaDTO> {
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
		...file,
		url: `http://${config.cdnHost}/${config.s3BucketName}/${response.Key}`,
	};
}

export async function uploadMultipleFiles(streams: Promise<FileUpload>[]): Promise<MediaDTO[]> {
	const config = getConfig();
	const client = getS3Client();

	let res: MediaDTO[] = [];

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
			...file,
			url: `http://${config.cdnHost}/${config.s3BucketName}/${response.Key}`,
		});
	}

	return res;
}

export async function getMediaForMessage(messageId: string) {
	return await db.media.findMany({ where: { messageId } });
}
