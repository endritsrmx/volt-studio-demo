import type { Config } from "tailwindcss";

/**
 * Colors are driven by CSS variables that are injected from
 * src/config/site.ts (theme section) in src/app/layout.tsx.
 * Change the theme there – not here.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "768px",
      md: "992px",
      lg: "1280px",
      xl: "1440px",
      "2xl": "1920px",
    },
    extend: {
      colors: {
        bg: "rgb(var(--c-bg) / <alpha-value>)",
        fg: "rgb(var(--c-fg) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        "accent-ink": "rgb(var(--c-accent-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        panel: "rgb(var(--c-panel) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: { pill: "1000px" },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
        "in-out-ui": "cubic-bezier(0.645, 0.045, 0.355, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      backdropBlur: { glass: "74px" },
    },
  },
  plugins: [],
};
export default config;
