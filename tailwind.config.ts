// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          soft: "#140415",
        },
        rave: {
          pink: "#ff4b8b",
          orange: "#ff9f4b",
          cyan: "#4be2ff",
          purple: "#7c3aed",
        },
      },
      boxShadow: {
        card: "0 18px 45px rgba(0,0,0,0.6)",
        glow: "0 0 40px rgba(255, 75, 139, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;