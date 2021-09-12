import { DirectMessages } from 'src/components/friends/DirectMessages';
import { FriendsList } from 'src/components/friends/FriendsList';
import { Layout } from 'src/components/layouts/Layout';
import { NavigationSidebar } from 'src/components/navigations/NavigationSidebar';
import { SidebarWithProfile } from 'src/components/profile/SidebarWithProfile';
import { Button } from 'src/components/ui/Button';
import { useAuth } from 'src/store/useAuth';
import { authRedirect } from 'src/utils/redirects/auth';

export default function Friends() {
	const auth = useAuth();

	return (
		<Layout title='Friends' desc='WaveChat | Friends'>
			<div className='flex w-screen h-screen'>
				<NavigationSidebar />
				<SidebarWithProfile component={DirectMessages} />
				<div className='flex flex-col items-center justify-center flex-1 bg-dark-700'>
					<div className='text-4xl font-bold text-primary'>/Friends</div>
					<Button onClick={auth.signout}>Sign out</Button>
				</div>
				<FriendsList />
			</div>
		</Layout>
	);
}

export const getServerSideProps = authRedirect;
