import { initializeHandlers } from "src/handler";
import { getConfig } from "src/internal/config";
import { initializeServer } from "src/server";

async function main() {
	const config = getConfig();
	const server = await initializeServer(config);

	await initializeHandlers(server.io);

	server.listen(config.port, "0.0.0.0", () => {
		console.log(`\nRTC Server is now running on http://localhost:${config.port}\n`);
	});
}

main().catch(console.error);
