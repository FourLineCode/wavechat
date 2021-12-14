export enum SocketEvents {
	Connect = "connect",
	Disconnect = "disconnect",
}

export enum MessageSocketEvents {
	Connected = "user:connected",
	SendMessage = "user:message:send",
	RecieveMessage = "user:message:recieve",
	JoinRoom = "user:room:join",
	LeaveRoom = "user:room:leave",
}

export enum ErrorSocketEvents {
	AuthorizationError = "error:unauthorized",
	JoinRoomError = "error:join-room",
	SendMessageError = "error:send-message",
}
