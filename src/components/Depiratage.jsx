import { useEffect, useMemo, useState } from 'react'
import { animate, motion } from 'framer-motion'
import LettreDecoupee from './LettreDecoupee.jsx'
import { EASE } from './Anime.jsx'

// Séquence jouée quand le bon code est saisi, avant d'ouvrir le site restauré.
const LIGNES = [
  '> connexion au serveur nuitmmi.fr…',
  '> vérification du code………… OK',
  '> expulsion du hacker…',
  '> restauration des fichiers…',
]
const STYLES = ['JB', 'NM', 'JT', 'BB', 'NA', 'PC']
const COULEURS = ['#F3C137', '#F1F1F1', '#D4D4D4', '#F3C137']

// Moments clés (en secondes)
const T_LETTRES = 1.1
const T_TAMPON = 1.8
const T_SORTIE = 2.5
const T_FIN = 2.8

function Confettis() {
  const bouts = useMemo(
    () => Array.from({ length: 46 }, (_, i) => ({
      x: (Math.random() - 0.5) * 1400,
      y: (Math.random() - 0.8) * 900,
      r: Math.random() * 720 - 360,
      w: 8 + Math.random() * 14,
      h: 6 + Math.random() * 10,
      c: COULEURS[i % COULEURS.length],
      d: Math.random() * 0.25,
    })),
    [],
  )
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
      {bouts.map((b, i) => (
        <motion.span
          key={i}
          className="absolute block"
          style={{ width: b.w, height: b.h, background: b.c }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
          animate={{ x: b.x, y: [0, b.y, b.y + 500], rotate: b.r, opacity: [1, 1, 0] }}
          transition={{ duration: 1.4, delay: b.d, ease: 'easeOut', times: [0, 0.45, 1] }}
        />
      ))}
    </div>
  )
}

export default function Depiratage({ code, onFin }) {
  const [pourcent, setPourcent] = useState(0)
  const [fete, setFete] = useState(false) // confettis montés seulement au moment du tampon
  // Position de départ de chaque lettre, éparpillée dans l'écran
  const departs = useMemo(() => code.map(() => ({ x: (Math.random() - 0.5) * 900, y: (Math.random() - 0.5) * 700, rotate: Math.random() * 360 - 180 })), [code])

  useEffect(() => {
    const barre = animate(0, 100, { duration: 0.7, delay: 0.3, ease: 'easeInOut', onUpdate: (v) => setPourcent(Math.round(v)) })
    const confettis = setTimeout(() => setFete(true), T_TAMPON * 1000)
    const fin = setTimeout(onFin, T_FIN * 1000)
    return () => { barre.stop(); clearTimeout(confettis); clearTimeout(fin) }
  }, [onFin])

  return (
    <motion.div
      role="alert"
      aria-live="assertive"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-grisnoir px-4"
      initial={{ clipPath: 'inset(50% 0 50% 0)' }}
      animate={{ clipPath: 'inset(0% 0 0% 0)', x: [0, -16, 14, -9, 6, 0] }}
      transition={{ clipPath: { duration: 0.3, ease: EASE }, x: { duration: 0.4, delay: T_TAMPON + 0.12 } }}
    >
      <span className="sr-only">Code correct : le site est en cours de restauration.</span>

      {/* Bandes de glitch à l'ouverture */}
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="absolute inset-x-0 h-[6vh] bg-jaune mix-blend-difference"
          style={{ top: `${15 + i * 21}%` }}
          initial={{ x: '-100%' }}
          animate={{ x: ['-100%', '30%', '100%'] }}
          transition={{ duration: 0.35, delay: 0.05 + i * 0.05, ease: 'linear' }}
        />
      ))}

      {/* Lignes de terminal + chargement */}
      <motion.div
        className="w-full max-w-[640px] font-courier text-[15px] font-bold text-jaune md:text-[18px]"
        animate={{ opacity: [1, 1, 0], y: [0, 0, -40] }}
        transition={{ duration: T_LETTRES, times: [0, 0.85, 1] }}
      >
        {LIGNES.map((l, i) => (
          <motion.p
            key={l}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.15, duration: 0.2 }}
            className="py-1"
          >
            {l}
          </motion.p>
        ))}
        <div className="mt-5 flex items-center gap-4">
          <div className="h-[14px] flex-1 overflow-hidden border-2 border-jaune">
            <div className="h-full bg-jaune" style={{ width: `${pourcent}%` }} />
          </div>
          <span className="w-[54px] text-right tabular-nums">{pourcent}%</span>
        </div>
      </motion.div>

      {/* Le code se recolle, lettre par lettre */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-wrap justify-center gap-1 px-4 sm:gap-2"
        animate={{ y: [0, 0, -120], scale: [1, 1, 0.8], opacity: [1, 1, 0.25] }}
        transition={{ duration: T_SORTIE, times: [0, T_TAMPON / T_SORTIE, 1] }}
      >
        {code.map((l, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, ...departs[i], scale: 2 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16, delay: T_LETTRES + i * 0.03 }}
          >
            <LettreDecoupee lettre={l} style={STYLES[i % STYLES.length]} rotation={i % 2 ? 3 : -3} taille={84} />
          </motion.span>
        ))}
      </motion.div>

      {/* Tampon « SAUVÉ » + secousse */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex size-[200px] flex-col items-center justify-center rounded-full border-[6px] border-grisnoir bg-jaune text-grisnoir shadow-[6px_8px_0_0_#0e0d12] md:size-[260px]"
        initial={{ scale: 4, rotate: -40, opacity: 0 }}
        animate={{ scale: 1, rotate: -8, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18, delay: T_TAMPON }}
        style={{ x: '-50%', y: '-50%', marginTop: 110 }}
      >
        <span className="font-shoulders text-[52px] font-black leading-none md:text-[68px]">SAUVÉ</span>
        <span className="font-courier text-[18px] font-bold md:text-[22px]">hacker expulsé</span>
      </motion.div>
      {fete && <Confettis />}

      {/* Cercle blanc (fond du site restauré) qui recouvre tout → page restaurée */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-blanc"
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        animate={{ clipPath: 'circle(150% at 50% 50%)' }}
        transition={{ duration: T_FIN - T_SORTIE, delay: T_SORTIE, ease: [0.7, 0, 0.3, 1] }}
      />
    </motion.div>
  )
}
