import { ReadStream } from 'fs';
import { getS3Client } from 'src/aws/s3';
import { getConfig } from 'src/internal/config';

export async function upload(filename: string, data: ReadStream) {
	const config = getConfig();
	const client = getS3Client();

	client.upload({ Bucket: config.s3BucketName, Key: filename, Body: data }, (error, response) => {
		if (error) {
			console.log(error);
			return;
		}

		console.log('File uploaded successfully');
		console.log(response);
	});
}
