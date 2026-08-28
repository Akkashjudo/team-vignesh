import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#080808", // near black — page ground
          elevated: "#111111", // elevated black — cards, surfaces
          line: "#1E1E1E", // hairline borders on dark
          muted: "#2A2A2A",
        },
        bone: {
          DEFAULT: "#F5F3EE", // warm off-white — light sections
          line: "#DCD8CF",
          muted: "#8C877D",
        },
        accent: {
          // <alpha-value> lets bg-accent/40, border-accent/60 etc. work while
          // the actual colour still comes from a single CSS variable.
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          text: "rgb(var(--accent-text-rgb) / <alpha-value>)", // on dark
          ink: "rgb(var(--accent-ink-rgb) / <alpha-value>)", // on light
          soft: "var(--accent-soft)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Body copy stays comfortably readable: 16–18px desktop, 15–17px mobile.
        body: ["clamp(1rem, 0.96rem + 0.2vw, 1.125rem)", { lineHeight: "1.65" }],
        "body-sm": ["clamp(0.9375rem, 0.9rem + 0.15vw, 1.0625rem)", { lineHeight: "1.6" }],
        lead: ["clamp(1.0625rem, 1rem + 0.45vw, 1.375rem)", { lineHeight: "1.5" }],
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "2px",
        md: "3px",
        lg: "4px",
      },
      maxWidth: {
        shell: "1440px",
        prose: "68ch",
      },
      spacing: {
        gutter: "clamp(1.25rem, 4vw, 4.5rem)",
        section: "clamp(4.5rem, 9vw, 9.5rem)",
      },
      letterSpacing: {
        tightest: "-0.045em",
        display: "-0.03em",
        label: "0.18em",
        wider: "0.28em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        inout: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        "line-grow": { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scroll-cue": {
          "0%": { transform: "translateY(-60%)", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "translateY(120%)", opacity: "0" },
        },
        sweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(300%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "scroll-cue": "scroll-cue 2.2s cubic-bezier(0.65,0,0.35,1) infinite",
        sweep: "sweep 1.4s cubic-bezier(0.65,0,0.35,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
