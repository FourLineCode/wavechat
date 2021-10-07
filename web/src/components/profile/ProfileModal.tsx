import React from 'react';
import { ProfileDetails } from 'src/components/profile/ProfileDetails';
import { Modal } from 'src/components/ui/Modal';
import { ApiMutationCallback } from 'src/hooks/useSignal';

interface Props {
	userId: string;
	show: boolean;
	onClose: () => void;
	mutationCallback?: ApiMutationCallback;
}

export function ProfileModal({ userId, show, onClose, mutationCallback }: Props) {
	return (
		<Modal large isOpen={show} onClose={onClose}>
			<ProfileDetails userId={userId} mutationCallback={mutationCallback} />
		</Modal>
	);
}
