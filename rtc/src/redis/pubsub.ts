import Redis from 'ioredis';
import { getConfig } from 'src/internal/config';

const config = getConfig();
const port = config.redisPort;
const host = config.redisHost;

const publisherClient = new Redis(port, host);
const subscriberClient = new Redis(port, host);

export const pubsub = {
	publisher: publisherClient,
	subscriber: subscriberClient,
};
