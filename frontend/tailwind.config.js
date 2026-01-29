/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3e2723",
                secondary: "#d4a373",
                bg: "#fdfbf7",
                card: "#ffffff",
                "user-msg": "#faedcd",
                "bot-msg": "#ffffff",
                text: "#4a4a4a",
            },
            fontFamily: {
                sans: ['Lato', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
        },
    },
    plugins: [],
}
