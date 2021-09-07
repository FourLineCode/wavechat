import { startServer } from 'src/graphql';

// Entry point for api server
async function main() {
	await startServer();
}

main().catch((error) => {
	console.log(error);
	process.exit(1);
});
