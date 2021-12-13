import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import helmet from "helmet";
import morgan from "morgan";
import { getConfig } from "src/internal/config";

const config = getConfig();
export const app = express();

app.use(cors({ origin: config.origins, credentials: true }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
	morgan("dev", {
		skip: () => !config.isDev,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(graphqlUploadExpress());
