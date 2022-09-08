/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                lime: "#91c788",
                main: "#5c5c5c",
                desc: "#374A59",
                gray: {
                    custom: "#9FA3A9",
                },
                slate: {
                    850: "#111c44",
                },
                favorite: "#D1FAE5",
                favText: "#064E3B",
            },
            fontFamily: {
                Open: ['"Open Sans"'],
                Mont: ['"Montserrat"'],
                Manrope: ['"Manrope"'],
            },
            width: {
                1400: "800px",
            },
        },
    },
    plugins: [],
}
