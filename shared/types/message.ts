import { UserDTO } from "./auth";

export interface MediaDTO {
  url: string;
  filename: string;
  mimetype: string;
  encoding: string;
}

export interface MessageDTO {
  id?: string;
  pk?: number;
  body: string;
  attachments?: MediaDTO[];
  threadId: string;
  authorId: string;
  author: UserDTO;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoomEventDTO {
  roomId: string;
}
