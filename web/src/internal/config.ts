const isDev = process.env.NODE_ENV === "development";

export const config = {
	isDev: isDev,
	iconUrl: "https://imgur.com/RaMcHkH.png",
	apiEndpoint: "http://localhost:5000/graphql",
	wsEndpoint: "http://localhost:8000",
	wsPath: "/ws",
};
