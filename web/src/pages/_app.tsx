import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { client } from 'src/apollo/client';
import { useSocket } from 'src/socket/useSocket';
import { useAuth } from 'src/store/useAuth';
import '../styles/tailwind.css';

export default function MyApp({ Component, pageProps }: AppProps) {
	const auth = useAuth();
	const socket = useSocket();

	useEffect(() => {
		if (pageProps.authorized) {
			auth.setAuthInfo({ authorized: pageProps.authorized, user: pageProps.authorizedUser });
		}
	}, [pageProps]);

	useEffect(() => {
		socket.connection.on('message', (args) => {
			console.log(args);
		});
	});

	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
			<Toaster
				position='bottom-center'
				gutter={12}
				toastOptions={{
					duration: 2500,
				}}
			/>
		</ApolloProvider>
	);
}
