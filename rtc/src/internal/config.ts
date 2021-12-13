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
	apiEndpoint: string;
}

// Global app configuration
const config: Config = {
	isDev: isDev,
	port: parseInt(process.env.PORT || "8001"),
	redisPort: parseInt(process.env.REDIS_PORT || "6379"),
	redisHost: process.env.REDIS_HOST || "redis",
	origins: [process.env.ORIGIN_ENDPOINT || "http://localhost:3000", "http://localhost:3001"],
	apiEndpoint: process.env.API_ENDPOINT || "http://localhost:5000/graphql",
};

export function getConfig(): Config {
	return config;
}
