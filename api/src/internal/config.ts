import dotenv from 'dotenv';

// Initialize all .env configuration
dotenv.config();

// Some global configuration
export const config = {
	isDev: process.env.NODE_ENV === 'development',
	port: process.env.PORT || 5001,
};
