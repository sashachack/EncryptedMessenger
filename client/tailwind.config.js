/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg2': '#1B2432',
                'bg3': '#2C2B3C',
                'send-blue': '#70B4CA',
                'soft-red': '#B76D68',
                'text-grey': '#A8A8A866',
                'text-grey2': '#A8A8A8dd',
            },
        },
    },
    plugins: [
        plugin(function({ addUtilities }) {
            addUtilities({
                '.no-scrollbar': {
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none',
                },
            })
        }),
    ],
}