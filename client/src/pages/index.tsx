import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { TestQuery, TestQueryVariables } from 'src/apollo/__generated__/types';
import { useSocket } from 'src/hooks/useSocket';

export default function Index() {
	const socket = useSocket();
	const [socketData, setSocketData] = useState<any>();

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

	useEffect(() => {
		socket.emit('message', { msg: 'hello server' });

		socket.on('reply', (arg) => {
			setSocketData(arg);
		});
	}, []);

	return (
		<div>
			<Head>
				<title>WaveChat</title>
				<meta name='description' content='WaveChat Frontend' />
			</Head>
			<main className='flex flex-col items-center justify-center w-screen h-screen'>
				<div className='text-4xl'>Wave Chat</div>
				<div className='text-4xl'>GraphQL data: {data?.hello}</div>
				<div className='text-4xl'>Socket.io data: {JSON.stringify(socketData)}</div>
			</main>
		</div>
	);
}
