import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // MTS Trucking Incorporated brand — industrial black + chevron red
        brand: {
          black: "#111111",
          red: "#E3000F",
          "red-dark": "#B00009",
          "red-light": "#FCE5E7",
          charcoal: "#4A4A4A",
          steel: "#7A7A7A",
          ash: "#F4F4F5",
          white: "#FFFFFF",
          // Backward-compat aliases (existing components use bg-brand-teal / text-brand-navy)
          teal: "#E3000F",
          "teal-dark": "#B00009",
          "teal-light": "#FCE5E7",
          navy: "#111111",
          "navy-light": "#1F1F1F",
          gray: "#4A4A4A",
          "bg": "#F4F4F5",
          "border": "#D4D4D8",
        },
        status: {
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
          info: "#3B82F6",
          neutral: "#6B7280",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-roboto)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-montserrat)", "var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "var(--font-roboto)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #E3000F 0%, #B00009 100%)",
        "chevron-pattern": "repeating-linear-gradient(45deg, #111111 0 1px, transparent 1px 8px)",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        "card-hover": "0 10px 25px -5px rgb(0 0 0 / 0.08), 0 4px 10px -4px rgb(0 0 0 / 0.05)",
        glow: "0 0 0 1px rgba(227,0,15,0.4), 0 0 20px rgba(227,0,15,0.25)",
        industrial: "4px 4px 0px 0px rgba(17,17,17,1)",
        "industrial-red": "4px 4px 0px 0px rgba(227,0,15,1)",
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
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(227,0,15,0.5)" },
          "50%": { boxShadow: "0 0 0 8px rgba(227,0,15,0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 1.5s infinite",
        "pulse-glow": "pulse-glow 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
