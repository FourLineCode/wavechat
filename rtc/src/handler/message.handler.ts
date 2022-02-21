import {
    ErrorSocketEvents,
    MessageDTO,
    MessageSocketEvents,
    RoomEventDTO,
    UserDTO,
    UserPubsubChannels,
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
import { pubsub } from "src/redis/pubsub";
import { store } from "src/redis/store";
import { v4 as uuid } from "uuid";

interface RoomHandlerParams {
    socket: Socket;
    roomId: string;
}

export async function registerMessageHandler(io: IOServer, socket: Socket) {
    await pubsub.subscriber.subscribe(UserPubsubChannels.Message);

    pubsub.subscriber.on("message", (_channel: string, message: string) => {
        const messageDTO: MessageDTO = JSON.parse(message);
        broadcastMessage(io, messageDTO);
    });

    socket.on(MessageSocketEvents.JoinRoom, ({ roomId }: RoomEventDTO) => {
        joinRoom({ socket, roomId });
    });

    socket.on(MessageSocketEvents.SendMessage, (message: MessageDTO) =>
        publishMessage(socket, message)
    );

    socket.on(MessageSocketEvents.LeaveRoom, ({ roomId }: RoomEventDTO) => {
        leaveRoom({ socket, roomId });
    });
}

async function publishMessage(socket: Socket, message: MessageDTO) {
    message.id = uuid();
    const currentTime = new Date().toISOString();
    message.createdAt = currentTime;
    message.updatedAt = currentTime;

    if (message.attachments) {
        message.attachments = message.attachments.map((media) => ({ id: uuid(), ...media }));
    }

    await pubsub.publisher.publish(UserPubsubChannels.Message, JSON.stringify(message));

    try {
        await graphQLClient.request<PersistMessageQuery, PersistMessageVariables>(PERSIST_MESSAGE, {
            messageDTO: message,
        });
    } catch (error) {
        socket.emit(ErrorSocketEvents.SendMessageError, "Something went wrong");
    }
}

async function broadcastMessage(io: IOServer, message: MessageDTO) {
    io.to(message.threadId).emit(MessageSocketEvents.RecieveMessage, message);
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
