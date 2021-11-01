import Redis from 'ioredis';
import { config } from 'src/internal/config';

const port = config.redisPort;
const host = config.redisHost;

export const store = new Redis(port, host);
