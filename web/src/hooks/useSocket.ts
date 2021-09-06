import { useContext } from 'react';
import { SocketContext } from 'src/socket/SocketContextProvider';

export function useSocket() {
	return useContext(SocketContext);
}
