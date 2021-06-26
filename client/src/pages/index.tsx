import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { TestQuery, TestQueryVariables } from 'src/apollo/__generated__/types';

export default function Index() {
	const { data } = useQuery<TestQuery, TestQueryVariables>(
		gql`
			query Test($name: String!) {
				hello(name: $name)
			}
		`,
		{
			variables: {
				name: 'Akmal',
			},
		}
	);

	return (
		<div>
			<Head>
				<title>WaveChat</title>
				<meta name='description' content='WaveChat Frontend' />
			</Head>
			<main className='flex flex-col items-center justify-center w-screen h-screen'>
				<div className='text-4xl'>Wave Chat</div>
				<div className='text-4xl'>GraphQL data: {data?.hello}</div>
			</main>
		</div>
	);
}
