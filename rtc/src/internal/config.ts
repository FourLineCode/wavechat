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
	gqlEndpoint: string;
}

// Global app configuration
const config: Config = {
	isDev: isDev,
	port: parseInt(process.env.PORT || "8001"),
	redisPort: parseInt(process.env.REDIS_PORT || "6379"),
	redisHost: process.env.REDIS_HOST || "redis",
	origins: ["http://wavechat.localhost"],
	gqlEndpoint: isDev ? "http://api:5000/graphql" : "http://wcp-api:5000/graphql",
};

export function getConfig(): Config {
	return config;
}
