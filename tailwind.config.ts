import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(204, 20%, 98%)",
        foreground: "hsl(204, 10%, 10%)",
        card: {
          DEFAULT: "hsl(204, 15%, 95%)",
          foreground: "hsl(204, 10%, 10%)",
        },
        popover: {
          DEFAULT: "hsl(204, 15%, 95%)",
          foreground: "hsl(204, 10%, 10%)",
        },
        primary: {
          DEFAULT: "#19b5ff", // Updated to your exact color
          foreground: "hsl(198, 10%, 10%)", // Adjusted for contrast
        },
        secondary: {
          DEFAULT: "hsl(204, 50%, 60%)",
          foreground: "hsl(204, 10%, 10%)",
        },
        muted: {
          DEFAULT: "hsl(204, 15%, 85%)",
          foreground: "hsl(204, 10%, 30%)",
        },
        accent: {
          DEFAULT: "hsl(174, 70%, 40%)",
          foreground: "hsl(174, 10%, 98%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 70%, 50%)",
          foreground: "hsl(0, 10%, 98%)",
        },
        border: "hsl(204, 20%, 80%)",
        input: "hsl(204, 15%, 95%)",
        ring: "hsl(204, 90%, 34%)",
        chart: {
          "1": "hsl(204, 90%, 34%)",
          "2": "hsl(204, 50%, 60%)",
          "3": "hsl(174, 70%, 40%)",
          "4": "hsl(204, 15%, 85%)",
          "5": "hsl(204, 20%, 98%)",
        },
        sidebar: {
          DEFAULT: "hsl(204, 15%, 93%)",
          foreground: "hsl(204, 10%, 10%)",
          primary: "#19b5ff", // Updated to match new primary
          "primary-foreground": "hsl(198, 10%, 10%)", // Adjusted for contrast
          accent: "hsl(174, 70%, 40%)",
          "accent-foreground": "hsl(174, 10%, 98%)",
          border: "hsl(204, 20%, 80%)",
          ring: "hsl(204, 90%, 34%)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(20px)" },
        },
        "spin-reverse": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "spin-reverse": "spin-reverse 2s linear infinite",
      },
      transitionDelay: {
        100: "100ms",
        200: "200ms",
        300: "300ms",
        400: "400ms",
        500: "500ms",
      },
      perspective: {
        "1000": "1000px",
      },
      transformStyle: {
        "3d": "preserve-3d",
      },
      backfaceVisibility: {
        hidden: "hidden",
      },
      rotate: {
        "y-180": "rotateY(180deg)",
        "y-0": "rotateY(0deg)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
