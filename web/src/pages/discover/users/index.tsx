import { DiscoverNavigation } from 'src/components/discover/DiscoverNavigation';
import { DiscoverUsersPage } from 'src/components/discover/DiscoverUsersPage';
import { FriendsList } from 'src/components/friends/FriendsList';
import { Layout } from 'src/components/layouts/Layout';
import { NavigationSidebar } from 'src/components/navigations/NavigationSidebar';
import { SidebarWithProfile } from 'src/components/profile/SidebarWithProfile';
import { authRedirect } from 'src/utils/redirects/auth';

export default function DiscoverUsers() {
	return (
		<Layout title='Discover' desc='WaveChat | Discover new people and communities'>
			<div className='flex w-screen h-screen'>
				<NavigationSidebar />
				<SidebarWithProfile component={DiscoverNavigation} />
				<DiscoverUsersPage />
				<FriendsList />
			</div>
		</Layout>
	);
}

export const getServerSideProps = authRedirect;
