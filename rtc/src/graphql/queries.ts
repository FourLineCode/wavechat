import { gql } from 'graphql-request';

export const AUTHORIZE_SOCKET = gql`
	query IsSocketAuthorized($sessionId: String!) {
		isSocketAuthorized(sessionId: $sessionId)
	}
`;

export interface IsSocketAuthorizedQuery {
	isSocketAuthorized: boolean;
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
