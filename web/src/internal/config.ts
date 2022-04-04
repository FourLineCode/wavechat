const isDev = process.env.NODE_ENV === "development";

interface Config {
  isDev: boolean;
  iconUrl: string;
  apiEndpoint: string;
  wsEndpoint: string;
  wsPath: string;
}

export let config: Config = {
  isDev: isDev,
  iconUrl: "/logo.png",
  apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:5000/graphql",
  wsEndpoint: process.env.NEXT_PUBLIC_WS_ENDPOINT || "http://localhost:8000",
  wsPath: "/ws",
};
