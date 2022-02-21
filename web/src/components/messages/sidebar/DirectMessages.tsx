import { gql, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import {
    ActiveMessageThreadsQuery,
    ActiveMessageThreadsQueryVariables,
    MessageThread,
} from "src/apollo/__generated__/types";
import { MessageThreadCard } from "src/components/messages/sidebar/MessageThreadCard";
import { SearchFriendsInput } from "src/components/search/SearchFriendsInput";
import { Spinner } from "src/components/ui/Spinner";

export const ACTIVE_MESSAGE_THREADS = gql`
    query ActiveMessageThreads {
        activeMessageThreads {
            id
            updatedAt
            participants {
                id
                username
                displayName
                avatarUrl
            }
        }
    }
`;

export function DirectMessages() {
    const { data, loading } = useQuery<
        ActiveMessageThreadsQuery,
        ActiveMessageThreadsQueryVariables
    >(ACTIVE_MESSAGE_THREADS, {
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return (
        <div className="flex flex-col w-64 min-h-0 px-2 py-4 grow bg-dark-800 xl:w-80">
            <SearchFriendsInput />
            <hr className="my-2 border-dark-700" />
            <div className="flex items-center justify-between">
                <span className="font-semibold text-primary">Direct Messages</span>
                {/* TODO: I am not sure if i want this component, it will overcomplicate things in the future */}
                {/* <Tooltip text='Create Message' position='top'>
					<div className='cursor-pointer hover:scale-125 text-dark-400 hover:text-dark-300'>
						<FaPlus size='16' />
					</div>
				</Tooltip> */}
            </div>
            <div className="flex flex-col min-h-0 mt-2">
                {data && data.activeMessageThreads.length > 0 ? (
                    <div className="pr-1 space-y-2 overflow-y-auto">
                        {data.activeMessageThreads.map((thread) => (
                            <MessageThreadCard thread={thread as MessageThread} key={thread.id} />
                        ))}
                    </div>
                ) : loading ? (
                    <div className="flex justify-center w-full pt-24">
                        <Spinner />
                    </div>
                ) : (
                    <div className="w-full pt-24 text-xl font-semibold text-center text-muted">
                        No Messages
                    </div>
                )}
            </div>
        </div>
    );
}
