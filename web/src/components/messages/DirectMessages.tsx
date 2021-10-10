import { gql, useQuery } from '@apollo/client';
import {
	ActiveMessageThreadsQuery,
	ActiveMessageThreadsQueryVariables,
	MessageThread,
} from 'src/apollo/__generated__/types';
import { MessageThreadCard } from 'src/components/messages/MessageThreadCard';
import { SearchFriendsInput } from 'src/components/search/SearchFriendsInput';

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
	const { data } = useQuery<ActiveMessageThreadsQuery, ActiveMessageThreadsQueryVariables>(
		ACTIVE_MESSAGE_THREADS
	);

	return (
		<div className='flex flex-col flex-grow w-64 min-h-0 px-2 py-4 bg-dark-800 xl:w-80'>
			<SearchFriendsInput />
			<hr className='my-2 border-dark-700' />
			<div className='flex items-center justify-between'>
				<span className='font-semibold text-primary'>Direct Messages</span>
				{/* TODO: I am not sure if i want this component, it will overcomplicate things in the future */}
				{/* <Tooltip text='Create Message' position='top'>
					<div className='transform cursor-pointer hover:scale-125 text-dark-400 hover:text-dark-300'>
						<FaPlus size='16' />
					</div>
				</Tooltip> */}
			</div>
			<div className='flex flex-col min-h-0 mt-2'>
				{data && data.activeMessageThreads.length > 0 ? (
					<div className='px-1 space-y-2 overflow-y-auto scrollbar-thin'>
						{data.activeMessageThreads.map((thread) => (
							<MessageThreadCard thread={thread as MessageThread} />
						))}
					</div>
				) : null}
			</div>
		</div>
	);
}
