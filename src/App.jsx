import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SitePirate from './pages/SitePirate.jsx'
import SiteRestaure from './pages/SiteRestaure.jsx'
import Accueil from './pages/Accueil.jsx'
import Reglement from './pages/Reglement.jsx'
import Projets from './pages/Projets.jsx'
import { estDeverrouille } from './lib/acces.js'

// Tout le site (restauré, accueil, projets, règlement) n'est accessible qu'après le bon mot de passe.
function AccesProtege({ children }) {
  const [ok, setOk] = useState(null)
  useEffect(() => {
    let actif = true
    estDeverrouille().then((v) => actif && setOk(v))
    return () => { actif = false }
  }, [])
  if (ok === null) return null // vérification en cours (quelques millisecondes)
  return ok ? children : <Navigate to="/" replace />
}

// Fondu entre les pages.
// sortieDirecte : pas de fondu de sortie (la page piratée finit déjà couverte de blanc par le dépiratage).
function Page({ children, sortieDirecte = false }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: sortieDirecte ? 0 : 0.18 } }} transition={{ duration: 0.18 }}>
      {children}
    </motion.div>
  )
}

// Parcours : site piraté → bon mot de passe → site restauré → accueil (+ projets, règlement).
export default function App() {
  const location = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page sortieDirecte><SitePirate /></Page>} />
        <Route path="/restaure" element={<AccesProtege><Page><SiteRestaure /></Page></AccesProtege>} />
        <Route path="/accueil" element={<AccesProtege><Page><Accueil /></Page></AccesProtege>} />
        <Route path="/projets" element={<AccesProtege><Page><Projets /></Page></AccesProtege>} />
        <Route path="/reglement" element={<AccesProtege><Page><Reglement /></Page></AccesProtege>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}
