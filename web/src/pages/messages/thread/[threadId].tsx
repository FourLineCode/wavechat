import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import {
	GetMessageThreadQuery,
	GetMessageThreadQueryVariables,
} from 'src/apollo/__generated__/types';
import { FriendsInfo } from 'src/components/friends/FriendsInfo';
import { Layout } from 'src/components/layouts/Layout';
import { DirectMessages } from 'src/components/messages/DirectMessages';
import { NavigationSidebar } from 'src/components/navigations/NavigationSidebar';
import { SidebarWithProfile } from 'src/components/profile/SidebarWithProfile';
import { authRedirect } from 'src/utils/redirects/auth';

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
	const threadId = router.query.threadId as string;

	const { data } = useQuery<GetMessageThreadQuery, GetMessageThreadQueryVariables>(
		GET_MESSAGE_THREAD,
		{
			variables: {
				threadId: threadId,
			},
		}
	);

	return (
		<Layout title={`Thread ${threadId}`} desc='WaveChat | Thread description'>
			<div className='flex w-screen h-screen'>
				<NavigationSidebar />
				<SidebarWithProfile component={DirectMessages} />
				<div className='flex flex-col items-center justify-center flex-1 bg-dark-700'>
					<div className='text-4xl font-bold text-primary'>Thread - {threadId}</div>
					{data && <div>Participants: </div>}
					{data && <div>{data.messageThread.participants[0].displayName}</div>}
					{data && <div>{data.messageThread.participants[1].displayName}</div>}
				</div>
				<FriendsInfo />
			</div>
		</Layout>
	);
}

export const getServerSideProps = authRedirect;
