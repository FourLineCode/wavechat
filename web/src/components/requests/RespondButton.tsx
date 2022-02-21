import { FaCheck, FaTimes } from "react-icons/fa";
import { IoArrowRedo } from "react-icons/io5";
import { RequestButtonProps, RequestButtonState } from "src/components/requests/RequestButton";
import { Button } from "src/components/ui/Button";
import { Modal } from "src/components/ui/Modal";
import { useAcceptRequestMutation } from "src/hooks/useAcceptRequestMutation";
import { useDeclineRequestMutation } from "src/hooks/useDeclineRequestMutation";
import { useModal } from "src/hooks/useModal";

export function RespondButton({ user, className, reqId, setState, setReqId }: RequestButtonProps) {
    const respondRequestModal = useModal();

    const { acceptRequest, loading: acceptRequestLoading } = useAcceptRequestMutation({
        reqId,
        userId: user.id,
    });
    const { declineRequest, loading: declineRequestLoading } = useDeclineRequestMutation({
        reqId,
        userId: user.id,
    });

    return (
        <>
            <Button className={className} onClick={respondRequestModal.onOpen}>
                <div className="flex items-center justify-center space-x-1">
                    <IoArrowRedo />
                    <span className="line-clamp-1">Respond</span>
                </div>
            </Button>
            <Modal {...respondRequestModal}>
                <div className="text-2xl font-semibold text-center">Respond to friend request</div>
                <div className="flex justify-center mt-4 space-x-4">
                    <Button
                        type="submit"
                        variant="outlined"
                        onClick={() => {
                            declineRequest();
                            setState(RequestButtonState.NotFriend);
                            setReqId(null);
                            respondRequestModal.onClose();
                        }}
                        isSubmitting={declineRequestLoading}
                    >
                        <div className="flex items-center justify-center space-x-1">
                            <FaTimes />
                            <span className="line-clamp-1">Decline</span>
                        </div>
                    </Button>
                    <Button
                        type="submit"
                        onClick={() => {
                            acceptRequest();
                            setState(RequestButtonState.AlreadyFriend);
                            setReqId(null);
                            respondRequestModal.onClose();
                        }}
                        isSubmitting={acceptRequestLoading}
                    >
                        <div className="flex items-center justify-center space-x-1">
                            <FaCheck />
                            <span className="line-clamp-1">Accept</span>
                        </div>
                    </Button>
                </div>
            </Modal>
        </>
    );
}
