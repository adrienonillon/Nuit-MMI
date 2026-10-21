import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import BarreHaut from '../components/BarreHaut.jsx'
import Logo from '../components/Logo.jsx'
import Vague from '../components/Vague.jsx'
import CanevasAEchelle from '../components/CanevasAEchelle.jsx'
import { MotDecoupe } from '../components/LettreDecoupee.jsx'
import Depiratage from '../components/Depiratage.jsx'
import ErreurGlitch from '../components/ErreurGlitch.jsx'
import gribouillis from '../assets/svg/gribouillis.svg'
import { MESSAGE_HACKER, MESSAGE_HACKER_TEXTE } from '../data/lettres.js'
import { EVENEMENT, LONGUEUR_CODE, MOQUERIES } from '../config.js'
import { useCompteARebours, formatDateLongue } from '../lib/useCompteARebours.js'
import { memoriserAcces, verifierCode } from '../lib/acces.js'

// Style « papier découpé » de chaque lettre tapée (repris des fentes de la maquette).
const STYLES_FENTE = [
  { cls: 'bg-blanc text-bleu font-bodoni font-extrabold italic', taille: 84, rot: 3 },
  { cls: 'bg-bleu text-blanc font-rubik', taille: 64, rot: -2 },
  { cls: 'bg-jaune text-bleu font-bodoni font-extrabold italic', taille: 96, rot: -2.94 },
  { cls: 'bg-jaune text-grisnoir font-shoulders font-black', taille: 84, rot: 2 },
  { cls: 'bg-grisnoir text-jaune font-archivo', taille: 70, rot: -3 },
  { cls: 'bg-gris text-grisnoir font-courier font-bold', taille: 80, rot: 1.5 },
]

function Bande({ libelle, className, style }) {
  return (
    <div className={`absolute flex h-[43px] items-center justify-end bg-grisnoir pr-3 ${className}`} style={style}>
      <span className="font-courier text-[18px] font-bold tracking-[3.6px] text-jaune">{libelle}</span>
    </div>
  )
}

// Bulle « HA HA HA » du hacker quand on se trompe.
const RIRE = [['H', 'NA', -3, 34], ['A', 'NM', 4, 30], ['H', 'JT', -2, 36], ['A', 'BB', 3, 32], ['H', 'NM', -4, 34], ['A', 'JB', 2, 36], ['!', 'NA', 6, 34]]

// rire : nombre d'erreurs (chaque nouvelle valeur relance la moquerie)
export function LogoVandalise({ rire = 0 }) {
  return (
    <CanevasAEchelle largeur={600} hauteur={330} className="shrink-0 overflow-visible lg:w-[600px]">
      <Logo className="absolute left-0 top-[14px] h-[302.945px] w-[600px]" />
      <img src={gribouillis} alt="" aria-hidden="true" className="absolute left-[1.7px] top-[25.6px] h-[338.874px] w-[628.371px] max-w-none" />
      <Bande libelle="CENSURÉ" className="left-[-17px] top-[79px] w-[372px]" style={{ transform: 'rotate(-4deg)' }} />
      <Bande libelle="EFFACÉ" className="left-[238.6px] top-[240px] w-[384px]" style={{ transform: 'rotate(3deg)' }} />
      <motion.div
        key={`badge-${rire}`}
        className="absolute left-[434.8px] top-[-34px] flex size-[150px] flex-col items-center justify-center gap-1 rounded-full bg-jaune text-grisnoir shadow-[3px_5px_0_0_#0e0d12]"
        initial={{ rotate: 12 }}
        animate={rire ? { rotate: [12, -14, 22, -8, 16, 12], scale: [1, 1.25, 1.1, 1.2, 1] } : { rotate: 12 }}
        transition={{ duration: 0.9 }}
      >
        <span className="font-shoulders text-[35px] font-black leading-none">PIRATÉ</span>
        <span className="font-courier text-[18px] font-bold">par ???</span>
      </motion.div>
      <AnimatePresence>
        {rire > 0 && (
          <motion.div
            key={`rire-${rire}`}
            aria-hidden="true"
            className="absolute left-[300px] top-[-120px] flex rounded-[22px] bg-blanc px-4 py-3 shadow-[4px_6px_0_0_#0e0d12]"
            initial={{ opacity: 0, scale: 0.3, rotate: -20, y: 30 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.3, 1.1, 1, 0.9], rotate: [-20, -6, -4, -4], y: [30, 0, 0, -20] }}
            transition={{ duration: 2.4, times: [0, 0.15, 0.85, 1] }}
          >
            <MotDecoupe lettres={RIRE} gap={3} fluide={false} />
            <span className="absolute -bottom-3 right-10 size-6 rotate-45 bg-blanc" />
          </motion.div>
        )}
      </AnimatePresence>
    </CanevasAEchelle>
  )
}

export function Fentes({ valeurs, setValeurs, refs, tremble, verrouille = false }) {
  const LETTRE = /^[a-zA-ZÀ-ÿ]$/
  const poser = (i, l) => {
    const n = [...valeurs]; n[i] = l; setValeurs(n)
    if (l && i < LONGUEUR_CODE - 1) refs.current[i + 1]?.focus()
  }
  // Repli (claviers mobiles) : on garde la lettre nouvellement tapée, que le curseur
  // soit avant ou après l'ancienne lettre de la case.
  const majLettre = (i, v) => {
    const lettres = v.replace(/[^a-zA-ZÀ-ÿ]/g, '').toUpperCase()
    const nouvelle = lettres.length > 1 && lettres[0] !== valeurs[i] ? lettres[0] : lettres.slice(-1)
    poser(i, nouvelle)
  }
  const touche = (i, e) => {
    // Une lettre tapée remplace toujours celle de la case
    if (!verrouille && LETTRE.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault()
      poser(i, e.key.toUpperCase())
      return
    }
    if (e.key === 'Backspace' && !valeurs[i] && i > 0) { const n = [...valeurs]; n[i - 1] = ''; setValeurs(n); refs.current[i - 1]?.focus(); e.preventDefault() }
    if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < LONGUEUR_CODE - 1) refs.current[i + 1]?.focus()
  }
  const coller = (e) => {
    const t = (e.clipboardData.getData('text') || '').replace(/\s/g, '').toUpperCase().slice(0, LONGUEUR_CODE)
    if (!t) return
    e.preventDefault()
    setValeurs(Array.from({ length: LONGUEUR_CODE }, (_, k) => t[k] || ''))
    refs.current[Math.min(t.length, LONGUEUR_CODE - 1)]?.focus()
  }
  return (
    <div role="group" aria-label={`Code à ${LONGUEUR_CODE} lettres`} className={`flex w-full gap-[4px] sm:gap-[8px] lg:gap-[14px] ${tremble ? 'tremble' : ''}`}>
      {valeurs.map((v, i) => {
        const st = STYLES_FENTE[i % STYLES_FENTE.length]
        const plein = Boolean(v)
        return (
          <input
            key={i}
            id={`fente-${i + 1}`}
            ref={(el) => (refs.current[i] = el)}
            value={v}
            readOnly={verrouille}
            maxLength={2}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            aria-label={`Lettre ${i + 1}`}
            onChange={(e) => majLettre(i, e.target.value)}
            onKeyDown={(e) => touche(i, e)}
            onPaste={coller}
            onFocus={(e) => e.target.select()}
            className={`aspect-[3/4] min-w-0 max-w-[96px] flex-1 rounded-[2px] p-0 text-center leading-none caret-bleu outline-none transition-transform ${
              verrouille
                ? 'bg-bleu font-shoulders font-black text-jaune shadow-[2px_3px_0_0_rgba(13,13,18,0.25)]'
                : plein && tremble
                  ? 'lettre-glitch bg-grisnoir font-glitch text-jaune shadow-[2px_3px_0_0_rgba(13,13,18,0.25)]' // code refusé : lettres « hackées »
                : plein
                  ? `${st.cls} shadow-[2px_3px_0_0_rgba(13,13,18,0.25)]`
                  : 'border-2 border-dashed border-[rgba(27,22,82,0.45)] bg-transparent focus:border-solid focus:border-bleu'
            }`}
            style={{
              animation: verrouille ? `saute .5s ${i * 0.06}s both` : undefined,
              fontSize: `clamp(16px, ${((verrouille ? 84 : st.taille) / 14.4).toFixed(2)}vw, ${verrouille ? 84 : st.taille}px)`,
              transform: plein && !verrouille ? `rotate(${st.rot}deg)` : undefined,
            }}
          />
        )
      })}
    </div>
  )
}

export default function SitePirate() {
  const navigate = useNavigate()
  const t = useCompteARebours(EVENEMENT)
  const [valeurs, setValeurs] = useState(() => Array(LONGUEUR_CODE).fill(''))
  const [message, setMessage] = useState('')
  const [essais, setEssais] = useState(0)
  const [tremble, setTremble] = useState(false)
  const [reussi, setReussi] = useState(false)
  const [sequence, setSequence] = useState(false)
  const refs = useRef([])
  const allerAuSiteRestaure = useCallback(() => navigate('/restaure'), [navigate])

  const valider = async (e) => {
    e.preventDefault()
    const code = valeurs.join('')
    if (code.length < LONGUEUR_CODE) {
      const manque = LONGUEUR_CODE - code.length
      setMessage(`Il manque ${manque} lettre${manque > 1 ? 's' : ''}…`)
      refs.current[valeurs.findIndex((v) => !v)]?.focus()
      return
    }
    if (await verifierCode(code)) {
      memoriserAcces(code)
      setMessage('')
      setReussi(true) // les fentes se verrouillent et sautent une à une…
      setTimeout(() => setSequence(true), 900) // …puis la séquence de dépiratage
      document.activeElement?.blur()
      return
    }
    setMessage(MOQUERIES[essais % MOQUERIES.length])
    setEssais(essais + 1)
    setTremble(false)
    requestAnimationFrame(() => setTremble(true))
    // Le curseur revient dans la première case pour retaper directement
    setTimeout(() => refs.current[0]?.focus(), 400)
  }

  const unites = [
    ['jours', t.jours, 'text-jaune'],
    ['heures', t.heures, 'text-blanc'],
    ['minutes', t.minutes, 'text-blanc'],
    ['secondes', t.secondes, 'text-blanc'],
  ]

  return (
    <div className="min-h-screen w-full bg-blanc">
      <div className="mx-auto max-w-page">
        <BarreHaut etat="piraté" />

        {/* Héros : logo vandalisé + lettre de rançon */}
        <section aria-label="Le site a été piraté" className="flex flex-col items-center gap-14 overflow-hidden px-4 pb-16 pt-14 md:px-[130px] lg:flex-row lg:gap-[72px] lg:pb-[96px] lg:pt-[40px]">
          <LogoVandalise rire={essais} />
          <div className="w-full flex-1 rotate-[1.4deg]">
            <div className="flex flex-col gap-[22px] bg-blanc p-6 shadow-[0_22px_40px_-24px_rgba(13,13,18,0.45)] md:p-9">
              <h1 className="sr-only">{MESSAGE_HACKER_TEXTE}</h1>
              <div aria-hidden="true" className="flex flex-wrap items-center gap-x-[22px] gap-y-[10px]">
                {MESSAGE_HACKER.map((mot, i) => <MotDecoupe key={i} lettres={mot} />)}
              </div>
              <p className="-rotate-2 font-courier text-[22px] font-bold text-bleu md:text-[26px]">— le hacker</p>
            </div>
          </div>
        </section>
      </div>

      {/* Compte à rebours */}
      <Vague retournee />
      <section aria-labelledby="t-chrono" className="w-full bg-bleu">
        <div className="mx-auto flex max-w-page flex-col gap-[22px] px-4 pb-[72px] pt-[59px] md:px-[130px]">
          <h2 id="t-chrono" className="sr-only">Temps restant avant l'effacement de la Nuit MMI</h2>
          <div role="timer" className="grid grid-cols-2 gap-x-8 gap-y-6 font-courier font-bold md:flex md:gap-[33px]">
            {unites.map(([u, v, c], i) => (
              <div key={u} className={`flex flex-col gap-[10px] ${i === 0 ? 'md:w-[342px] md:shrink-0' : 'md:flex-1'}`}>
                <span className={`leading-[0.8] tabular-nums ${c}`} style={{ fontSize: 'clamp(64px, 13.2vw, 190px)' }}>{v}</span>
                <span className="text-[22px] text-jaune md:text-[30px]">{u}</span>
              </div>
            ))}
          </div>
          <p className="flex flex-wrap gap-[6px] font-courier text-[15px] font-bold text-blanc md:text-[18px]">
            <span>Avant l'effacement de la Nuit MMI ·</span>
            <span>{formatDateLongue(EVENEMENT)}</span>
          </p>
        </div>
      </section>
      <Vague />

      {/* Recollez le code */}
      <section aria-labelledby="t-code" className="mx-auto max-w-page px-4 pb-[72px] pt-16 md:px-[130px] md:pt-[104px]">
        <form onSubmit={valider} noValidate className="flex flex-col gap-7">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <h2 id="t-code" className="flex flex-wrap items-center gap-x-[18px] leading-none">
              <span className="font-bodoni font-extrabold italic tracking-[-0.02em] text-bleu" style={{ fontSize: 'clamp(48px, 7.2vw, 104px)' }}>Recollez</span>
              <span className="px-3 font-courier font-bold leading-[0.95] text-grisnoir" style={{ fontSize: 'clamp(48px, 7.2vw, 104px)' }}>LE CODE</span>
            </h2>
            <button
              type="submit"
              className="flex size-[140px] -rotate-[8deg] flex-col items-center justify-center gap-[2px] rounded-full bg-grisnoir transition-transform hover:rotate-0 hover:scale-105 md:size-[180px]"
            >
              <span className="font-shoulders text-[28px] font-black text-jaune md:text-[34px]">DÉHACKER</span>
              <span className="font-courier text-[17px] font-bold text-blanc md:text-[20px]">le site</span>
            </button>
          </div>
          <Fentes valeurs={valeurs} setValeurs={(n) => { setValeurs(n); setTremble(false) }} refs={refs} tremble={tremble} verrouille={reussi} />
          <p role="status" aria-live="polite" className="min-h-[1.4em] font-courier text-[22px] font-bold text-jaune md:text-[28px]">
            <motion.span
              key={`${essais}-${message}`}
              className="inline-block"
              initial={{ opacity: 0, x: -24, skewX: 25 }}
              animate={{ opacity: 1, x: [-24, 8, -4, 0], skewX: [25, -10, 4, 0] }}
              transition={{ duration: 0.5 }}
            >
              {message}
            </motion.span>
            {essais > 0 && !reussi && (
              <span className="ml-3 align-middle font-courier text-[14px] text-bleu/60 md:text-[16px]">tentative n°{essais}</span>
            )}
          </p>
        </form>
      </section>

      {essais > 0 && <ErreurGlitch key={essais} />}
      {sequence && <Depiratage code={valeurs} onFin={allerAuSiteRestaure} />}
    </div>
  )
}
