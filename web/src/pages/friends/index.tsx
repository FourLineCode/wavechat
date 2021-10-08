import { FriendsInfo } from 'src/components/friends/FriendsInfo';
import { Layout } from 'src/components/layouts/Layout';
import { DirectMessages } from 'src/components/messages/DirectMessages';
import { NavigationSidebar } from 'src/components/navigations/NavigationSidebar';
import { SidebarWithProfile } from 'src/components/profile/SidebarWithProfile';
import { authRedirect } from 'src/utils/redirects/auth';

export default function Friends() {
	return (
		<Layout title='Friends' desc='WaveChat | Friends'>
			<div className='flex w-screen h-screen'>
				<NavigationSidebar />
				<SidebarWithProfile component={DirectMessages} />
				<div className='flex flex-col items-center justify-center flex-1 bg-dark-700'>
					<div className='text-4xl font-bold text-primary'>/Friends</div>
				</div>
				<FriendsInfo />
			</div>
		</Layout>
	);
}

export const getServerSideProps = authRedirect;
