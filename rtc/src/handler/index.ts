import { SocketEvents } from "@wavechat/shared";
import { Server as IOServer, Socket } from "socket.io";
import { registerAuthHandler } from "src/handler/auth.handler";
import { registerMessageHandler } from "src/handler/message.handler";

export async function registerHandlers(io: IOServer) {
    io.on(SocketEvents.Connect, async (socket: Socket) => {
        console.log("+ User has connected -", socket.id);

        await registerAuthHandler(io, socket);
        await registerMessageHandler(io, socket);

        socket.on(SocketEvents.Disconnect, () => {
            socket.removeAllListeners();

            console.log("- User has disconnected -", socket.id);
        });
    });
}
