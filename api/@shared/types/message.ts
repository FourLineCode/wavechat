export interface UserDTO {
	id: string;
	username: string;
	displayName: string;
	avatarUrl?: string | null;
}

export interface MessageDTO {
	id?: string;
	pk?: number;
	body: string;
	threadId: string;
	authorId: string;
	author: UserDTO;
	createdAt?: string;
	updatedAt?: string;
}

export interface RoomEventDTO {
	roomId: string;
}
