import { UserPubsubClient } from 'src/pubsub/clients/UserPubsubClient';

export const pubsub = {
	user: UserPubsubClient.getInstance(),
};
