import { startServer } from './graphql';

async function main() {
	startServer();
}

main().catch((error) => {
	console.log(error);
	process.exit(1);
});
