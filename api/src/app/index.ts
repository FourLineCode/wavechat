import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { getConfig } from 'src/internal/config';

const config = getConfig();
export const app = express();

/* === Adding Global Middlewares === */

// Allow requests from only one origin
app.use(cors({ origin: config.origins, credentials: true }));

// For default security headers
app.use(helmet({ contentSecurityPolicy: false }));

// For logging api request data
app.use(
	morgan('dev', {
		skip: () => !config.isDev,
	})
);

// Json body parser
app.use(express.json());

// Cookie parser for authorization
app.use(cookieParser());
