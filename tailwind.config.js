import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                roboto: ['Roboto', 'sans-serif'],
            },
            maxHeight: {
                '148': '44rem',
            },
            padding: {
                '59': '59%',
            },
            flexGrow: {
                2: '2'
            },
            maxWidth: {
                '1/2': '50%',
                '16': '16rem'
            },
            height: {
                'chat': 'calc(100vh - 110px)',
                'mobile-chat-height': 'calc(100vh - 106px)'
            }
        },
    },

    plugins: [forms],
};
