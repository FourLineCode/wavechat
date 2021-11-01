import { UserDTO } from '@shared/types/auth';
import { gql } from 'graphql-request';

export const AUTHORIZE_SOCKET = gql`
	query IsSocketAuthorized($sessionId: String!) {
		isSocketAuthorized(sessionId: $sessionId) {
			authorized
			user {
				id
				username
				displayName
				avatarUrl
			}
		}
	}
`;

export interface IsSocketAuthorizedQuery {
	isSocketAuthorized: {
		authorized: boolean;
		user: UserDTO | null;
	};
}

export interface IsSocketAuthorizedVariables {
	sessionId: string;
}

export const AUTHORIZE_JOIN_ROOM = gql`
	query IsUserInThread($threadId: String!, $userId: String!) {
		isUserInThread(threadId: $threadId, userId: $userId)
	}
`;

export interface IsUserInThreadQuery {
	isUserInThread: boolean;
}

export interface IsUserInThreadVariables {
	threadId: string;
	userId: string;
}
