import { UserSocketEvents } from '@shared/socket/events';
import io, { Socket } from 'socket.io-client';
import create, { State } from 'zustand';

export interface SocketState extends State {
	conn: Socket;
	init: () => void;
	connect: () => void;
	disconnect: () => void;
}

export const useSocket = create<SocketState>((set, get) => ({
	conn: io('http://wavechat.localhost', { path: '/ws', autoConnect: false }),
	connect: () => {
		get().conn.connect();
	},
	disconnect: () => {
		get().conn.disconnect();
	},
	init: () => {
		const conn = get().conn;
		let tickCount = 0;

		conn.on(UserSocketEvents.RecieveMessage, (args) => {
			console.log(++tickCount, args);
		});

		setInterval(() => {
			conn.emit(UserSocketEvents.SendMessage, random(9));
		}, 5000);

		setInterval(() => {
			conn.emit(UserSocketEvents.Tick);
		}, 5000);
	},
}));

function random(length: number) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
