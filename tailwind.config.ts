import type { Config } from 'tailwindcss';

/**
 * Design system for the portfolio.
 *
 * Light-first and deliberately warm: a coral accent (#FF5A36) on a paper
 * substrate (#FFFCF8) with warm-neutral ink. Nothing here is a stock Tailwind
 * hue — the greys carry a red bias so they sit on the paper instead of going
 * cold against it.
 *
 * Surfaces belong to one of three depth planes (base → raised → floating),
 * separated by layered, coral-tinted shadows rather than borders alone.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2.5rem', '2xl': '3rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        // --- Substrate -----------------------------------------------------
        paper: {
          DEFAULT: '#FFFCF8', // page background
          warm: '#FDF6EE', // banded sections
          sunk: '#F7F0E7', // wells / inset areas
        },
        // Warm neutral ramp. Text and hairlines both come from here.
        ink: {
          DEFAULT: '#2E2721',
          50: '#FAF7F4',
          100: '#F2EDE7',
          200: '#E4DCD3',
          300: '#CDC2B6',
          400: '#7A6E61',
          500: '#665B50',
          600: '#514740',
          700: '#463D35',
          800: '#2E2721',
          900: '#1A150F',
          950: '#0F0C08',
        },
        // --- Accent --------------------------------------------------------
        coral: {
          DEFAULT: '#FF5A36',
          50: '#FFF3EF',
          100: '#FFE3DB',
          200: '#FFC5B4',
          300: '#FF9E85',
          400: '#FF7A57',
          500: '#FF5A36',
          600: '#D63914',
          700: '#C02F11',
          800: '#95240D',
          900: '#6D1A09',
        },
        // Secondary warm tone — gradients and highlight washes only.
        amber: {
          DEFAULT: '#FF9E2C',
          400: '#FFB55A',
          500: '#FF9E2C',
          600: '#E07E10',
        },
        // --- Semantic surfaces (depth planes) -------------------------------
        surface: {
          base: '#FFFCF8',
          raised: '#FFFFFF',
          elevated: '#FFFFFF',
          sunk: '#F7F0E7',
        },
        line: {
          subtle: 'rgba(46, 39, 33, 0.06)',
          DEFAULT: 'rgba(46, 39, 33, 0.10)',
          strong: 'rgba(46, 39, 33, 0.16)',
        },
        // --- shadcn token bridge --------------------------------------------
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        ring: 'hsl(var(--ring))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },

      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      fontSize: {
        // Fluid display sizes — no layout jump between breakpoints.
        'display-sm': [
          'clamp(1.85rem, 1.4rem + 2.2vw, 2.75rem)',
          { lineHeight: '1.08', letterSpacing: '-0.03em' },
        ],
        'display-md': [
          'clamp(2.25rem, 1.6rem + 3.4vw, 3.75rem)',
          { lineHeight: '1.04', letterSpacing: '-0.035em' },
        ],
        'display-lg': [
          'clamp(2.6rem, 1.7rem + 4.6vw, 5rem)',
          { lineHeight: '1', letterSpacing: '-0.04em' },
        ],
      },

      // Intentional spacing scale used for section rhythm.
      spacing: {
        section: '5.5rem',
        'section-lg': '7.5rem',
        gutter: '1.25rem',
      },

      borderRadius: {
        xs: '0.375rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      boxShadow: {
        // Layered and coral-tinted — never a flat neutral drop shadow.
        soft: '0 1px 2px rgba(74,42,28,0.04), 0 2px 8px -2px rgba(74,42,28,0.06)',
        raised:
          '0 1px 2px rgba(74,42,28,0.05), 0 4px 12px -2px rgba(74,42,28,0.07), 0 12px 32px -12px rgba(255,90,54,0.14)',
        floating:
          '0 2px 4px rgba(74,42,28,0.06), 0 12px 28px -8px rgba(74,42,28,0.09), 0 32px 64px -32px rgba(255,90,54,0.22)',
        glow: '0 0 0 1px rgba(255,90,54,0.22), 0 8px 28px -8px rgba(255,90,54,0.35)',
        'glow-sm': '0 0 20px -6px rgba(255,90,54,0.45)',
      },

      backgroundImage: {
        'accent-sheen':
          'linear-gradient(110deg, rgba(255,90,54,0) 20%, rgba(255,90,54,0.28) 45%, rgba(255,158,44,0.22) 55%, rgba(255,90,54,0) 80%)',
      },

      transitionTimingFunction: {
        // Spring-flavoured easing; used everywhere instead of `ease-in-out`.
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },

      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translate3d(0, 14px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        sheen: {
          from: { transform: 'translate3d(-100%, 0, 0)' },
          to: { transform: 'translate3d(100%, 0, 0)' },
        },
        'pulse-ring': {
          '0%': { opacity: '0.5', transform: 'scale(0.9)' },
          '70%, 100%': { opacity: '0', transform: 'scale(2.2)' },
        },
        'flow-dash': {
          to: { strokeDashoffset: '-24' },
        },
      },

      animation: {
        'fade-up': 'fade-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        sheen: 'sheen 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'pulse-ring': 'pulse-ring 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'flow-dash': 'flow-dash 1s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
