import { ProfileDetails } from "src/components/profile/ProfileDetails";
import { Modal } from "src/components/ui/Modal";
import { ModalProps } from "src/hooks/useModal";

interface Props extends ModalProps {
    userId: string;
}

export function ProfileModal({ userId, ...modalProps }: Props) {
    return (
        <Modal large {...modalProps}>
            <ProfileDetails userId={userId} onClose={modalProps.onClose} />
        </Modal>
    );
}
