import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import BarreHaut from '../components/BarreHaut.jsx'
import Logo from '../components/Logo.jsx'
import CanevasAEchelle from '../components/CanevasAEchelle.jsx'
import { Fentes } from './SitePirate.jsx'
import { EVENEMENT } from '../config.js'
import { formatDateLongue } from '../lib/useCompteARebours.js'
import { codeTrouve, oublierAcces } from '../lib/acces.js'

export default function SiteRestaure() {
  const navigate = useNavigate()
  const refs = useRef([])
  const code = codeTrouve().split('')
  const infos = [
    ['QUAND', formatDateLongue(EVENEMENT)],
    ['OÙ', 'Département MMI · salle communiquée aux inscrits'],
    ['À GAGNER', 'Bijoux, produits de beauté et autres lots partenaires'],
  ]
  return (
    <div className="min-h-screen w-full bg-blanc">
      <div className="mx-auto max-w-page">
        <BarreHaut etat="restauré" edition />

        <section aria-label="Site restauré" className="flex flex-col items-center gap-14 overflow-hidden px-4 pb-16 pt-16 md:px-[130px] lg:flex-row lg:gap-[72px] lg:pb-[96px] lg:pt-[40px]">
          <CanevasAEchelle largeur={600} hauteur={330} className="shrink-0 overflow-visible lg:w-[600px]">
            <motion.div className="logo-cligne absolute left-0 top-[14px] h-[302.945px] w-[600px]" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <Logo className="h-full w-full" />
            </motion.div>
            <motion.div
              className="absolute left-[459px] top-[-56px] flex size-[150px] flex-col items-center justify-center gap-1 rounded-full bg-grisnoir text-jaune"
              initial={{ scale: 3, rotate: -40, opacity: 0 }}
              animate={{ scale: 1, rotate: -6, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 380, damping: 16, delay: 0.3 }}
            >
              <span className="font-shoulders text-[35px] font-black leading-none">SAUVÉ</span>
              <span className="font-courier text-[18px] font-bold">merci à vous</span>
            </motion.div>
          </CanevasAEchelle>

          <motion.div className="w-full flex-1" initial={{ opacity: 0, x: 80, rotate: 6 }} animate={{ opacity: 1, x: 0, rotate: 1.4 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex flex-col gap-[18px] bg-blanc p-6 shadow-[0_22px_40px_-24px_rgba(13,13,18,0.45)] md:p-9">
              <h1 className="flex flex-wrap items-center gap-x-3 gap-y-1 leading-tight text-bleu" style={{ fontSize: 'clamp(38px, 4.17vw, 60px)' }}>
                <span className="font-bodoni font-extrabold italic">La</span>
                <span className="bg-jaune px-2 font-shoulders font-black">NUIT MMI</span>
                <span className="font-bodoni font-extrabold italic">est à vous.</span>
              </h1>
              <p className="font-courier text-[17px] text-bleu">
                Vous avez recollé le code et chassé le hacker. Le site est rétabli : rendez-vous le soir J pour découvrir qui se cachait derrière.
              </p>
              <dl className="flex flex-col font-courier font-bold">
                {infos.map(([k, v]) => (
                  <div key={k} className="flex gap-3 border-t border-blanc py-[10px]">
                    <dt className="w-24 shrink-0 text-[18px] text-bleu">{k}</dt>
                    <dd className="min-w-0 flex-1 text-[16px] text-grisnoir">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link to="/accueil" className="w-full rounded-lg bg-grisnoir py-[10px] text-center font-courier text-[16px] font-bold text-jaune hover:bg-bleu">
                Accéder au site
              </Link>
            </div>
          </motion.div>
        </section>

        <section aria-labelledby="t-code" className="px-4 pb-[72px] pt-16 md:px-[130px] md:pt-[104px]">
          <div className="flex flex-col gap-7">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-col gap-[14px]">
                <h2 id="t-code" className="flex flex-wrap items-center gap-x-[18px] leading-none">
                  <span className="font-bodoni font-extrabold italic tracking-[-0.02em] text-bleu" style={{ fontSize: 'clamp(48px, 7.2vw, 104px)' }}>Recollez</span>
                  <span className="px-3 font-courier font-bold leading-[0.95] text-grisnoir" style={{ fontSize: 'clamp(48px, 7.2vw, 104px)' }}>LE CODE</span>
                </h2>
                <p className="max-w-[696px] font-courier text-[16px] text-bleu md:text-[18px]">
                  Onze lettres, éparpillées sur les affiches, dans les vidéos et ailleurs. Remettez-les dans l'ordre pour arracher la censure.
                </p>
              </div>
              <div className="flex size-[140px] -rotate-[8deg] flex-col items-center justify-center gap-[2px] rounded-full bg-jaune md:size-[180px]">
                <span className="font-shoulders text-[28px] font-black text-grisnoir md:text-[34px]">DÉHACKER</span>
                <span className="font-courier text-[17px] font-bold text-bleu md:text-[20px]">le site</span>
              </div>
            </div>
            <Fentes valeurs={code} setValeurs={() => {}} refs={refs} verrouille />
            <button
              type="button"
              onClick={() => { oublierAcces(); navigate('/') }}
              className="self-start font-courier text-[14px] font-bold text-bleu underline underline-offset-4"
            >
              Revoir le piratage
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
