import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'

// Courbe commune à toutes les apparitions.
export const EASE = [0.22, 1, 0.36, 1]

// Élément qui apparaît en glissant quand il entre à l'écran.
export function Apparition({ as = 'div', delai = 0, y = 40, x = 0, className = '', children, ...props }) {
  const M = motion[as]
  return (
    <M
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: delai, ease: EASE }}
      className={className}
      {...props}
    >
      {children}
    </M>
  )
}

// Conteneur dont les enfants <Element> apparaissent l'un après l'autre.
export function Cascade({ as = 'div', pas = 0.12, delai = 0, className = '', children, ...props }) {
  const M = motion[as]
  return (
    <M
      initial="cache"
      whileInView="vu"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ staggerChildren: pas, delayChildren: delai }}
      className={className}
      {...props}
    >
      {children}
    </M>
  )
}

const VARIANTES = {
  cache: { opacity: 0, y: 40, scale: 0.96 },
  vu: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
}

export function Element({ as = 'div', variants = VARIANTES, className = '', children, ...props }) {
  const M = motion[as]
  return <M variants={variants} className={className} {...props}>{children}</M>
}

// Nombre qui compte de 0 à `valeur` quand il devient visible.
export function Compteur({ valeur, duree = 1.6, className = '' }) {
  const ref = useRef(null)
  const vu = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!vu) return
    const c = animate(0, valeur, { duration: duree, ease: EASE, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [vu, valeur, duree])
  return <span ref={ref} className={className}>{n}</span>
}
