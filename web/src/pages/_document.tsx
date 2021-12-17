import Document, {
	DocumentContext,
	Head as DocumentHead,
	Html,
	Main,
	NextScript,
} from "next/document";
import Head from "next/head";

export default class CustomDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en">
				<DocumentHead />
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href={
							"https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap"
						}
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
