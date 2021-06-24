import dotenv from 'dotenv';

dotenv.config();

export const config = {
	isDev: process.env.NODE_ENV === 'development',
	port: process.env.PORT || 5000,
};
