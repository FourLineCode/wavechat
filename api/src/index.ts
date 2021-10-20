import { startServer } from 'src/graphql';

// Entry point for api server
async function main() {
	await startServer();
}

main().catch(console.error);
