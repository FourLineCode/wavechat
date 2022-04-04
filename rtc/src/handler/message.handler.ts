import {
  ErrorSocketEvents,
  MessageDTO,
  MessageSocketEvents,
  RoomEventDTO,
  UserDTO,
} from "@wavechat/shared";
import { Server as IOServer, Socket } from "socket.io";
import { graphQLClient } from "src/graphql/client";
import {
  AUTHORIZE_JOIN_ROOM,
  IsUserInThreadQuery,
  IsUserInThreadVariables,
  PersistMessageQuery,
  PersistMessageVariables,
  PERSIST_MESSAGE,
} from "src/graphql/queries";
import { store } from "src/redis/store";
import { v4 as uuid } from "uuid";

interface RoomHandlerParams {
  socket: Socket;
  roomId: string;
}

export async function registerMessageHandler(io: IOServer, socket: Socket) {
  socket.on(MessageSocketEvents.JoinRoom, ({ roomId }: RoomEventDTO) => {
    joinRoom({ socket, roomId });
  });

  socket.on(MessageSocketEvents.SendMessage, (message: MessageDTO) =>
    publishMessage(io, socket, message)
  );

  socket.on(MessageSocketEvents.LeaveRoom, ({ roomId }: RoomEventDTO) => {
    leaveRoom({ socket, roomId });
  });
}

async function publishMessage(io: IOServer, socket: Socket, message: MessageDTO) {
  message.id = uuid();
  const currentTime = new Date().toISOString();
  message.createdAt = currentTime;
  message.updatedAt = currentTime;

  if (message.attachments) {
    message.attachments = message.attachments.map((media) => ({ id: uuid(), ...media }));
  }

  io.to(message.threadId).emit(MessageSocketEvents.RecieveMessage, message);

  try {
    await graphQLClient.request<PersistMessageQuery, PersistMessageVariables>(PERSIST_MESSAGE, {
      messageDTO: message,
    });
  } catch (error) {
    socket.emit(ErrorSocketEvents.SendMessageError, "Something went wrong");
  }
}

async function joinRoom({ socket, roomId }: RoomHandlerParams) {
  const authorized = await authorizeJoinRoom({ socket, roomId });
  if (!authorized) {
    socket.emit(ErrorSocketEvents.JoinRoomError, "You are not part of this conversation");
    return;
  }

  socket.join(roomId);
}

async function leaveRoom({ socket, roomId }: RoomHandlerParams) {
  await socket.leave(roomId);
}

async function authorizeJoinRoom({ socket, roomId }: RoomHandlerParams): Promise<boolean> {
  try {
    const userObjectString = await store.get(socket.id);
    if (!userObjectString) {
      return false;
    }

    const user: UserDTO = JSON.parse(userObjectString);
    const data = await graphQLClient.request<IsUserInThreadQuery, IsUserInThreadVariables>(
      AUTHORIZE_JOIN_ROOM,
      {
        threadId: roomId,
        userId: user.id,
      }
    );

    return data.isUserInThread;
  } catch (error) {
    return false;
  }
}
