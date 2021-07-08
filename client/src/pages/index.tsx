import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import { Layout } from 'src/components/Layouts/Layout';
import { Button } from 'src/components/ui/Button';
import { config } from 'src/internal/config';

export default function Index() {
	const router = useRouter();

	return (
		<Layout>
			<div className='w-screen h-screen'>
				<div className='w-full h-2/3 bg-gradient-to-b to-dark-800 from-brand-900'>
					<div className='flex justify-between w-full h-16 px-16 pt-12 lg:px-48'>
						<Link href='/'>
							<div className='flex items-center cursor-pointer'>
								<Image src={config.iconUrl} alt='logo' height='40' width='60' />
								<span className='ml-2 text-3xl italic font-bold'>
									<span>Wave</span>
									<span className='underline'>Chat</span>
								</span>
							</div>
						</Link>
						<div className='flex space-x-4 font-medium text-md'>
							{/* TODO: add modal for about */}
							<div className='cursor-pointer hover:underline '>About</div>
							<Link passHref href='mailto:akmal3535.ah@gmail.com'>
								<a target='_blank' className='hover:underline'>
									Contact
								</a>
							</Link>
						</div>
					</div>
					<div className='flex flex-col items-center justify-center w-full pt-44'>
						<div className='text-6xl font-bold'>Imagine A Place ...</div>
						<div className='pt-8 text-lg text-center'>
							<div>
								... where you can belong to a school club, a gaming group, or a
								worldwide art community.
							</div>
							<div>
								Where just you and a handful of friends can spend time together.
							</div>
							<div>
								A place that makes it easy to talk every day and hang out more
								often.
							</div>
						</div>
						<div className='flex py-6 space-x-2'>
							<Button onClick={() => router.push('/signup')}>
								Sign up new account
							</Button>
							<Button variant='outlined' onClick={() => router.push('/signin')}>
								Sign in with existing account
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
