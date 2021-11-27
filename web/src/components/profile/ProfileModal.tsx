import { ProfileDetails } from "src/components/profile/ProfileDetails";
import { Modal } from "src/components/ui/Modal";
import { ModalProps } from "src/hooks/useModal";

interface Props extends ModalProps {
	userId: string;
}

export function ProfileModal({ userId, show, onClose }: Props) {
	return (
		<Modal large show={show} onClose={onClose}>
			<ProfileDetails userId={userId} onClose={onClose} />
		</Modal>
	);
}
