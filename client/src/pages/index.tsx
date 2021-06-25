import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';

export default function Index() {
	const { data } = useQuery(gql`
		query Test {
			hello(name: "Akmal")
		}
	`);

	return (
		<div>
			<Head>
				<title>WaveChat</title>
				<meta name='description' content='WaveChat Frontend' />
			</Head>
			<main className='flex flex-col items-center justify-center w-screen h-screen'>
				<div className='text-4xl'>Wave Chat</div>
				<div className='text-4xl'>GraphQL data: {JSON.stringify(data)}</div>
			</main>
		</div>
	);
}
