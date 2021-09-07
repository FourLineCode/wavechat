import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

export const app = express();

/* === Adding Global Middlewares === */

// Allow requests from only one origin
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// For default security headers
app.use(helmet({ contentSecurityPolicy: false }));

// For logging api request data
app.use(morgan('dev'));

// Json body parser
app.use(express.json());

// Cookie parser for authorization
app.use(cookieParser());
