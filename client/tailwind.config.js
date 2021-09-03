const colors = require('tailwindcss/colors');

module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{ts,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				brand: colors.rose,
				light: colors.blueGray[200],
				dark: colors.blueGray,
			},
		},
		spinner: (theme) => ({
			default: {
				color: 'white',
				size: '1em',
				border: '2px',
				speed: '500ms',
			},
		}),
	},
	variants: {
		extend: {},
	},
	plugins: [require('tailwindcss-spinner'), require('@tailwindcss/line-clamp')],
};
