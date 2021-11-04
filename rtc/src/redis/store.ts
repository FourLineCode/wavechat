import Redis from 'ioredis';
import { getConfig } from 'src/internal/config';

const config = getConfig();
const port = config.redisPort;
const host = config.redisHost;

export const store = new Redis(port, host);
