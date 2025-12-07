// tailwind.config.ts
import type { Config } from "tailwindcss";
import tailwindcssTypography from '@tailwindcss/typography';

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
            light: "rgb(var(--rh-cyan-light) / <alpha-value>)",
          },
          orange: {
            DEFAULT: "rgb(var(--rh-orange) / <alpha-value>)",
            light: "rgb(var(--rh-orange-light) / <alpha-value>)",
          },
          purple: {
            DEFAULT: "rgb(var(--rh-purple) / <alpha-value>)",
            light: "rgb(var(--rh-purple-light) / <alpha-value>)",
          },
          green: "rgb(var(--rh-green) / <alpha-value>)",
          red: "rgb(var(--rh-red) / <alpha-value>)",
        },
        rave: {
          pink: "rgb(var(--rh-pink-light) / <alpha-value>)",
          cyan: "rgb(var(--rh-cyan) / <alpha-value>)",
          orange: "rgb(var(--rh-orange) / <alpha-value>)",
          purple: "rgb(var(--rh-purple) / <alpha-value>)",
          green: "rgb(var(--rh-green) / <alpha-value>)",
        },
        bg: {
          page: "rgb(var(--rh-bg-page) / <alpha-value>)",
          card: "rgb(var(--rh-bg-card) / <alpha-value>)",
        },
        "rh-cyan-light": "rgb(var(--rh-cyan-light) / <alpha-value>)",
        "rh-orange-light": "rgb(var(--rh-orange-light) / <alpha-value>)",
        "rh-pink-light": "rgb(var(--rh-pink-light) / <alpha-value>)",
        "rh-pink-dark": "rgb(var(--rh-pink-dark) / <alpha-value>)",
        "rh-purple-light": "rgb(var(--rh-purple-light) / <alpha-value>)",
      },
      borderRadius: {
        "rh-lg": "var(--rh-radius-lg)",
        "rh-md": "var(--rh-radius-md)",
      },
      boxShadow: {
        "rh-soft": "0 18px 45px rgba(0,0,0,0.75)",        // Components
        "rh-medium": "0 8px 24px rgba(0,0,0,0.6)",        // Cards
        "rh-hard": "0 24px 60px rgba(0,0,0,0.9)",         // Modals
        "rh-glow": "0 0 24px rgba(246, 104, 121, 0.6)",   // Glow effects
      },
      fontSize: {
        'xxs': ['0.688rem', { lineHeight: '1rem' }],      // 11px
        'xs': ['0.75rem', { lineHeight: '1rem' }],         // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],     // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],        // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],     // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],      // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],         // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],    // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],      // 36px
      },
      letterSpacing: {
        'wider': '0.2em',
        'wider-lg': '0.25em',
        'wider-xl': '0.3em',
      },
    },
  },
  plugins: [
    tailwindcssTypography,
  ],
};

export default config;