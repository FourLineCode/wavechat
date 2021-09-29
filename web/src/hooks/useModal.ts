import { useState } from 'react';

export function useModal() {
	const [show, setShow] = useState(false);

	const onOpen = () => setShow(true);
	const onClose = () => setShow(false);
	const onToggle = () => setShow((prev) => !prev);

	return { show, onOpen, onClose, onToggle };
}
