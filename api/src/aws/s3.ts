import AWS from 'aws-sdk';
import { getConfig } from 'src/internal/config';

let s3Client: AWS.S3;

export function getS3Client() {
	if (!s3Client) {
		const config = getConfig();
		AWS.config.update({ region: config.awsRegion });

		s3Client = new AWS.S3({
			endpoint: config.awsEndpoint,
			s3ForcePathStyle: true,
			credentials: {
				accessKeyId: config.awsAccessKeyId,
				secretAccessKey: config.awsSecretKey,
			},
		});
	}

	return s3Client;
}
