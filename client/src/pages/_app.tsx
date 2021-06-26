import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { client } from 'src/apollo/client';
import { SocketProvider } from 'src/socket/SocketContextProvider';
import '../styles/tailwind.css';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<SocketProvider>
				<Component {...pageProps} />
			</SocketProvider>
		</ApolloProvider>
	);
}
