module.exports = {
	content: [
		'./src/**/*.svelte',
		// may also want to include HTML files
		'./src/**/*.html'
	],
	darkMode: 'class',
	theme: {
		fontFamily: {
			serif: ['"Times New Roman"', 'serif'],
			sans: ['"IBM Plex Sans"', 'sans-serif'],
			mono: ['"IBM Plex Mono"', 'monospace']
		},
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						'--tw-prose-bullets': theme('colors.black')
					}
				}
			})
		}
	},
	variants: {},
	plugins: [require('@tailwindcss/typography')]
};
