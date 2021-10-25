import io, { Socket } from 'socket.io-client';
import create, { State } from 'zustand';

export interface SocketState extends State {
	conn: Socket;
	connect: () => void;
	disconnect: () => void;
}

export const useSocket = create<SocketState>((set, get) => ({
	conn: io('http://wavechat.localhost', { path: '/ws', autoConnect: false }),
	connect: () => {
		get().conn.connect();
	},
	disconnect: () => {
		get().conn.removeAllListeners();
		get().conn.disconnect();
	},
}));
