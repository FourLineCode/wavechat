import React, { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io('http://wavechat.localhost', { path: '/ws' });
export const SocketContext = createContext<Socket>(socket);

export const SocketProvider: React.FC = ({ children }) => {
	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
