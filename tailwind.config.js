/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'checked']
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Karla', 'sans-serif'],
        
      },
    },
    screens: {
      'xs': '375px', // Para dispositivos móveis pequenos
      'sm': '640px', // Para tablets
      'md': '768px', // Para tablets maiores
      'lg': '1024px', // Para laptops
      'xl': '1440px', // Para desktops
    },
  }
}