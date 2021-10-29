import { gql } from 'graphql-request';

export const AUTHORIZE_SOCKET = gql`
	query AuthorizeSocket($sessionId: String!) {
		authorizeRtcConn(sessionId: $sessionId)
	}
`;

export const AUTHORIZE_JOIN_ROOM = gql`
	query AuthorizeJoinRoom($threadId: String!, $userId: String!) {
		authorizeRtcConn(threadId: $threadId, userId: $userId)
	}
`;
