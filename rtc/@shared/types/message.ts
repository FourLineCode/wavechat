import { UserDTO } from './auth';

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
