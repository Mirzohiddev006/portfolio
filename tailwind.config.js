/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#00ff41',
          lime: '#39ff14',
          cyan: '#00ffff',
          pink: '#ff00ff',
          orange: '#ff6600',
        },
        void: {
          black: '#0a0a0a',
          deep: '#050505',
          surface: '#0f0f0f',
          elevated: '#141414',
        },
        cyber: {
          dark: '#0d1117',
          grid: '#1a1a2e',
          accent: '#16213e',
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'flicker': 'flicker 0.15s infinite',
        'scan-line': 'scan-line 8s linear infinite',
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 1s linear infinite',
        'cyber-scan': 'cyber-scan 2s ease-in-out infinite',
        'border-flow': 'border-flow 3s linear infinite',
        'typewriter': 'typewriter 4s steps(40) 1s forwards',
        'blink': 'blink 1s step-end infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 20px #00ff41',
            textShadow: '0 0 5px #00ff41, 0 0 10px #00ff41'
          },
          '50%': { 
            boxShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41',
            textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41'
          },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'cyber-scan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'typewriter': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'slide-up': {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'scale-in': {
          'from': { transform: 'scale(0.95)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
        'rotate-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            filter: 'brightness(1) drop-shadow(0 0 10px #00ff41)'
          },
          '50%': { 
            filter: 'brightness(1.2) drop-shadow(0 0 20px #00ff41)'
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon': '0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 20px #00ff41',
        'neon-lg': '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41, 0 0 80px #00ff41',
        'neon-cyan': '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #00ffff',
        'neon-pink': '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff',
        'inner-glow': 'inset 0 0 20px rgba(0, 255, 65, 0.1)',
        'cyber': '0 4px 30px rgba(0, 255, 65, 0.1)',
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'neon-border': 'linear-gradient(90deg, #00ff41, #00ffff, #ff00ff, #00ff41)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
}
