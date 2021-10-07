import { useState } from 'react';

export type Signal = any;
export type SendSignalFunction = (arg?: any) => void;
export type ApiMutationCallback = (arg?: any) => void;

export function useSignal(): [Signal, SendSignalFunction] {
	const [signal, setSignal] = useState<any>(null);

	const sendSignal = (arg?: any) => {
		setSignal(arg);
	};

	return [signal, sendSignal];
}
