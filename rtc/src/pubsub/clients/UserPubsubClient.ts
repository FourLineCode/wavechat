import { UserPubsubChannels } from '@shared/pubsub/channels';
import { PubsubClient } from 'src/pubsub/PubsubClient';

let instance: UserPubsubClient;

export class UserPubsubClient extends PubsubClient {
	public constructor() {
		super();
	}

	public static getInstance() {
		if (!instance) {
			instance = new UserPubsubClient();
		}

		return instance;
	}

	public async publishMessage(message: string) {
		await this.publish(UserPubsubChannels.Message, message);
	}
}
