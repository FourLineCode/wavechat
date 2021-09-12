import { FriendsList } from 'src/components/friends/FriendsList';
import { Layout } from 'src/components/layouts/Layout';
import { NavigationSidebar } from 'src/components/navigations/NavigationSidebar';
import { authRedirect } from 'src/utils/redirects/auth';

// TODO: idk if this is a page or should be a modal
export default function CreateServer() {
	return (
		<Layout title='Create Server' desc='WaveChat | Create a new Server'>
			<div className='flex w-screen h-screen'>
				<NavigationSidebar />
				<div className='flex flex-col items-center justify-center flex-1 bg-dark-700'>
					<div className='text-4xl font-bold text-primary'>Create Server</div>
				</div>
				<FriendsList />
			</div>
		</Layout>
	);
}

export const getServerSideProps = authRedirect;
