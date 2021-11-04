import Redis from 'ioredis';
import { config } from 'src/internal/config';

export class PubsubClient {
	private publisherClient: Redis.Redis;
	private subscriberClient: Redis.Redis;

	public constructor() {
		const port = config.redisPort;
		const host = config.redisHost;

		this.publisherClient = new Redis(port, host);
		this.subscriberClient = new Redis(port, host);
	}

	public get publisher() {
		return this.publisherClient;
	}

	public get subscriber() {
		return this.subscriberClient;
	}
}
