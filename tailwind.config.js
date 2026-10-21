/** Jetons repris des styles Figma « SAE - Nuit MMI » (onglet Prototype). */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // site piraté / restauré
        bleu: '#151147',
        jaune: '#F3C137',
        grisnoir: '#1B1B1C',
        blanc: '#F1F1F1',
        gris: '#D4D4D4',
        // accueil
        fond: '#F4F4F1',
        encre: '#101010',
        nuit: '#1B1652',
        or: '#F6C445',
        papier: '#EAE6DA',
        noir: '#0E0D12',
        creme: '#F4F2EC',
        pierre: '#EBE9E1',
        perle: '#EDEDEB',
        carte: '#BABABA',
      },
      fontFamily: {
        shoulders: ['"Big Shoulders Display"', 'Impact', 'sans-serif'],
        bodoni: ['"Bodoni Moda"', 'Didot', 'Georgia', 'serif'],
        rubik: ['"Rubik Mono One"', 'monospace'],
        glitch: ['"Rubik Glitch"', '"Rubik Mono One"', 'monospace'],
        courier: ['"Courier Prime"', '"Courier New"', 'monospace'],
        archivo: ['"Archivo Black"', 'sans-serif'],
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { page: '1440px' },
    },
  },
  plugins: [],
}
