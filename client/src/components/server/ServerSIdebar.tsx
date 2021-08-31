import { useRouter } from 'next/router';

export function ServerSidebar() {
	const router = useRouter();
	const serverId = router.query.serverId as string;

	return (
		<div className='flex flex-col flex-1 w-64 px-2 py-4 bg-dark-800 xl:w-80'>
			<div className='text-2xl font-semibold'>Server #{serverId} Info</div>
		</div>
	);
}
