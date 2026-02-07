/**
 * Tailwind config
 * Extracted from ib-python-mission-control/index.html on 2025-12-14
 * DO NOT modify logic - only moved from inline
 */

      tailwind.config = {
        theme: {
          extend: {
            colors: {
              nasa: {
                orange: '#CC5500',
                blue: '#1A2B4C',
                cream: '#F0EAD6',
                grey: '#8C8C9E',
                black: '#0B0D17',
                teal: '#4D8B8B',
              }
            },
            fontFamily: {
              mono: ['"Space Mono"', 'monospace'],
              display: ['"Chakra Petch"', 'sans-serif'],
            },
            backgroundImage: {
              'blueprint': "radial-gradient(#4D8B8B 1px, transparent 1px)",
            },
            animation: {
              'fade-in': 'fadeIn 0.5s ease-out',
              'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
              fadeIn: {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' },
              },
              slideUp: {
                '0%': { opacity: '0', transform: 'translateY(20px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
              },
            }
          }
        }
      }
    