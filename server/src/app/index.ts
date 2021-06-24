import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

export const app = express();
app.use(cors({ credentials: true }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
