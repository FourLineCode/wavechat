import { useState } from 'react';

export function useModal(initialState = false) {
	const [show, setShow] = useState(initialState);

	const onOpen = () => setShow(true);
	const onClose = () => setShow(false);
	const onToggle = () => setShow((prev) => !prev);

	return { show, onOpen, onClose, onToggle };
}
