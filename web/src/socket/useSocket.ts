import io, { Socket } from 'socket.io-client';
import create, { State } from 'zustand';

export interface SocketState extends State {
	connection: Socket;
}

const socket = io('http://wavechat.localhost', { path: '/ws' });

export const useSocket = create<SocketState>((set, get) => ({
	connection: socket,
}));
