import io, { Socket } from "socket.io-client";
import { config } from "src/internal/config";
import create, { State } from "zustand";

export interface SocketState extends State {
	conn: Socket;
	connect: () => void;
	disconnect: () => void;
}

export const useSocket = create<SocketState>((set, get) => ({
	conn: io(config.wsEndpoint, { path: config.wsPath, autoConnect: false, withCredentials: true }),
	connect: () => {
		get().conn.connect();
	},
	disconnect: () => {
		get().conn.removeAllListeners();
		get().conn.disconnect();
	},
}));
