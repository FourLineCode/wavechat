const colors = require("tailwindcss/colors");

const customDark = {
    100: "#f8f9fa",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#6C757D",
    700: "#373D43",
    800: "#25292D",
    900: "#121417",
};

module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: colors.rose,
                dark: customDark,
                primary: customDark[200],
                secondary: customDark[500],
                muted: customDark[600],
            },
            fontFamily: {
                "open-sans": ["Open Sans", "sans-serif"],
            },
            maxHeight: {
                "4/5": "80%",
            },
        },
    },
    plugins: [
        require("tailwind-scrollbar"),
        require("@tailwindcss/line-clamp"),
        require("@tailwindcss/aspect-ratio"),
    ],
};
