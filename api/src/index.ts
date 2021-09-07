import { startServer } from 'src/graphql';

async function main() {
	await startServer();
}

main().catch((error) => {
	console.log(error);
	process.exit(1);
});
