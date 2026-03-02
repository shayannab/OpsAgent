/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: '#1a1a2e',
                'navy-light': '#16213e',
                'navy-card': '#0f3460',
                green: {
                    ops: '#00e97b',
                },
                yellow: {
                    ops: '#ffd74a',
                },
                teal: {
                    ops: '#58d1bd',
                },
                coral: '#ff6b6b',
                purple: '#a855f7',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'blob': 'blob 7s infinite',
                'blob-slow': 'blob 12s infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'typewriter': 'typewriter 3s steps(40) forwards',
                'float': 'float 6s ease-in-out infinite',
                'spin-slow': 'spin 8s linear infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.4s ease-out forwards',
                'shimmer': 'shimmer 1.5s infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 15px 3px #00e97b55, 0 0 30px 6px #00e97b22' },
                    '50%': { boxShadow: '0 0 30px 8px #00e97b88, 0 0 60px 15px #00e97b44' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                fadeIn: {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                slideUp: {
                    from: { opacity: '0', transform: 'translateY(20px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
        },
    },
    plugins: [],
}
