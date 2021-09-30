import React from 'react';
import { ProfileDetails } from 'src/components/profile/ProfileDetails';
import { Modal } from 'src/components/ui/Modal';

interface Props {
	userId: string;
	show: boolean;
	onClose: () => void;
}

export function ProfileModal({ userId, show, onClose }: Props) {
	return (
		<Modal large isOpen={show} onClose={onClose}>
			<ProfileDetails userId={userId} />
		</Modal>
	);
}
