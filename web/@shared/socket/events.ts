export enum UserSocketEvents {
	Tick = 'user:tick',
	SendMessage = 'user:message:send',
	RecieveMessage = 'user:message:recieve',
	JoinRoom = 'user:room:join',
	LeaveRoom = 'user:room:leave',
}
