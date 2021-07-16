import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import { TestQuery, TestQueryVariables } from 'src/apollo/__generated__/types';
import { Layout } from 'src/components/Layouts/Layout';
import { NavBar } from 'src/components/Layouts/NavBar';
import { Button } from 'src/components/ui/Button';

export default function Index() {
	const router = useRouter();

	useQuery<TestQuery, TestQueryVariables>(
		gql`
			query Test($name: String!) {
				hello(name: $name)
			}
		`,
		{
			variables: {
				name: 'Akmal',
			},
			onCompleted: (data) => {
				console.log('Graphql Response: ', data.hello);
			},
		}
	);

	return (
		<Layout>
			<div className='w-screen h-screen'>
				<div className='w-full h-2/3 bg-gradient-to-b to-dark-800 from-brand-800'>
					<NavBar />
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
