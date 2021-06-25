import Head from 'next/head';

export default function Index() {
	return (
		<div>
			<Head>
				<title>WaveChat</title>
				<meta name='description' content='WaveChat Frontend' />
			</Head>
			<main className='flex items-center justify-center w-screen h-screen'>
				<div className='text-4xl'>Wave Chat</div>
			</main>
		</div>
	);
}
