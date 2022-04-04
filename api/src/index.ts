import { startServer } from "src/graphql";
import { getConfig } from "src/internal/config";

// Entry point for api server
async function main() {
  const config = getConfig();
  await startServer(config);
}

main().catch(console.error);
