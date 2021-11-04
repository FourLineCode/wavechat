import dotenv from 'dotenv';

// Initialize all .env configuration
dotenv.config();

export interface Config {
	isDev: boolean;
	port: number;
	redisPort: number;
	redisHost: string;
	origins: string[];
}

// Global app configuration
const config: Config = {
	isDev: process.env.NODE_ENV !== 'production',
	port: parseInt(process.env.PORT || '8001'),
	redisPort: parseInt(process.env.REDIS_PORT || '6379'),
	redisHost: process.env.REDIS_HOST || 'redis',
	origins: ['http://wavechat.localhost'],
};

export function getConfig(): Config {
	return config;
}
