import { Socket } from 'socket.io';

export abstract class SocketEventHandler {
	public constructor() {}
	public abstract initialize(): void;
	protected abstract handleSocketEvents(socket: Socket): void;
	protected abstract startListener(): void;
}
