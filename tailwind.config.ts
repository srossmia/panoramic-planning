// tailwind.config.ts

import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#272727',
        accent: '#A4B792',
        muted: '#555555',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        card: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        28: '7rem', // Matches sm:pt-28
      },
    },
  },
  plugins: [typography],
};

export default config;
