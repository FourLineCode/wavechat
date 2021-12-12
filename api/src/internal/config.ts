import dotenv from "dotenv";

// Initialize all .env configuration
dotenv.config();
const isDev = process.env.NODE_ENV !== "production";

export interface Config {
	isDev: boolean;
	port: number;
	redisPort: number;
	redisHost: string;
	origins: string[];
	awsEndpoint: string;
	awsRegion: string;
	awsAccessKeyId: string;
	awsSecretKey: string;
	s3BucketName: string;
}

// Global app configuration
const config: Config = {
	isDev: isDev,
	port: parseInt(process.env.PORT || "5001"),
	redisPort: parseInt(process.env.REDIS_PORT || "6379"),
	redisHost: process.env.REDIS_HOST || "redis",
	origins: ["http://localhost:3000"],
	awsEndpoint: "http://localhost:4566",
	awsRegion: "ap-south-1",
	awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || "aws-access-key",
	awsSecretKey: process.env.AWS_SECRET_KEY || "aws-secret-key",
	s3BucketName: process.env.AWS_BUCKET_NAME || "wc-media",
};

export function getConfig(): Config {
	return config;
}
