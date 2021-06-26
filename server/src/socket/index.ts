import { Socket } from 'socket.io';

export class SockerHandler {
	public static onConnection = (socket: Socket) => {
		socket.on('message', (args) => {
			console.log('Message from client:', args);

			let i = 0;
			setInterval(() => {
				socket.emit('reply', { msg: `Reply from server ${i++}` });
			}, 1000);
		});
	};
}
