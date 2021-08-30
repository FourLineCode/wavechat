import { FaCog } from 'react-icons/fa';
import { useAvatarUrl } from 'src/hooks/useAvatarUrl';
import { useAuth } from 'src/store/useAuth';

export function ProfileInfo() {
	const user = useAuth().user;
	const avatarUrl = useAvatarUrl(user?.avatarUrl, user?.username);

	return (
		<div className='flex items-center justify-between w-full h-20 p-2 bg-dark-900'>
			<div className='flex items-center space-x-2'>
				<img
					src={avatarUrl}
					alt='avatar'
					className='w-16 h-full rounded-full cursor-pointer hover:ring-2 ring-brand-500'
				/>
				<div className='space-y-1'>
					<div className='font-semibold cursor-pointer text-light hover:underline'>
						{user?.displayName}
					</div>
					<div className='flex items-center text-sm text-dark-600'>
						<span className='mr-0.5 text-green-500'>•</span>
						<span>Online</span>
					</div>
				</div>
			</div>
			<div className='p-2 transition transform rounded-full cursor-pointer hover:scale-110 text-dark-500 hover:text-dark-300 hover:bg-dark-700'>
				<FaCog size='20' />
			</div>
		</div>
	);
}
