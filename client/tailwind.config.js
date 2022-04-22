const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        screens: {
            xxs: '280px',
            xs: '350px',
            ...defaultTheme.screens,
        },
        extend: {},
        fontFamily: {
            amatic: ['Amatic SC'],
        },
    },
    variants: {
        opacity: ({ after }) => after(['disabled']),
    },
    plugins: [],
};
