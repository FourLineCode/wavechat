import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    GetMessageThreadQuery,
    GetMessageThreadQueryVariables,
    MessageThread,
    User,
} from "src/apollo/__generated__/types";
import { FriendsInfo } from "src/components/friends/FriendsInfo";
import { Layout } from "src/components/layouts/Layout";
import { DirectMessages } from "src/components/messages/sidebar/DirectMessages";
import { MessageThreadPage } from "src/components/messages/thread/MessageThreadPage";
import { NavigationSidebar } from "src/components/navigations/NavigationSidebar";
import { SidebarWithProfile } from "src/components/profile/SidebarWithProfile";
import { Spinner } from "src/components/ui/Spinner";
import { useAuth } from "src/store/useAuth";
import { authRedirect } from "src/utils/redirects/auth";

export const GET_MESSAGE_THREAD = gql`
    query GetMessageThread($threadId: String!) {
        messageThread(threadId: $threadId) {
            id
            participants {
                id
                username
                displayName
                avatarUrl
            }
            messages {
                id
                body
                createdAt
                author {
                    id
                    username
                    displayName
                    avatarUrl
                }
            }
        }
    }
`;

export default function Thread() {
    const router = useRouter();
    const currentUserId = useAuth().user?.id;
    const threadId = router.query.threadId as string;
    const [user, setUser] = useState<User | null>(null);

    const { data, loading } = useQuery<GetMessageThreadQuery, GetMessageThreadQueryVariables>(
        GET_MESSAGE_THREAD,
        {
            variables: {
                threadId: threadId,
            },
            onError: () => {
                toast.error("Failed to fetch conversation");
                router.push("/messages");
            },
        }
    );

    useEffect(() => {
        if (data) {
            setUser(
                data.messageThread.participants.filter((u) => u.id !== currentUserId)[0] as User
            );
        }
    }, [data]);

    return (
        <Layout title={user?.displayName ?? "Message"} desc="WaveChat | Thread description">
            <div className="flex w-screen h-screen">
                <NavigationSidebar />
                <SidebarWithProfile component={DirectMessages} />
                <div className="flex-1 min-w-0 min-h-0 bg-dark-700">
                    {data && !loading ? (
                        <MessageThreadPage
                            thread={data.messageThread as MessageThread}
                            key={data.messageThread.id}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                            <Spinner />
                        </div>
                    )}
                </div>
                <FriendsInfo />
            </div>
        </Layout>
    );
}

export const getServerSideProps = authRedirect;
