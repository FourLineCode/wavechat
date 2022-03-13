import { gql, useQuery } from "@apollo/client";
import { format } from "date-fns";
import ordinal from "ordinal";
import { Book, Buildings, Chat, GraduationCap, IdentificationBadge } from "phosphor-react";
import toast from "react-hot-toast";
import { GetUserDataQuery, GetUserDataQueryVariables, User } from "src/apollo/__generated__/types";
import { UserAvatar } from "src/components/profile/UserAvatar";
import { RequestButton } from "src/components/requests/RequestButton";
import { Button } from "src/components/ui/Button";
import { Spinner } from "src/components/ui/Spinner";
import { useIsUserFriend } from "src/hooks/useIsUserFriend";
import { useMessageUserMutation } from "src/hooks/useMessageUserMutation";
import { ModalProps } from "src/hooks/useModal";
import { useAuth } from "src/store/useAuth";

interface Props extends Partial<ModalProps> {
    userId: string;
}

export const GET_USER_DATA = gql`
    query GetUserData($userId: String!) {
        user(userId: $userId) {
            id
            email
            username
            displayName
            avatarUrl
            role
            bio
            createdAt
            updatedAt
            university
            department
            semester
            pendingRequests {
                id
                fromUserId
            }
            sentRequests {
                id
                toUserId
            }
            friends {
                firstUserId
                secondUserId
            }
        }
    }
`;

export function ProfileDetails({ userId, onClose }: Props) {
    const currUserId = useAuth().user?.id;
    const getOrCreateMessageThread = useMessageUserMutation();
    const isFriend = useIsUserFriend(userId);

    const { data, loading } = useQuery<GetUserDataQuery, GetUserDataQueryVariables>(GET_USER_DATA, {
        variables: {
            userId: userId,
        },
        onError: () => {
            toast.error("Failed to fetch user");
        },
    });

    return data && !loading ? (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 space-x-2">
                    <UserAvatar
                        user={data.user as User}
                        className="object-cover w-16 h-16 rounded-lg shrink-0"
                    />
                    <div>
                        <div className="text-lg font-semibold line-clamp-1">
                            {data.user.displayName}
                        </div>
                        <div className="text-sm text-muted line-clamp-1">
                            {"Joined: " + format(new Date(data.user.createdAt), "dd MMM, yyyy")}
                        </div>
                    </div>
                </div>
                <div className="flex space-x-2">
                    {data.user.id !== currUserId && (
                        <>
                            {isFriend && (
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        getOrCreateMessageThread({
                                            variables: { userId: data.user.id },
                                        });
                                        if (onClose) {
                                            onClose();
                                        }
                                    }}
                                >
                                    <Chat size={22} weight="fill" />
                                </Button>
                            )}
                            <RequestButton user={data.user as User} />
                        </>
                    )}
                </div>
            </div>
            <div className="px-2 mt-4 space-y-2">
                {data.user.bio && (
                    <div className="flex space-x-2">
                        <div>
                            <IdentificationBadge weight="fill" size={24} className="text-muted" />
                        </div>
                        <div className="text-base">{data.user.bio}</div>
                    </div>
                )}
                {data.user.university && (
                    <div className="flex space-x-2">
                        <div>
                            <Buildings weight="fill" size={24} className="text-muted" />
                        </div>
                        <div className="text-base">{data.user.university}</div>
                    </div>
                )}
                {data.user.department && (
                    <div className="flex space-x-2">
                        <div>
                            <Book weight="fill" size={24} className="text-muted" />
                        </div>
                        <div className="text-base">{data.user.department}</div>
                    </div>
                )}
                {data.user.semester && (
                    <div className="flex space-x-2">
                        <div>
                            <GraduationCap weight="fill" size={24} className="text-muted" />
                        </div>
                        <div className="text-base">
                            {ordinal(data.user.semester as number) + " semester"}
                        </div>
                    </div>
                )}
            </div>
        </>
    ) : (
        <div className="flex items-center justify-center w-full h-32">
            <Spinner />
        </div>
    );
}
