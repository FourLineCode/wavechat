import { useRouter } from 'next/router';
import { FriendsList } from 'src/components/friends/FriendsList';
import { Layout } from 'src/components/layouts/Layout';
import { NavigationSidebar } from 'src/components/navigations/NavigationSidebar';
import { authRedirect } from 'src/utils/redirects/auth';

export default function ServerById() {
	const router = useRouter();
	const serverId = router.query.serverId as string;

	return (
		<Layout title='Server' desc='WaveChat | Server description'>
			<div className='flex w-screen h-screen'>
				<NavigationSidebar />
				<div className='flex flex-col items-center justify-center flex-1 bg-dark-700'>
					<div className='text-4xl font-bold text-light'>Server #{serverId}</div>
				</div>
				<FriendsList />
			</div>
		</Layout>
	);
}

export const getServerSideProps = authRedirect;
