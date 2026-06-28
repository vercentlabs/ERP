import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          600: "#155eef",
          900: "#102a56",
        },
      },
    },
  },
  plugins: [],
};

export default config;
