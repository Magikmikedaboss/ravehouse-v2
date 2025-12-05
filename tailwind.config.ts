// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rh: {
          pink: {
            shell: "var(--rh-pink-shell-vdark)",
            dark: "var(--rh-pink-dark)",
            light: "var(--rh-pink-light)",
          },
          gray: {
            tin: "var(--rh-tin)",
            dark: "var(--rh-tin-dark)",
            pewter: "var(--rh-pewter-vdark)",
          },
          cyan: "#4be2ff",
          orange: "#ff9f4b",
          purple: "#7c3aed",
        },
        bg: {
          page: "var(--rh-bg-page)",
          card: "var(--rh-bg-card)",
        },
      },
      borderRadius: {
        "rh-lg": "var(--rh-radius-lg)",
        "rh-md": "var(--rh-radius-md)",
      },
      boxShadow: {
        "rh-soft": "0 18px 45px rgba(0,0,0,0.75)",
      },
    },
  },
  plugins: [],
};

export default config;