import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { client } from 'src/apollo/client';
import { SocketProvider } from 'src/socket/SocketContextProvider';
import '../styles/tailwind.css';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<SocketProvider>
				<Component {...pageProps} />
				<Toaster
					position='bottom-center'
					gutter={12}
					toastOptions={{
						duration: 2500,
					}}
				/>
			</SocketProvider>
		</ApolloProvider>
	);
}
