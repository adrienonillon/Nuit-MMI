import { motion } from 'framer-motion'

// Composant Figma « Lettre découpée » : 6 styles de papier découpé.
// La taille est exprimée pour un écran de 1440 px et se réduit avec l'écran.
const STYLES = {
  site: {
    JT: 'bg-jaune text-grisnoir font-shoulders font-black',
    BB: 'bg-blanc text-bleu font-bodoni font-extrabold italic',
    NM: 'bg-bleu text-blanc font-glitch lettre-glitch',
    PC: 'bg-gris text-grisnoir font-courier font-bold',
    NA: 'bg-grisnoir text-jaune font-archivo',
    JB: 'bg-jaune text-bleu font-bodoni font-extrabold italic',
  },
  accueil: {
    JT: 'bg-or text-noir font-shoulders font-black',
    BB: 'bg-creme text-nuit font-bodoni font-extrabold italic',
    NM: 'bg-nuit text-creme font-glitch lettre-glitch',
    PC: 'bg-papier text-noir font-courier font-bold',
    NA: 'bg-noir text-or font-archivo',
    JB: 'bg-or text-nuit font-bodoni font-extrabold italic',
  },
}

export const tailleFluide = (px, min = 0.45) => `clamp(${(px * min).toFixed(1)}px, ${(px / 14.4).toFixed(3)}vw, ${px}px)`

export default function LettreDecoupee({ lettre, style = 'JT', rotation = 0, taille = 44, palette = 'site', fluide = true, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 leading-none whitespace-nowrap ${STYLES[palette][style]} ${className}`}
      style={{
        fontSize: fluide ? tailleFluide(taille) : `${taille}px`,
        padding: '0.091em 0.136em 0.045em',
        transform: `rotate(${-rotation}deg)`,
        filter: 'drop-shadow(0.0227em 0.0455em 0 rgba(13,13,18,0.18))',
      }}
    >
      {lettre}
    </span>
  )
}

// Animation « lettres qui tombent et se collent » (anime = true).
const CHUTE = {
  cache: (i) => ({ opacity: 0, y: -70, rotate: i % 2 ? 18 : -18, scale: 0.6 }),
  vu: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 14 } },
}

// Un mot composé de lettres découpées : [[lettre, style, rotation, taille], ...]
export function MotDecoupe({ lettres, palette = 'site', gap = 2, fluide = true, className = '', label, anime = false, delai = 0 }) {
  if (!anime) {
    return (
      <span className={`inline-flex items-center ${className}`} style={{ gap }} role={label ? 'img' : undefined} aria-label={label}>
        {lettres.map(([l, s, r, t], i) => (
          <LettreDecoupee key={i} lettre={l} style={s} rotation={r} taille={t} palette={palette} fluide={fluide} />
        ))}
      </span>
    )
  }
  return (
    <motion.span
      className={`inline-flex items-center ${className}`}
      style={{ gap }}
      role={label ? 'img' : undefined}
      aria-label={label}
      initial="cache"
      whileInView="vu"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ staggerChildren: 0.06, delayChildren: delai }}
    >
      {lettres.map(([l, s, r, t], i) => (
        <motion.span key={i} custom={i} variants={CHUTE} whileHover={{ y: -8, rotate: i % 2 ? 6 : -6 }} className="inline-block">
          <LettreDecoupee lettre={l} style={s} rotation={r} taille={t} palette={palette} fluide={fluide} />
        </motion.span>
      ))}
    </motion.span>
  )
}
