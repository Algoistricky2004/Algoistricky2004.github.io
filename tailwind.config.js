/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        body: ['Outfit', 'sans-serif'],
      },
      colors: {
        cyber: {
          bg: '#080c10',
          surface: '#0d1117',
          card: '#111820',
          border: '#1e2d3d',
          cyan: '#00f5d4',
          coral: '#ff6b6b',
          gold: '#ffd93d',
          purple: '#9d4edd',
          dim: '#4a5568',
          text: '#e2e8f0',
          muted: '#718096',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glow: {
          'from': { boxShadow: '0 0 5px #00f5d4, 0 0 10px #00f5d4' },
          'to': { boxShadow: '0 0 20px #00f5d4, 0 0 40px #00f5d4, 0 0 60px #00f5d4' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
