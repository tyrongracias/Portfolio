import tailwindcssAnimate from 'tailwindcss-animate';
import type { Config } from 'tailwindcss';

const config = /** @type {Config} */ ({
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          accent: "hsl(var(--secondary-accent))",
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
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        error: "hsl(var(--error))",
        info: "hsl(var(--info))",
      },
      fontFamily: {
        sans: ['"Cal Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        secondary: ['Satoshi', 'sans-serif'],
      },
      fontSize: {
        'h1': ['100px', { lineHeight: '0.9em', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h2': ['48px', { lineHeight: '1.4em', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['22px', { lineHeight: '1.5em', fontWeight: '600' }],
        'h4': ['18px', { lineHeight: '1.5em', fontWeight: '600' }],
        'h5': ['16px', { lineHeight: '1.5em', fontWeight: '600' }],
        'h6': ['15px', { lineHeight: '1.5em', fontWeight: '600' }],
        'body': ['15px', { lineHeight: '1.6em', fontWeight: '400' }],
        'small': ['13px', { fontWeight: '400' }],
        'large': ['17px', { fontWeight: '400' }],
        'ui': ['13px', { lineHeight: '1.5em', fontWeight: '600' }],
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
        '64': '16rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'button': '50px',
        'card': '30px',
        'input': '16px',
        'badge': '10px',
      },
      maxWidth: {
        'container': '1200px',
      },
      backdropBlur: {
        'navbar': '20px',
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
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(30px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-up": "slide-up 0.5s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
});

export default config;
