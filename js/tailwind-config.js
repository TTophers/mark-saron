
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          background: '#0F1215',
          foreground: '#D8D9D8',
          muted: '#2F383F',
          border: '#5A5553',
          silver: '#A8A9AB',

          // Gold / warm tones
          'gold-accent': '#FFC854',
          'gold-accent-light': '#E6C57C',
          'gold-accent-dark': '#D9B76C',

          // Helpers
          'nav-hover': '#E6C57C',
          'text-muted-warm': '#5A5553',
        },

        backgroundImage: {
          'hero-gradient': 'linear-gradient(135deg, #111109 0%, #5A5553 100%)',
          'hero-gradient2': 'linear-gradient(145deg, #111109 0%, #5A5553 50%, #B89F5D 100%)',
          'hero-gradient3': 'linear-gradient(140deg, #111109 0%, #5A5553 80%, #A7893C 100%)',
        },

        // ✅ New animations merged in
        animation: {
          'scroll-left': 'scroll-left 30s linear infinite',
          'fade-in': 'fade-in 1s ease-out',
        },

        keyframes: {
          'scroll-left': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
          'fade-in': {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
        },
      },
    },
  }
