/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				bebas: ['"bebas neue"', "Arial", "sans-serif"],
				lato: ["lato", "Arial", "sans-serif"],
			},
		},
	},
	plugins: [],
};
