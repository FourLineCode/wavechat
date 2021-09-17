module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['imgur.com', 'avatars.githubusercontent.com', 'avatars.dicebear.com'],
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
};
