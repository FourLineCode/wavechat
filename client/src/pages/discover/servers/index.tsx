import { DiscoverNavigation } from 'src/components/discover/DiscoverNavigation';
import { FriendsList } from 'src/components/friends/FriendsList';
import { Layout } from 'src/components/layouts/Layout';
import { NavigationSidebar } from 'src/components/navigations/NavigationSidebar';
import { SidebarWithProfile } from 'src/components/profile/SidebarWithProfile';
import { authRedirect } from 'src/utils/redirects/auth';

export default function DiscoverServers() {
	return (
		<Layout title='Discover' desc='WaveChat | Discover new people and communities'>
			<div className='flex w-screen h-screen'>
				<NavigationSidebar />
				<SidebarWithProfile component={DiscoverNavigation} />
				<div className='flex flex-col items-center justify-center flex-1 bg-dark-700'>
					<div className='text-4xl font-bold text-light'>Discover Servers</div>
				</div>
				<FriendsList />
			</div>
		</Layout>
	);
}

export const getServerSideProps = authRedirect;
