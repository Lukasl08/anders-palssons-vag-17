import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        gold: {
          DEFAULT: "#E7B765",
          50: "#FBF3E3",
          100: "#F6E6C5",
          200: "#EFD49B",
          300: "#E7B765",
          400: "#DFA53F",
          500: "#C98A28",
          600: "#A06D1E",
        },
        steel: {
          DEFAULT: "#A7B7C7",
          100: "#D7DEE6",
          200: "#A7B7C7",
          300: "#7E91A4",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(231,183,101,0.18), 0 18px 50px -12px rgba(231,183,101,0.28)",
        card: "0 20px 60px -24px rgba(0,0,0,0.7)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F6E6C5 0%, #E7B765 45%, #C98A28 100%)",
        "radial-fade": "radial-gradient(60% 60% at 50% 0%, rgba(231,183,101,0.16) 0%, rgba(231,183,101,0) 70%)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "spin-slow": "spin-slow 8s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
