import { useEffect, useState } from 'react'

const p2 = (n) => String(n).padStart(2, '0')

export function useCompteARebours(cible) {
  const calc = () => {
    let d = Math.max(0, cible.getTime() - Date.now())
    const j = Math.floor(d / 864e5); d -= j * 864e5
    const h = Math.floor(d / 36e5); d -= h * 36e5
    const m = Math.floor(d / 6e4); d -= m * 6e4
    return { jours: String(j).padStart(2, '0'), heures: p2(h), minutes: p2(m), secondes: p2(Math.floor(d / 1e3)) }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [cible])
  return t
}

export const formatDateLongue = (date) => {
  const t = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' }).format(date).replace(':', 'h')
  return t.charAt(0).toUpperCase() + t.slice(1)
}
