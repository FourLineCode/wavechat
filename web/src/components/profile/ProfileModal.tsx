import React from 'react';
import { ProfileDetails } from 'src/components/profile/ProfileDetails';
import { Modal } from 'src/components/ui/Modal';
import { ModalProps } from 'src/hooks/useModal';
import { ApiMutationCallback } from 'src/hooks/useSignal';

interface Props extends ModalProps {
	userId: string;
	mutationCallback?: ApiMutationCallback;
}

export function ProfileModal({ userId, show, onClose, mutationCallback }: Props) {
	return (
		<Modal large show={show} onClose={onClose}>
			<ProfileDetails userId={userId} mutationCallback={mutationCallback} onClose={onClose} />
		</Modal>
	);
}
