import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import {
	ActiveMessageThreadsQuery,
	ActiveMessageThreadsQueryVariables,
} from 'src/apollo/__generated__/types';
import { SearchFriendsInput } from 'src/components/search/SearchFriendsInput';

export const ACTIVE_MESSAGE_THREADS = gql`
	query ActiveMessageThreads {
		activeMessageThreads {
			id
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
	const router = useRouter();

	const { data } = useQuery<ActiveMessageThreadsQuery, ActiveMessageThreadsQueryVariables>(
		ACTIVE_MESSAGE_THREADS
	);

	return (
		<div className='flex flex-col flex-1 w-64 px-2 py-4 bg-dark-800 xl:w-80'>
			<SearchFriendsInput />
			<hr className='my-2 border-dark-700' />
			<div className='flex items-center justify-between'>
				<span className='font-semibold text-primary'>Direct Messages</span>
				{/* I am not sure if i want this component, it will overcomplicate things in the future */}
				{/* <Tooltip text='Create Message' position='top'>
					<div className='transform cursor-pointer hover:scale-125 text-dark-400 hover:text-dark-300'>
						<FaPlus size='16' />
					</div>
				</Tooltip> */}
			</div>
			<div>
				{data && data.activeMessageThreads.length > 0 ? (
					<div className='space-y-4'>
						{data.activeMessageThreads.map((thread) => (
							<div
								onClick={() => router.push(`/messages/thread/${thread.id}`)}
								className='cursor-pointer'
							>
								{thread.id}
							</div>
						))}
					</div>
				) : null}
			</div>
		</div>
	);
}
