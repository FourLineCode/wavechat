export enum SocketEvents {
	Connect = 'connect',
	Disconnect = 'disconnect',
}

export enum UserSocketEvents {
	Tick = 'user:tick',
	SendMessage = 'user:message:send',
	RecieveMessage = 'user:message:recieve',
	JoinRoom = 'user:room:join',
	LeaveRoom = 'user:room:leave',
}

export enum ErrorSocketEvents {
	AuthorizationError = 'error:unauthorized',
	JoinRoomError = 'error:join-room',
}
