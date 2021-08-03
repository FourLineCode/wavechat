import { FriendsList } from 'src/components/friends/FriendsList';
import { Layout } from 'src/components/layouts/Layout';
import { NavigationSidebar } from 'src/components/navigations/NavigationSidebar';
import { Button } from 'src/components/ui/Button';
import { useAuth } from 'src/store/useAuth';
import { authRedirect } from 'src/utils/authRedirect';

export default function Friends() {
	const auth = useAuth();

	return (
		<Layout title='Friends' desc='WaveChat | Friends'>
			<div className='flex w-screen h-screen'>
				<NavigationSidebar />
				<FriendsList />
				<div className='flex flex-col items-center justify-center flex-1 bg-dark-700'>
					<div className='text-4xl font-bold text-light'>/Friends</div>
					<Button onClick={auth.signout}>Sign out</Button>
				</div>
			</div>
		</Layout>
	);
}

export const getServerSideProps = authRedirect;
