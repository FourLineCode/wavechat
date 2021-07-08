import { Layout } from 'src/components/Layouts/Layout';
import { Card } from 'src/components/ui/Card';

export default function SignIn() {
	return (
		<Layout title='Sign In'>
			<div className='w-screen h-screen'>
				<div className='flex items-center justify-center w-full bg-gradient-to-b from-brand-800 to-dark-800 h-2/3'>
					<Card className='w-1/4'>
						<div className='text-4xl font-bold text-center'>Sign In</div>
					</Card>
				</div>
			</div>
		</Layout>
	);
}
