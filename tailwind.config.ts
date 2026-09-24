import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        // Same tone as the logo background (public/logo.png edges), so the logo
        // blends into the page instead of sitting in a visible square.
        black: '#060d13',
      },
    },
  },
  plugins: [],
};

export default config;
