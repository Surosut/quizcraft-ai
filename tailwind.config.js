/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f1ff',
          100: '#ebe5ff',
          200: '#d9d0ff',
          300: '#bfaeff',
          400: '#a082ff',
          500: '#6C5CE7',
          600: '#5a3fd6',
          700: '#4c31b8',
          800: '#3f2a96',
          900: '#35257b',
        },
        accent: {
          50: '#effffe',
          100: '#c7fffe',
          200: '#90fffe',
          300: '#51f5f3',
          400: '#00CEC9',
          500: '#06b3ae',
          600: '#0a908d',
          700: '#0f7371',
          800: '#125b5a',
          900: '#144c4b',
        },
        warm: {
          50: '#fffdf0',
          100: '#fff9d6',
          200: '#fff2a8',
          300: '#FDCB6E',
          400: '#f5b731',
          500: '#ec9d0f',
          600: '#d17a09',
          700: '#ad580c',
          800: '#8d4511',
          900: '#743913',
        },
        dark: {
          900: '#0F0F23',
          800: '#1A1A2E',
          700: '#16213E',
          600: '#1e2a4a',
          500: '#2a3a5c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-in': 'bounceIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'confetti-fall': 'confettiFall 1.5s ease-in forwards',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: 0 },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-100%) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: 0 },
        },
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
    },
  },
  plugins: [],
};
