import { startServer } from './graphql';

const main = async () => {
	startServer();
};

main().catch((error) => {
	console.log(error);
	process.exit(1);
});
