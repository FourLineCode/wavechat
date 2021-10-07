import { gql } from '@apollo/client';

export const SEND_REQUEST = gql`
	mutation SendRequest($userId: String!) {
		sendRequest(userId: $userId) {
			id
		}
	}
`;

export const UNFRIEND_USER = gql`
	mutation Unfriend($userId: String!) {
		unfriend(userId: $userId) {
			id
		}
	}
`;

export const UNSEND_REQUEST = gql`
	mutation UnsendRequest($requestId: String!) {
		unsendRequest(requestId: $requestId)
	}
`;
