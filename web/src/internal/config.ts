const isDev = process.env.NODE_ENV === 'development';

const gqlUrl = 'http://wavechat.localhost/graphql';
const gqlLocalUrl = isDev ? 'http://api:5000/graphql' : 'http://wcp-api:5000/graphql';
const apiUrl = process.browser ? gqlUrl : gqlLocalUrl;
const wsUrl = 'http://wavechat.localhost';

export const config = {
	isDev: isDev,
	iconUrl: 'https://imgur.com/RaMcHkH.png',
	apiEndpoint: apiUrl,
	wsEndpoint: wsUrl,
	wsPath: '/ws',
};
