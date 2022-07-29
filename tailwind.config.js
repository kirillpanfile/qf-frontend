/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                lime: '#91c788',
            },
        },
        // screens: {
        //     tablet: '991.98px',
        //     mobile: '767.98px',
        //     mobileSmall: '479.98px',
        //     // $mobile: em(767.98); // Телефоны L
        //     // $mobileSmall: em(479.98); // Телефоны S
        // },
    },
    plugins: [],
}
