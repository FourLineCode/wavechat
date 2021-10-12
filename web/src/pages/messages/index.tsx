import { TiMessages } from 'react-icons/ti';
import { FriendsInfo } from 'src/components/friends/FriendsInfo';
import { Layout } from 'src/components/layouts/Layout';
import { DirectMessages } from 'src/components/messages/sidebar/DirectMessages';
import { NavigationSidebar } from 'src/components/navigations/NavigationSidebar';
import { SidebarWithProfile } from 'src/components/profile/SidebarWithProfile';
import { authRedirect } from 'src/utils/redirects/auth';

export default function Messages() {
	return (
		<Layout title='Messages' desc='WaveChat | Messages'>
			<div className='flex w-screen h-screen'>
				<NavigationSidebar />
				<SidebarWithProfile component={DirectMessages} />
				<div className='flex flex-col items-center justify-center flex-1 text-muted bg-dark-700'>
					<TiMessages size='256px' />
					<div className='text-2xl font-semibold'>Click on a user to start chatting</div>
				</div>
				<FriendsInfo />
			</div>
		</Layout>
	);
}

export const getServerSideProps = authRedirect;
