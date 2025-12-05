// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        rh: {
          pink: {
            shell: "rgb(from var(--rh-pink-shell-vdark) r g b / <alpha-value>)",
            dark: "rgb(from var(--rh-pink-dark) r g b / <alpha-value>)",
            light: "rgb(from var(--rh-pink-light) r g b / <alpha-value>)",
          },
          gray: {
            tin: "rgb(from var(--rh-tin) r g b / <alpha-value>)",
            dark: "rgb(from var(--rh-tin-dark) r g b / <alpha-value>)",
            pewter: "rgb(from var(--rh-pewter-vdark) r g b / <alpha-value>)",
          },
          cyan: {
            DEFAULT: "rgb(from var(--rh-cyan) r g b / <alpha-value>)",
            light: "rgb(from var(--rh-cyan) r g b / <alpha-value>)", // Alias for consistency
          },
          orange: {
            DEFAULT: "rgb(from var(--rh-orange) r g b / <alpha-value>)",
            light: "rgb(from var(--rh-orange) r g b / <alpha-value>)", // Alias for consistency
          },
          purple: {
            DEFAULT: "rgb(from var(--rh-purple) r g b / <alpha-value>)",
            light: "rgb(from var(--rh-purple) r g b / <alpha-value>)", // Alias for consistency
          },
        },
        // Add rave- aliases for backward compatibility
        rave: {
          pink: "rgb(from var(--rh-pink-light) r g b / <alpha-value>)",
          cyan: "rgb(from var(--rh-cyan) r g b / <alpha-value>)",
          orange: "rgb(from var(--rh-orange) r g b / <alpha-value>)",
          purple: "rgb(from var(--rh-purple) r g b / <alpha-value>)",
        },
        bg: {
          page: "rgb(from var(--rh-bg-page) r g b / <alpha-value>)",
          card: "rgb(from var(--rh-bg-card) r g b / <alpha-value>)",
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