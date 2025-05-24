import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        metro: {
          blue: "#2C5282",
          "light-blue": "#63B3ED",
          "dark-blue": "#1A365D",
          gray: "#4A5568",
          "light-gray": "#E2E8F0",
          "dark-gray": "#2D3748",
          white: "#FFFFFF",
          "off-white": "#F7FAFC",
          dark: "#070314",
          "dark-accent": "#0c0621",
          "dark-highlight": "#130a2a",
          "dark-border": "#291d3d",
          "true-black": "#000000",
          "black-card": "#0c0621",
          "black-highlight": "#130a2a",
          purple: "#9d4edd",
          "light-purple": "#c77dff",
          "dark-purple": "#7b2cbf",
        },
        theme: {
          "royal-primary": "#7C3AED",
          "royal-secondary": "#C4B5FD",
          "royal-accent": "#4C1D95",
          "royal-background": "#170e30",
          "royal-card": "#221441",
          "royal-border": "rgba(124, 58, 237, 0.2)",

          "ocean-primary": "#0EA5E9",
          "ocean-secondary": "#BAE6FD",
          "ocean-accent": "#0369A1",
          "ocean-background": "#0f172a",
          "ocean-card": "#1e293b",
          "ocean-border": "rgba(14, 165, 233, 0.2)",

          "emerald-primary": "#10B981",
          "emerald-secondary": "#A7F3D0",
          "emerald-accent": "#047857",
          "emerald-background": "#082f2f",
          "emerald-card": "#134e4a",
          "emerald-border": "rgba(16, 185, 129, 0.2)",

          "sunset-primary": "#F97316",
          "sunset-secondary": "#FFEDD5",
          "sunset-accent": "#C2410C",
          "sunset-background": "#27151a",
          "sunset-card": "#3a1c20",
          "sunset-border": "rgba(249, 115, 22, 0.2)",

          "pink-primary": "#EC4899",
          "pink-secondary": "#FCE7F3",
          "pink-accent": "#DB2777",
          "pink-background": "#2d1c2d",
          "pink-card": "#441f43",
          "pink-border": "rgba(236, 72, 153, 0.2)",

          "green-primary": "#51C2B9",
          "green-secondary": "#edf7f0",
          "green-accent": "#27ae60",
          "green-background": "#ffffff",
          "green-card": "#f0f9f4",
          "green-border": "rgba(46, 204, 113, 0.2)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "glass-shine": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "0 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 8px 2px rgba(255, 0, 255, 0.4)" },
          "50%": { boxShadow: "0 0 16px 4px rgba(255, 0, 255, 0.6)" },
        },
        "neon-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px 2px rgba(255, 0, 255, 0.2)" },
          "50%": { boxShadow: "0 0 20px 5px rgba(255, 0, 255, 0.4)" },
        },
        "float-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "slide-left-right": {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(10px)" },
          "100%": { transform: "translateX(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        'float': "float 3s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "glass-shine": "glass-shine 3s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "neon-pulse": "neon-pulse 3s ease-in-out infinite",
        "float-subtle": "float-subtle 3s ease-in-out infinite",
        'shimmer': "shimmer 2.5s infinite linear",
		'slide-left-right': 'slide-left-right 2s ease-in-out infinite',
		'marquee': 'marquee 5s linear infinite',
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.07)",
        "glass-hover": "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
        soft: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
        neo: "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",
        "dark-glow": "0 4px 20px 0 rgba(255, 255, 255, 0.2)",
        "dark-card": "0 8px 16px rgba(0, 0, 0, 0.2)",
        "dark-hover": "0 12px 24px rgba(0, 0, 0, 0.3)",
        "dark-neon":
          "0 0 10px rgba(255, 255, 255, 0.2), inset 0 0 5px rgba(255, 255, 255, 0.1)",
        "purple-glow":
          "0 4px 20px 0 rgba(157, 78, 221, 0.25), inset 0 0 5px rgba(157, 78, 221, 0.1)",
        "purple-card": "0 8px 16px rgba(10, 3, 27, 0.2)",
        "purple-hover":
          "0 12px 24px rgba(10, 3, 27, 0.3), 0 0 10px rgba(157, 78, 221, 0.2)",
        "purple-neon":
          "0 0 10px rgba(157, 78, 221, 0.3), inset 0 0 5px rgba(157, 78, 221, 0.15)",
        "royal-glow":
          "0 4px 20px 0 rgba(124, 58, 237, 0.25), inset 0 0 5px rgba(124, 58, 237, 0.1)",
        "ocean-glow":
          "0 4px 20px 0 rgba(14, 165, 233, 0.25), inset 0 0 5px rgba(14, 165, 233, 0.1)",
        "emerald-glow":
          "0 4px 20px 0 rgba(16, 185, 129, 0.25), inset 0 0 5px rgba(16, 185, 129, 0.1)",
        "sunset-glow":
          "0 4px 20px 0 rgba(249, 115, 22, 0.25), inset 0 0 5px rgba(249, 115, 22, 0.1)",
        "pink-glow":
          "0 4px 20px 0 rgba(236, 72, 153, 0.25), inset 0 0 5px rgba(236, 72, 153, 0.1)",
        "green-glow":
          "0 4px 20px 0 rgba(46, 204, 113, 0.25), inset 0 0 5px rgba(46, 204, 113, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-subtle":
          "linear-gradient(to right, rgba(249, 250, 251, 0.8), rgba(255, 255, 255, 0.8))",
        "dark-gradient": "linear-gradient(to right, #000000, #080808)",
        "dark-glow-gradient":
          "linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
        "glass-gradient":
          "linear-gradient(120deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05), rgba(255,255,255,0.1))",
        "black-shine":
          "linear-gradient(120deg, rgba(20,20,20,0.2), rgba(10,10,10,0.1), rgba(20,20,20,0.2))",
        "purple-gradient": "linear-gradient(to right, #0c0621, #130a2a)",
        "purple-glow-gradient":
          "linear-gradient(to right, rgba(157, 78, 221, 0.15), rgba(157, 78, 221, 0.05))",
        "purple-shine":
          "linear-gradient(120deg, rgba(30,20,40,0.2), rgba(10,5,20,0.1), rgba(30,20,40,0.2))",
        "royal-gradient": "linear-gradient(to right, #7C3AED, #4C1D95)",
        "ocean-gradient": "linear-gradient(to right, #0EA5E9, #0369A1)",
        "emerald-gradient": "linear-gradient(to right, #10B981, #047857)",
        "sunset-gradient": "linear-gradient(to right, #F97316, #C2410C)",
        "pink-gradient": "linear-gradient(to right, #EC4899, #DB2777)",
        "green-gradient": "linear-gradient(to right, #2ecc71, #27ae60)",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
} satisfies Config;
