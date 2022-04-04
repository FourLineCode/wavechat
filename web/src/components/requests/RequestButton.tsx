import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "src/apollo/__generated__/types";
import { AddButton } from "src/components/requests/AddButton";
import { RespondButton } from "src/components/requests/RespondButton";
import { UnfriendButton } from "src/components/requests/UnfriendButton";
import { UnsendButton } from "src/components/requests/UnsendButton";
import { Button } from "src/components/ui/Button";
import { Spinner } from "src/components/ui/Spinner";
import { useAuth } from "src/store/useAuth";

interface Props {
  user: User;
  className?: string;
}

export interface RequestButtonProps extends Props {
  reqId: string;
  setState: Dispatch<SetStateAction<RequestButtonState>>;
  setReqId: Dispatch<SetStateAction<string | null>>;
}

export enum RequestButtonState {
  AlreadyFriend,
  HasPendingRequest,
  SentRequest,
  NotFriend,
  Loading,
}

export function RequestButton({ user, className }: Props) {
  const auth = useAuth();
  const currentUserId = auth.user?.id;
  const [state, setState] = useState<RequestButtonState>(RequestButtonState.Loading);
  const [reqId, setReqId] = useState<string | null>(null);

  const isAlreadyFriend = ({ friends }: User) => {
    const length = friends.length;
    for (let i = 0; i < length; i++) {
      const { firstUserId, secondUserId } = friends[i];
      if (firstUserId === currentUserId || secondUserId === currentUserId) {
        return true;
      }
    }
    return false;
  };

  const hasPendingRequest = ({ sentRequests }: User) => {
    const length = sentRequests.length;
    for (let i = 0; i < length; i++) {
      if (sentRequests[i].toUserId === currentUserId) {
        setReqId(sentRequests[i].id);
        return true;
      }
    }
    return false;
  };

  const didSendRequest = ({ pendingRequests }: User) => {
    const length = pendingRequests.length;
    for (let i = 0; i < length; i++) {
      if (pendingRequests[i].fromUserId === currentUserId) {
        setReqId(pendingRequests[i].id);
        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    if (isAlreadyFriend(user)) {
      setState(RequestButtonState.AlreadyFriend);
      return;
    } else if (hasPendingRequest(user)) {
      setState(RequestButtonState.HasPendingRequest);
      return;
    } else if (didSendRequest(user)) {
      setState(RequestButtonState.SentRequest);
      return;
    } else {
      setState(RequestButtonState.NotFriend);
    }
  }, []);

  return state === RequestButtonState.AlreadyFriend ? (
    <UnfriendButton
      user={user}
      className={className}
      reqId={reqId ?? "NULL_REQUEST_ID_ERROR"}
      setState={setState}
      setReqId={setReqId}
    />
  ) : state === RequestButtonState.HasPendingRequest ? (
    <RespondButton
      user={user}
      className={className}
      reqId={reqId ?? "NULL_REQUEST_ID_ERROR"}
      setState={setState}
      setReqId={setReqId}
    />
  ) : state === RequestButtonState.SentRequest ? (
    <UnsendButton
      user={user}
      className={className}
      reqId={reqId ?? "NULL_REQUEST_ID_ERROR"}
      setState={setState}
      setReqId={setReqId}
    />
  ) : state === RequestButtonState.NotFriend ? (
    <AddButton
      user={user}
      className={className}
      reqId={reqId ?? "NULL_REQUEST_ID_ERROR"}
      setState={setState}
      setReqId={setReqId}
    />
  ) : (
    <Button>
      <Spinner />
    </Button>
  );
}
