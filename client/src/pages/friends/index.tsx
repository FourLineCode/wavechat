import { Layout } from 'src/components/Layouts/Layout';
import { Button } from 'src/components/ui/Button';
import { useAuth } from 'src/store/useAuth';
import { authRedirect } from 'src/utils/authRedirect';

export default function Friends() {
	const auth = useAuth();

	return (
		<Layout title='Friends' desc='WaveChat | Friends'>
			<div className='flex flex-col items-center justify-center w-screen h-screen bg-dark-700'>
				<div className='text-4xl font-bold text-light'>/Friends</div>
				<Button onClick={auth.signout}>Sign out</Button>
			</div>
		</Layout>
	);
}

export const getServerSideProps = authRedirect;
