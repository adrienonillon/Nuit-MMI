import { motion } from 'framer-motion'

// Flash plein écran quand le code est faux : bandes décalées + « ACCÈS REFUSÉ ».
// Rejoué à chaque erreur (le parent change la `key`).
const BANDES = [
  { top: '8%', h: '7%', c: 'bg-jaune', dx: 60 },
  { top: '22%', h: '3%', c: 'bg-bleu', dx: -90 },
  { top: '41%', h: '11%', c: 'bg-grisnoir', dx: 40 },
  { top: '63%', h: '4%', c: 'bg-jaune', dx: -50 },
  { top: '78%', h: '9%', c: 'bg-bleu', dx: 80 },
]

export default function ErreurGlitch() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 1.1, times: [0, 0.75, 1] }}
    >
      {/* Écran qui « saute » */}
      <motion.div
        className="absolute inset-0 bg-grisnoir"
        animate={{ opacity: [0, 0.85, 0, 0.6, 0, 0.3, 0] }}
        transition={{ duration: 0.6, ease: 'linear' }}
      />
      {BANDES.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute inset-x-0 ${b.c} mix-blend-difference`}
          style={{ top: b.top, height: b.h }}
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: [0, b.dx, -b.dx / 2, b.dx / 3, 0], opacity: [0, 1, 0.7, 1, 0] }}
          transition={{ duration: 0.55, delay: i * 0.04, ease: 'linear' }}
        />
      ))}
      <motion.p
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-glitch leading-none text-jaune"
        style={{ fontSize: 'clamp(48px, 10vw, 150px)', textShadow: '6px 0 #151147, -6px 0 #D4D4D4' }}
        initial={{ scale: 1.4, opacity: 0 }}
        animate={{ scale: [1.4, 1, 1.02, 1], opacity: [0, 1, 1, 0], x: [0, -12, 10, -4, 0] }}
        transition={{ duration: 1, times: [0, 0.15, 0.7, 1] }}
      >
        ACCÈS REFUSÉ
      </motion.p>
    </motion.div>
  )
}
