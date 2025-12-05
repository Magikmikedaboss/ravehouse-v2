// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        rh: {
          pink: {
            shell: "rgb(var(--rh-pink-shell-vdark) / <alpha-value>)",
            dark: "rgb(var(--rh-pink-dark) / <alpha-value>)",
            light: "rgb(var(--rh-pink-light) / <alpha-value>)",
          },
          gray: {
            tin: "rgb(var(--rh-tin) / <alpha-value>)",
            dark: "rgb(var(--rh-tin-dark) / <alpha-value>)",
            pewter: "rgb(var(--rh-pewter-vdark) / <alpha-value>)",
          },
          cyan: {
            DEFAULT: "rgb(var(--rh-cyan) / <alpha-value>)",
            light: "rgb(var(--rh-cyan-light) / <alpha-value>)", // Alias for consistency
          },
          orange: {
            DEFAULT: "rgb(var(--rh-orange) / <alpha-value>)",
            light: "rgb(var(--rh-orange-light) / <alpha-value>)", // Alias for consistency
          },
          purple: {
            DEFAULT: "rgb(var(--rh-purple) / <alpha-value>)",
            light: "rgb(var(--rh-purple-light) / <alpha-value>)", // Alias for consistency
          },
        },
        // Add rave- aliases for backward compatibility
        rave: {
          pink: "rgb(var(--rh-pink-light) / <alpha-value>)",
          cyan: "rgb(var(--rh-cyan-light) / <alpha-value>)",
          orange: "rgb(var(--rh-orange-light) / <alpha-value>)",
          purple: "rgb(var(--rh-purple-light) / <alpha-value>)",
        },
        bg: {
          page: "rgb(var(--rh-bg-page) / <alpha-value>)",
          card: "rgb(var(--rh-bg-card) / <alpha-value>)",
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