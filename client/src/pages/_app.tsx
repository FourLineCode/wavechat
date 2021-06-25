import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { client } from 'src/apollo/client';
import '../styles/tailwind.css';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}
