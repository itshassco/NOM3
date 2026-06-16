/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070713',
        navy: '#1D276E',
        iris: '#481C76',
        violet: '#6F4BB1',
        lavender: '#D8D3EC',
        mist: '#F5F4FA',
        peach: '#FDD0B5',
        graphite: '#423737',
      },
      fontFamily: {
        sans: ['Inter Display', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter Display', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 30px 90px rgba(29, 39, 110, 0.22)',
        soft: '0 18px 60px rgba(7, 7, 19, 0.12)',
      },
    },
  },
  plugins: [],
};
