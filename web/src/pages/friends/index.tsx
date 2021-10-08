import { FriendsInfo } from 'src/components/friends/FriendsInfo';
import { Layout } from 'src/components/layouts/Layout';
import { DirectMessages } from 'src/components/messages/DirectMessages';
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
				<FriendsInfo />
			</div>
		</Layout>
	);
}

export const getServerSideProps = authRedirect;
