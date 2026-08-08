import type { Config } from 'tailwindcss';

/**
 * Design system for the portfolio.
 *
 * Palette is intentionally *not* a Tailwind default hue — it is derived from a
 * single electric-azure accent (`hsl(205 100% 60%)`) sitting on a graphite /
 * dark-navy substrate. Every surface belongs to one of three depth planes
 * (base → elevated → floating) so the glass layering stays coherent.
 */
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2.5rem', '2xl': '3rem' },
      screens: { '2xl': '1360px' },
    },
    extend: {
      colors: {
        // --- Substrate -----------------------------------------------------
        void: '#05070A', // page background
        graphite: {
          DEFAULT: '#0B0F14',
          50: '#F4F6F9',
          100: '#E3E8EF',
          200: '#C6CEDA',
          300: '#98A4B6',
          400: '#6B7A90',
          500: '#4A586C',
          600: '#33404F',
          700: '#232D39',
          800: '#161D26',
          900: '#0B0F14',
          950: '#05070A',
        },
        navy: {
          DEFAULT: '#0A1220',
          800: '#0D1826',
          900: '#080E18',
          950: '#04080F',
        },
        silver: {
          DEFAULT: '#A9B3C4',
          bright: '#E9EEF6',
          muted: '#78849A',
          dim: '#4E596C',
        },
        // --- Accent --------------------------------------------------------
        electric: {
          DEFAULT: '#33A5FF',
          50: '#EBF6FF',
          100: '#D2ECFF',
          200: '#A5D8FF',
          300: '#70C1FF',
          400: '#33A5FF',
          500: '#0B87F0',
          600: '#0069C4',
          700: '#014E93',
          800: '#043763',
          900: '#04223C',
        },
        cyanide: {
          // secondary glow used only for gradients / 3D lighting
          DEFAULT: '#4CDDF0',
          400: '#4CDDF0',
          600: '#12A8BF',
        },
        // --- Semantic surfaces (depth planes) -------------------------------
        surface: {
          base: '#05070A',
          raised: '#0B0F14',
          elevated: '#10161F',
          floating: '#161D28',
        },
        line: {
          subtle: 'rgba(233, 238, 246, 0.06)',
          DEFAULT: 'rgba(233, 238, 246, 0.10)',
          strong: 'rgba(233, 238, 246, 0.18)',
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
        'display-sm': ['clamp(2rem, 1.4rem + 3vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2.5rem, 1.6rem + 4.4vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(3rem, 1.5rem + 6.6vw, 6.5rem)', { lineHeight: '0.98', letterSpacing: '-0.04em' }],
      },

      // Intentional spacing scale used for section rhythm.
      spacing: {
        section: '7.5rem',
        'section-lg': '10rem',
        gutter: '1.25rem',
      },

      borderRadius: {
        xs: '0.375rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      boxShadow: {
        // Layered, accent-tinted elevation — never a flat neutral drop shadow.
        glass:
          '0 1px 0 0 rgba(233,238,246,0.06) inset, 0 -1px 0 0 rgba(5,7,10,0.6) inset, 0 18px 40px -24px rgba(4,12,26,0.9)',
        raised:
          '0 1px 1px rgba(4,8,15,0.5), 0 4px 12px -4px rgba(4,8,15,0.6), 0 24px 48px -32px rgba(51,165,255,0.28)',
        floating:
          '0 2px 4px rgba(4,8,15,0.6), 0 12px 28px -10px rgba(4,8,15,0.7), 0 48px 96px -48px rgba(51,165,255,0.35)',
        glow: '0 0 0 1px rgba(51,165,255,0.28), 0 8px 32px -8px rgba(51,165,255,0.45)',
        'glow-sm': '0 0 24px -6px rgba(51,165,255,0.55)',
      },

      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(5,7,10,0) 0%, rgba(5,7,10,0.85) 70%, #05070A 100%)',
        'accent-sheen':
          'linear-gradient(110deg, rgba(51,165,255,0) 20%, rgba(51,165,255,0.35) 45%, rgba(76,221,240,0.25) 55%, rgba(51,165,255,0) 80%)',
        'silver-text':
          'linear-gradient(180deg, #FFFFFF 0%, #E9EEF6 40%, #8E9AAD 100%)',
      },

      transitionTimingFunction: {
        // Spring-flavoured easing; used everywhere instead of `ease-in-out`.
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },

      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translate3d(0, 16px, 0)' },
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
          '0%': { opacity: '0.6', transform: 'scale(0.9)' },
          '70%, 100%': { opacity: '0', transform: 'scale(2.2)' },
        },
        'flow-dash': {
          to: { strokeDashoffset: '-24' },
        },
      },

      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
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
