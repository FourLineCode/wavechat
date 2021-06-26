import { useContext } from 'react';
import { SocketContext } from 'src/socket/SocketContextProvider';

export const useSocket = () => {
	return useContext(SocketContext);
};
