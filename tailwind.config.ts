// tailwind.config.ts
import type { Config } from "tailwindcss";
import tailwindcssTypography from '@tailwindcss/typography';

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
      backgroundImage: {
        'linear-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'linear-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'zoom-in': 'zoom-in 0.2s ease-out',
      },
    },
  },
  plugins: [
    tailwindcssTypography,
  ],
};

export default config;