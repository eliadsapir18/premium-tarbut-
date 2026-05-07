import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050505",
          900: "#0a0a0a",
          800: "#111111",
          700: "#171717",
          600: "#1f1f1f",
          500: "#2a2a2a",
        },
        gold: {
          50: "#fbf6e4",
          100: "#f5ead0",
          200: "#ecd596",
          300: "#e0bf5f",
          400: "#d4af37",
          500: "#c9a961",
          600: "#a8862b",
          700: "#7a6420",
          800: "#5a4917",
          900: "#3d3110",
        },
      },
      fontFamily: {
        sans: ["var(--font-heebo)", "Heebo", "Assistant", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(212,175,55,0.25), 0 10px 40px -15px rgba(212,175,55,0.45)",
        "gold-lg": "0 0 0 1px rgba(212,175,55,0.35), 0 24px 60px -20px rgba(212,175,55,0.55)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #f5ead0 0%, #d4af37 35%, #a8862b 70%, #d4af37 100%)",
        "radial-gold":
          "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,0.18) 0%, rgba(0,0,0,0) 70%)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.83  0 0 0 0 0.69  0 0 0 0 0.22  0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "drift-a": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)", opacity: "0.45" },
          "50%": { transform: "translate3d(80px,-50px,0) scale(1.12)", opacity: "0.75" },
        },
        "drift-b": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)", opacity: "0.3" },
          "50%": { transform: "translate3d(-70px,60px,0) scale(1.18)", opacity: "0.6" },
        },
        "drift-c": {
          "0%, 100%": { transform: "translate3d(0,0,0)", opacity: "0.4" },
          "33%": { transform: "translate3d(50px,40px,0)", opacity: "0.65" },
          "66%": { transform: "translate3d(-40px,30px,0)", opacity: "0.5" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.06)" },
        },
        "sparkle": {
          "0%, 100%": { opacity: "0", transform: "scale(0.6) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1.2) rotate(180deg)" },
        },
        "twinkle": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        "sweep": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        shimmer: "shimmer 6s linear infinite",
        "drift-a": "drift-a 14s ease-in-out infinite",
        "drift-b": "drift-b 18s ease-in-out infinite",
        "drift-c": "drift-c 22s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4.5s ease-in-out infinite",
        "sparkle": "sparkle 3.5s ease-in-out infinite",
        "twinkle": "twinkle 2.8s ease-in-out infinite",
        "sweep": "sweep 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
