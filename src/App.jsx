import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SitePirate from './pages/SitePirate.jsx'
import SiteRestaure from './pages/SiteRestaure.jsx'
import Accueil from './pages/Accueil.jsx'
import Reglement from './pages/Reglement.jsx'
import { estDeverrouille } from './lib/acces.js'

// La page restaurée n'est accessible qu'après le bon mot de passe.
function AccesProtege({ children }) {
  return estDeverrouille() ? children : <Navigate to="/" replace />
}

// Fondu entre les pages.
function Page({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      {children}
    </motion.div>
  )
}

// Parcours : site piraté → bon mot de passe → site restauré → accueil (+ règlement).
export default function App() {
  const location = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><SitePirate /></Page>} />
        <Route path="/restaure" element={<AccesProtege><Page><SiteRestaure /></Page></AccesProtege>} />
        <Route path="/accueil" element={<Page><Accueil /></Page>} />
        <Route path="/reglement" element={<Page><Reglement /></Page>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}
