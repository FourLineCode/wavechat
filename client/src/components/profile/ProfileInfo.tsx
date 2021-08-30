import { useAuth } from 'src/store/useAuth';

export function ProfileInfo() {
	const auth = useAuth();

	return (
		<div className='w-full h-20 bg-dark-900'>
			<div className='text-light'>{auth.user?.displayName}</div>
		</div>
	);
}
