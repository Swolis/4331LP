// tailwind.config.js

module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
      // other plugins if needed
    ],
  };