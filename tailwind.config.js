/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
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
        // Custom colors
        premiumGold: '#ffdb00',
        premiumNavy: '#253779',
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F8E9A1",
          dark: "#A17E1A",
          background: "linear-gradient(135deg, #bf953f 0%, #fcf6ba 20%, #b38728 45%, #fbf5b7 70%, #aa771c 100%)",
        },
        pink: {
          DEFAULT: "#FF3E96",
          light: "#FF69B4",
          dark: "#C71585",
        },
        navy: {
          DEFAULT: "#0A1E3C",
          light: "#1E3A5F",
          dark: "#05101F",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)"],
        display: ["var(--font-playfair-display)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 3s linear infinite",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #bf953f 0%, #fcf6ba 20%, #b38728 45%, #fbf5b7 70%, #aa771c 100%)",
      },
      boxShadow: {
        "nav-active-underline-black": "0 1px 1px rgba(0,0,0,0.2)",
      },
      scale: {
        102: '1.02',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
