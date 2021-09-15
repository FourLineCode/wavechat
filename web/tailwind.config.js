const colors = require('tailwindcss/colors');

module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{ts,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				brand: colors.rose,
				dark: colors.gray,
				primary: colors.blueGray[200],
				secondary: colors.blueGray[500],
				muted: colors.blueGray[600],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar')],
};
