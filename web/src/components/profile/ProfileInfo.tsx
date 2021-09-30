import { FaCog } from 'react-icons/fa';
import { ProfileDetails } from 'src/components/profile/ProfileDetails';
import { useAvatarUrl } from 'src/hooks/useAvatarUrl';
import { useModal } from 'src/hooks/useModal';
import { useAuth } from 'src/store/useAuth';

export function ProfileInfo() {
	const user = useAuth().user;
	const avatarUrl = useAvatarUrl(user);
	const { show, onOpen, onClose } = useModal();

	return (
		<div className='flex items-center justify-between w-full h-16 p-2 bg-dark-900'>
			<div className='flex items-center space-x-2'>
				<img
					src={avatarUrl}
					alt='avatar'
					onClick={onOpen}
					className='w-12 h-full rounded-full cursor-pointer hover:ring-2 ring-brand-500'
				/>
				<div>
					<div
						onClick={onOpen}
						className='font-semibold cursor-pointer text-primary hover:underline line-clamp-1'
					>
						{user?.displayName}
					</div>
					<div className='flex items-center text-sm text-muted'>
						<span className='mr-0.5 text-green-500'>•</span>
						<span>Online</span>
					</div>
				</div>
			</div>
			<div className='p-2 transition transform rounded-full cursor-pointer hover:scale-110 text-dark-500 hover:text-dark-300 hover:bg-dark-700'>
				<FaCog size='20' />
			</div>
			{user && <ProfileDetails userId={user.id} show={show} onClose={onClose} />}
		</div>
	);
}
