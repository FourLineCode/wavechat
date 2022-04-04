import { Server } from "src/apollo/__generated__/types";
import { InviteFriendsList } from "src/components/server/InviteFriendsList";
import { Modal } from "src/components/ui/Modal";
import { ModalProps } from "src/hooks/useModal";

interface Props extends ModalProps {
  server: Server;
}

export function InviteFriendsModal({ server, ...modalProps }: Props) {
  return (
    <Modal large {...modalProps}>
      <InviteFriendsList server={server} />
    </Modal>
  );
}
