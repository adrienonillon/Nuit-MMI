import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import Logo from './Logo.jsx'
import { EASE } from './Anime.jsx'

const LIENS = [['Accueil', '/accueil'], ['Projets', '/projets'], ['Règlement', '/reglement']]

// Lien dont le texte « roule » vers le haut au survol.
function TexteRoulant({ children }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">{children}</span>
      <span aria-hidden="true" className="absolute inset-0 block translate-y-full text-bleu transition-transform duration-300 ease-out group-hover:translate-y-0">{children}</span>
    </span>
  )
}

// Barre de navigation des pages Accueil / Projets / Règlement (wireframe « Structure Accueil »).
export default function EnTete() {
  const { scrollY, scrollYProgress } = useScroll()
  const progression = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  const [cachee, setCachee] = useState(false)
  const [compacte, setCompacte] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const avant = scrollY.getPrevious() ?? 0
    setCachee(y > avant && y > 240)
    setCompacte(y > 24)
  })

  return (
    <>
      <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-jaune" style={{ scaleX: progression }} />
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: cachee ? -120 : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          compacte ? 'bg-fond/85 shadow-[0_1px_0_rgba(21,17,71,0.08)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className={`mx-auto flex max-w-page items-center justify-between px-4 transition-[padding] duration-300 md:px-[75px] ${compacte ? 'py-3' : 'py-5 md:py-[30px]'}`}>
          <Link to="/accueil" className="logo-cligne group flex items-start" aria-label="Nuit MMI 2027 — accueil">
            <Logo
              annee={null}
              className={`origin-bottom-left transition-[width,height,transform] duration-300 will-change-transform group-hover:scale-105 ${compacte ? 'h-[36px] w-[71px]' : 'h-[44px] w-[87px] md:h-[60px] md:w-[119px]'}`}
            />
            <span className={`-ml-2 font-inter font-black leading-none text-jaune transition-all duration-300 ${compacte ? 'text-[10px]' : 'text-[11px] md:text-[14px]'}`}>2027</span>
          </Link>

          <nav aria-label="Navigation principale">
            <ul className="flex items-center gap-4 sm:gap-6 md:gap-[38px]">
              {LIENS.map(([libelle, vers]) => (
                <li key={vers}>
                  <NavLink to={vers} className="group relative block py-2 font-courier text-[13px] uppercase tracking-[0.99px] text-encre sm:text-[14px] md:text-[16px]">
                    {({ isActive }) => (
                      <>
                        <TexteRoulant>{libelle}</TexteRoulant>
                        {isActive ? (
                          <motion.span layoutId="nav-actif" className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-jaune" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                        ) : (
                          <span className="absolute inset-x-0 bottom-0 h-[2px] origin-right scale-x-0 bg-bleu transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.header>
    </>
  )
}
