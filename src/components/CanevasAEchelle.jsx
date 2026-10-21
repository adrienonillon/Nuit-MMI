import { useLayoutEffect, useRef, useState } from 'react'

// Garde une composition dessinée à taille fixe (Figma) et la réduit
// proportionnellement quand l'écran est plus étroit.
export default function CanevasAEchelle({ largeur, hauteur, className = '', children }) {
  const ref = useRef(null)
  const [echelle, setEchelle] = useState(1)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const maj = () => setEchelle(Math.min(1, el.clientWidth / largeur))
    maj()
    const ro = new ResizeObserver(maj)
    ro.observe(el)
    return () => ro.disconnect()
  }, [largeur])
  return (
    <div ref={ref} className={`relative w-full ${className}`} style={{ height: hauteur * echelle, maxWidth: largeur }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: largeur, height: hauteur, transform: `scale(${echelle})` }}>
        {children}
      </div>
    </div>
  )
}
