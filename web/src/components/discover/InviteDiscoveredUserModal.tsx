import { User } from "src/apollo/__generated__/types";
import { InviteServerList } from "src/components/discover/InviteServerList";
import { Modal } from "src/components/ui/Modal";
import { ModalProps } from "src/hooks/useModal";

interface Props extends ModalProps {
  user: User;
}

export function InviteDiscoveredUserModal({ user, ...modalProps }: Props) {
  return (
    <Modal large {...modalProps}>
      <InviteServerList user={user} />
    </Modal>
  );
}
