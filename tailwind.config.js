/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Font Family
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      // Colors - Gaming Fantasy Palette
      colors: {
        // Primary Gaming Colors
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1', // Main indigo
          600: '#4F46E5',
          700: '#3730A3',
          800: '#312E81',
          900: '#1E1B4B',
        },
        
        // Accent Gold
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B', // Main gold
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        
        // Element Colors
        element: {
          fire: '#EF4444',
          water: '#3B82F6',
          earth: '#10B981',
          air: '#8B5CF6',
        },
        
        // Crimson
        crimson: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#DC2626', // Main crimson
          600: '#B91C1C',
          700: '#991B1B',
          800: '#7F1D1D',
          900: '#63171B',
        },
        
        // Neutral Scale
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      
      // Typography Scale (Modular Ratio 1.25)
      fontSize: {
        'hero': ['96px', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['64px', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['48px', { lineHeight: '1.2', fontWeight: '600' }],
        'h3': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['20px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['14px', { lineHeight: '1.4', fontWeight: '500' }],
        'mono': ['14px', { lineHeight: '1.2', fontWeight: '600' }],
      },
      
      // Spacing Token System (4px base)
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
        '2xl': '64px',
        '3xl': '96px',
        '4xl': '128px',
      },
      
      // Border Radius
      borderRadius: {
        'sharp': '0px',
        'subtle': '8px',
        'friendly': '16px',
        'premium': '24px',
        'full': '50%',
      },
      
      // Box Shadow
      boxShadow: {
        'game': '0 8px 32px rgba(99, 102, 241, 0.08)',
        'game-lg': '0 16px 48px rgba(99, 102, 241, 0.12)',
        'glow': '0 0 60px rgba(99, 102, 241, 0.3)',
        'gold-glow': '0 0 40px rgba(245, 158, 11, 0.4)',
        'premium': '0 24px 64px rgba(0, 0, 0, 0.12)',
      },
      
      // Animation
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'roll': 'roll 2s cubic-bezier(0.4, 0, 0.2, 1)',
        'level-up': 'levelUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-10px)' },
          '50%': { transform: 'translateY(0px)' },
        },
        glow: {
          '0%': { 
            'box-shadow': '0 0 20px rgba(99, 102, 241, 0.3)',
            transform: 'scale(1)'
          },
          '100%': { 
            'box-shadow': '0 0 40px rgba(99, 102, 241, 0.6)',
            transform: 'scale(1.02)'
          },
        },
        roll: {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg)' },
          '100%': { transform: 'rotateX(720deg) rotateY(360deg)' },
        },
        levelUp: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      
      // 3D Transform
      perspective: {
        '800': '800px',
        '1200': '1200px',
      },
      
      // Z-Index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // Grid
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(320px, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(280px, 1fr))',
      },
      
      // Background
      backgroundImage: {
        'gradient-game': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #F59E0B 100%)',
        'gradient-element-fire': 'linear-gradient(135deg, #EF4444 0%, #F97316 100%)',
        'gradient-element-water': 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
        'gradient-element-earth': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        'gradient-element-air': 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
      },
      
      // Glassmorphism
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}