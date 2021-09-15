import { useRouter } from 'next/router';
import { FriendsInfo } from 'src/components/friends/FriendsInfo';
import { Layout } from 'src/components/layouts/Layout';
import { NavigationSidebar } from 'src/components/navigations/NavigationSidebar';
import { SidebarWithProfile } from 'src/components/profile/SidebarWithProfile';
import { ServerSidebar } from 'src/components/server/ServerSIdebar';
import { authRedirect } from 'src/utils/redirects/auth';

export default function ServerById() {
	const router = useRouter();
	const serverId = router.query.serverId as string;

	return (
		<Layout title='Server' desc='WaveChat | Server description'>
			<div className='flex w-screen h-screen'>
				<NavigationSidebar />
				<SidebarWithProfile component={ServerSidebar} />
				<div className='flex flex-col items-center justify-center flex-1 bg-dark-700'>
					<div className='text-4xl font-bold text-primary'>Server #{serverId}</div>
				</div>
				<FriendsInfo />
			</div>
		</Layout>
	);
}

export const getServerSideProps = authRedirect;
