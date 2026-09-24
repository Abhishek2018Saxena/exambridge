/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  safelist: [
    // Dynamic color classes used in stat cards, quick actions, etc.
    {
      pattern: /(bg|text|border)-(teal|blue|amber|emerald|red|slate)-(50|100|200|600|700)/,
    },
  ],
  plugins: [],
};
