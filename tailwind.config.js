/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
         extend: {
           animation: {
            scroll: 'scroll 10s linear infinite',
            fadeIn: 'fadeIn 0.5s ease-in',
        popIn: 'popIn 0.5s ease-out',

           },
           keyframes: {
             scroll: {
               '0%': { transform: 'translateX(100%)' },
               '100%': { transform: 'translateX(-100%)' },
             },
             fadeIn: {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            },
            popIn: {
              '0%': { transform: 'scale(0.9)', opacity: 0 },
              '100%': { transform: 'scale(1)', opacity: 1 },
            },
    
           },
         },
       },
  plugins: [],
}

