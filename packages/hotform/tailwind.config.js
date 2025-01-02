/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
    // Important: Allow Tailwind classes to work in the package
    corePlugins: {
      preflight: false,
    },
    important: true,
  };