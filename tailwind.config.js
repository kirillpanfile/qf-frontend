/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                lime: '#91c788',
                main: '#5c5c5c',
                desc: '#374A59',
                gray: '#9FA3A9',
                favorite: '#D1FAE5',
                favText: '#064E3B'
            },
            fontFamily: {
                'Open': ['"Open Sans"'],
                'Mont': ['"Montserrat"'],
                'Manrope': ['"Manrope"']
            }
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
