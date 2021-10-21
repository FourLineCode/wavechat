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

	public async publish(channel: string, message: string): Promise<boolean> {
		try {
			await this.publisher.publish(channel, message);
			return true;
		} catch (error) {
			console.log('Error publishing pubsub message');
			console.error(error);
			return false;
		}
	}

	public async subscribe(...channel: string[]): Promise<number> {
		try {
			const count = this.subscriber.subscribe(channel);
			return count;
		} catch (error) {
			console.log('Error subscribing to pubsub channel');
			console.error(error);
		}

		return 0;
	}
}
