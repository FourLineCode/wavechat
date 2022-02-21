import { useState } from "react";

export interface ModalProps {
    show: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
}

export function useModal(initialState = false): ModalProps {
    const [show, setShow] = useState(initialState);

    const onOpen = () => setShow(true);
    const onClose = () => setShow(false);
    const onToggle = () => setShow((prev) => !prev);

    return { show, onOpen, onClose, onToggle };
}
