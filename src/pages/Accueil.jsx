import { lazy, Suspense, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import EnTete from '../components/EnTete.jsx'
import PiedDePage from '../components/PiedDePage.jsx'
import { Apparition, Cascade, Compteur, EASE, Element } from '../components/Anime.jsx'
import Vague from '../components/Vague.jsx'
import CanevasAEchelle from '../components/CanevasAEchelle.jsx'
import { MotDecoupe } from '../components/LettreDecoupee.jsx'
import { SANS, DORMIR, INDICATIF, VINGT_QUATRE, HEURES, IDEES, PRERATION } from '../data/lettres.js'
import spookie from '../assets/photos/spookie.webp'
import photoObserver from '../assets/photos/consigne.webp'
import photoImaginer from '../assets/photos/equipe.webp'
import photoFabriquer from '../assets/photos/fabriquer.webp'
import photoDefendre from '../assets/photos/defendre.webp'

// three.js est lourd : le fantôme 3D est chargé à part.
const Spookie3D = lazy(() => import('../components/Spookie3D.jsx'))
const Trophee3D = lazy(() => import('../components/Trophee3D.jsx'))

// Avec HashRouter, les ancres « #id » changeraient de route : on défile en JS.
const allerA = (id) => (e) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ---------------------------------------------------------------- héros */
function Heros() {
  return (
    <section aria-labelledby="t-heros" className="px-4 pb-16 pt-6 md:px-[77px] md:pt-[20px]">
      <div className="grid items-center gap-10 lg:grid-cols-[574px_1fr] lg:gap-[45px]">
        <div className="flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="font-inter text-[16px] uppercase tracking-[2.23px] text-encre md:text-[18px]"
          >
            Nuit MMI · Édition 2027
          </motion.p>
          <h1 id="t-heros" className="flex flex-col pt-[58px]">
            <span className="sr-only">Créer sans dormir</span>
            <span aria-hidden="true" className="-mt-8 block overflow-hidden pb-2 pt-8">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                className="block font-outfit font-bold uppercase leading-[0.78] tracking-[-0.06em] text-encre"
                style={{ fontSize: 'clamp(64px, 8vw, 115.2px)' }}
              >
                Créer
              </motion.span>
            </span>
            <span aria-hidden="true" className="mt-4 flex items-start"><MotDecoupe lettres={SANS} palette="accueil" gap={2} anime delai={0.6} /></span>
            <span aria-hidden="true" className="mt-1 flex items-end"><MotDecoupe lettres={DORMIR} palette="accueil" gap={15.9} className="items-end" anime delai={0.85} /></span>
          </h1>
          <motion.a
            href="#planning"
            onClick={allerA('planning')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3, ease: EASE }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group mt-10 flex w-full max-w-[353px] items-center justify-center gap-[10px] rounded-lg bg-grisnoir px-[15px] py-[9px] font-courier text-[20.3px] font-bold leading-[27.4px] text-jaune transition-colors hover:bg-bleu"
          >
            Découvrir le programme
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-1"><path d="M12 5v14m0 0-6-6m6 6 6-6" stroke="#F3C137" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.a>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
          className="relative mx-auto aspect-[626/632] w-full max-w-[626px] overflow-hidden rounded-b-[27px] rounded-t-[333px] bg-jaune"
        >
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }} className="absolute inset-x-0 top-[6.7%] text-center font-courier text-[15px] font-bold tracking-[2.23px] text-bleu md:text-[18px]">EN ÉQUIPE</motion.p>
          <Suspense fallback={<img src={spookie} alt="" className="absolute left-[17.8%] top-[11.6%] h-[82.1%] w-[64.4%] object-contain object-bottom" />}>
            <Spookie3D className="absolute inset-x-0 bottom-[8%] top-[8%]" />
          </Suspense>
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.25, duration: 0.6 }} className="absolute bottom-[5.9%] left-[6.3%] font-courier text-[14px] font-bold tracking-[2.23px] text-bleu md:text-[18px]">24 HEURES</motion.p>
          <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.6 }} className="absolute bottom-[5.9%] right-[6.6%] text-right font-courier text-[14px] font-bold leading-[18.6px] tracking-[2.23px] text-bleu md:text-[18px]">DU BRIEF<br />AU PITCH</motion.p>
          <p className="pointer-events-none absolute left-1/2 top-[13%] -translate-x-1/2 font-courier text-[11px] tracking-[1.5px] text-bleu/50">cliquez · glissez ✦</p>
        </motion.div>
      </div>
      <Cascade as="ul" pas={0.1} delai={0.3} className="mt-[27px] grid grid-cols-2 gap-4 lg:grid-cols-[281px_256px_259px_268px] lg:gap-[67px]">
        {['CRÉATION', 'ORGANISATION', 'ÉQUIPE', '24H'].map((p) => (
          <Element as="li" key={p} className="flex h-16 cursor-default items-center justify-center rounded-[32px] border border-bleu font-courier text-[15px] font-bold tracking-[2.03px] text-bleu transition-colors duration-300 hover:bg-bleu hover:text-jaune md:text-[18px]">{p}</Element>
        ))}
      </Cascade>
    </section>
  )
}

/* ---------------------------------------------------------------- planning */
// Chemin dessiné sur une composition de 1200 × 470, centrée dans la page.
// Points hauts : texte au-dessus · points bas : texte en dessous (le texte ne croise jamais la courbe).
const ETAPES = [
  { titre: 'Inscriptions', texte: 'Les équipes se forment.', x: 150, y: 190, haut: true },
  { titre: 'Préparation', texte: 'Tout le monde est prêt.', x: 450, y: 330, haut: false },
  { titre: 'Jour J', texte: 'Le sujet est révélé.', x: 750, y: 190, haut: true },
  { titre: 'Trophée', texte: 'Les projets prennent la scène.', x: 1050, y: 330, haut: false },
]
const CHEMIN = 'M40 190 C95 190 95 190 150 190 C300 190 300 330 450 330 S600 190 750 190 S900 330 1050 330 C1105 330 1105 330 1160 330'
const DUREE_TRACE = 2.4

function Planning() {
  return (
    <section id="planning" aria-labelledby="t-planning" className="relative scroll-mt-16">
      <Vague retournee />
      <div className="bg-bleu px-4 pb-[70px] pt-[50px] md:px-10 md:pt-[70px]">
        <div className="mx-auto max-w-[1200px]">
        <h2 id="t-planning" className="flex flex-wrap items-center gap-x-[15.6px] gap-y-3">
          <Apparition as="span" x={-40} y={0} className="font-courier font-bold uppercase tracking-[2.84px] text-jaune" style={{ fontSize: 'clamp(38px, 4.73vw, 68.1px)' }}>Planning</Apparition>
          <MotDecoupe lettres={INDICATIF} palette="accueil" gap={7.8} label="indicatif" anime delai={0.2} />
        </h2>

        {/* Version écran large : chemin pointillé qui se dessine */}
        <div className="mt-6 hidden md:block">
          <CanevasAEchelle largeur={1200} hauteur={470} className="mx-auto">
            <svg aria-hidden="true" width="1200" height="470" viewBox="0 0 1200 470" className="absolute inset-0" fill="none">
              <defs>
                <mask id="trace-planning">
                  <motion.path
                    d={CHEMIN}
                    stroke="#fff"
                    strokeWidth="14"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: '-120px' }}
                    transition={{ duration: DUREE_TRACE, ease: 'easeInOut' }}
                  />
                </mask>
              </defs>
              <path d={CHEMIN} stroke="#F3C137" strokeOpacity="0.12" strokeWidth="5" strokeLinecap="round" />
              <path d={CHEMIN} stroke="#F3C137" strokeWidth="5" strokeLinecap="round" strokeDasharray="14 12" mask="url(#trace-planning)" className="planning-fourmis" />
            </svg>
            <ol>
              {ETAPES.map((e, i) => {
                const delai = 0.15 + (i / (ETAPES.length - 1)) * (DUREE_TRACE - 0.3)
                return (
                  <li key={e.titre}>
                    <motion.span
                      aria-hidden="true"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-120px' }}
                      transition={{ type: 'spring', stiffness: 320, damping: 13, delay: delai }}
                      className="group absolute grid size-[64px] place-items-center"
                      style={{ left: e.x - 32, top: e.y - 32 }}
                    >
                      <span className="absolute inset-0 animate-ping rounded-full bg-jaune/40" style={{ animationDuration: '2.6s', animationDelay: `${i * 0.5}s` }} />
                      <span className="relative grid size-[56px] place-items-center rounded-full border-[6px] border-bleu bg-jaune font-courier text-[18px] font-bold text-bleu shadow-[0_0_0_3px_#F3C137] transition-transform duration-300 group-hover:scale-125">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </motion.span>
                    <motion.div
                      initial={{ opacity: 0, y: e.haut ? 20 : -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-120px' }}
                      transition={{ duration: 0.7, delay: delai + 0.15, ease: EASE }}
                      className="absolute w-[280px] text-center"
                      style={{ left: e.x - 140, ...(e.haut ? { bottom: 470 - e.y + 50 } : { top: e.y + 50 }) }}
                    >
                      <h3 className="font-courier text-[31.6px] font-bold uppercase leading-[1.2] text-jaune">{e.titre}</h3>
                      <p className="mt-1 font-courier text-[18px] leading-[25.4px] text-blanc">{e.texte}</p>
                    </motion.div>
                  </li>
                )
              })}
            </ol>
          </CanevasAEchelle>
        </div>

        {/* Version mobile : liste verticale */}
        <Cascade as="ol" pas={0.15} className="mt-10 flex flex-col gap-6 border-l-4 border-dashed border-jaune pl-6 md:hidden">
          {ETAPES.map((e) => (
            <Element as="li" key={e.titre} className="relative">
              <span aria-hidden="true" className="absolute -left-[41px] top-1 size-[30px] rounded-full bg-jaune" />
              <h3 className="font-courier text-[26px] font-bold uppercase text-jaune">{e.titre}</h3>
              <p className="font-courier text-[16px] text-blanc">{e.texte}</p>
            </Element>
          ))}
        </Cascade>
        </div>
      </div>
      <Vague />
    </section>
  )
}

/* ---------------------------------------------------------------- ce que les étudiants vont vivre */
function Carte({ num, titre, texte, photo, className = '', cadre = '', titreCls = 'text-creme', numCls = 'text-creme', pos = 'object-center', hauteurPhoto = '', delai = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60, rotate: -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: delai, ease: EASE }}
      className={`group relative overflow-hidden rounded-[24px] ${className}`}
    >
      <div className={`relative overflow-hidden bg-perle ${cadre}`}>
        <img src={photo} alt="" className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${pos} ${hauteurPhoto}`} />
      </div>
      <span className={`absolute left-[30px] top-[33px] font-outfit text-[18px] ${numCls}`}>{num}</span>
      <div className="absolute bottom-[20px] left-[26px] right-4">
        <h3 className={`font-courier font-bold uppercase leading-[0.9] ${titreCls}`} style={{ fontSize: 'clamp(30px, 3vw, 43.2px)' }}>{titre}</h3>
        <p className={`pt-[9px] font-courier text-[15.8px] leading-[23.7px] ${titreCls}`}>{texte}</p>
      </div>
    </motion.article>
  )
}

function Vivre() {
  return (
    <section aria-labelledby="t-vivre" className="px-4 pb-24 pt-[115px] md:px-[80px]">
      <Apparition as="h2" id="t-vivre" x={60} y={0} className="text-right font-courier font-bold uppercase leading-[0.89] tracking-[-0.05em] text-bleu" style={{ fontSize: 'clamp(44px, 6.67vw, 96px)' }}>
        Ce que les étudiants <span className="font-bodoni font-bold normal-case">vont vivre</span>
      </Apparition>
      <Apparition as="p" delai={0.15} className="ml-auto mt-6 max-w-[671px] text-right font-courier text-[16px] leading-[1.25] text-bleu md:text-[18px]">
        La Nuit MMI c’est une expérience collective de création numérique en équipe, avec un sujet à découvrir, des livrables à produire, des repas partagés et une finale de présentation.
      </Apparition>
      <div className="mt-[50px] grid gap-5 lg:grid-cols-[463px_1fr] lg:gap-x-8">
        <Carte num="01" titre="Observer" texte="Décoder le brief" photo={photoObserver} className="bg-grisnoir p-[21px] pb-[136px] lg:h-[686px]" cadre="h-[420px] lg:h-[529px]" titreCls="text-jaune" numCls="text-jaune" pos="object-left" />
        <div className="flex flex-col gap-5">
          <Carte num="02" titre="Imaginer" texte="Trouver l’idée" photo={photoImaginer} delai={0.15} className="bg-jaune p-[21px]" cadre="h-[260px] lg:h-[319px]" pos="object-[50%_35%]" />
          <div className="grid gap-5 sm:grid-cols-[361.8fr_393fr] sm:gap-[34px]">
            <Carte num="03" titre="Fabriquer" texte="Passer au réel" photo={photoFabriquer} delai={0.3} className="border-[22px] border-bleu" cadre="h-[261px]" pos="object-[30%_50%]" />
            <Carte num="04" titre="Défendre" texte="Présenter ensemble" photo={photoDefendre} delai={0.45} className="bg-grisnoir p-[21px]" cadre="h-[220px] lg:h-[262px]" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- 24 heures */
// [angle en degrés, écart au cercle en px]
const ETOILES = [[8, 0], [34, 6], [61, -4], [95, 3], [118, -6], [149, 5], [176, -2], [205, 6], [231, -5], [262, 2], [289, -3], [318, 6], [343, -4]]
const DEG = Math.PI / 180
const BULLES = [
  { t: 'Lancement', p: 'Sujet dévoilé', box: [119, 43, 267.92, 146.7], rot: -4 },
  { t: 'Équipes', p: 'Rôles distribués', box: [918, 22, 275.86, 167.53], rot: 8.34 },
  { t: 'Production', p: 'Création en cours', box: [70, 498, 267.6, 142.08], rot: -4 },
  { t: 'Finale', p: 'Pitch devant le jury', box: [952.46, 498.23, 277.3, 168.08], rot: 9.99 },
]
const ATTACHES = [[363, 150], [302, 483], [901, 130], [963, 486]]
const HEURES_CADRAN = [['00:00', 0], ['06:00', 90], ['12:00', 180], ['18:00', 270]]

function VingtQuatreHeures() {
  return (
    <section aria-labelledby="t-24h" className="px-4 pb-24 md:px-[40px]">
      <Apparition as="h2" id="t-24h" className="flex flex-wrap items-center justify-center gap-x-[18px] gap-y-3 lg:justify-start">
        <span className="sr-only">Les 24 heures de création</span>
        <span aria-hidden="true" className="font-outfit font-bold uppercase leading-none tracking-[-0.055em] text-encre" style={{ fontSize: 'clamp(44px, 5.8vw, 83.65px)' }}>Les</span>
        <span aria-hidden="true" className="flex items-center gap-[48.4px]">
          <MotDecoupe lettres={VINGT_QUATRE} palette="accueil" gap={13.7} anime delai={0.2} />
          <MotDecoupe lettres={HEURES} palette="accueil" gap={6.45} anime delai={0.35} />
        </span>
        <span aria-hidden="true" className="font-outfit font-bold uppercase leading-none tracking-[-0.055em] text-encre" style={{ fontSize: 'clamp(44px, 5.8vw, 83.65px)' }}>de création</span>
      </Apparition>

      <Apparition y={80} className="mx-auto mt-[150px] max-w-[1279px]">
        <CanevasAEchelle largeur={1279} hauteur={703}>
          <div className="absolute inset-0 overflow-hidden rounded-[119px] bg-bleu">
            <div className="absolute left-0 top-[352px] h-px w-[1278px] bg-blanc" />
            <div className="absolute left-[639px] top-[5px] h-[698px] w-px bg-blanc" />

            {BULLES.map((b, i) => (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, scale: 0.5, rotate: -b.rot * 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ type: 'spring', stiffness: 160, damping: 13, delay: 0.4 + i * 0.15 }}
                className="absolute flex items-center justify-center"
                style={{ left: b.box[0], top: b.box[1], width: b.box[2], height: b.box[3] }}
              >
                <div className="flotte" style={{ animationDelay: `${i * -1.1}s` }}>
                  <article className="flex w-[259.56px] flex-none flex-col rounded-2xl border border-blanc bg-bleu p-[22.57px] drop-shadow-[0_4px_9.4px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:bg-jaune [&:hover_*]:text-bleu" style={{ transform: `rotate(${b.rot}deg)` }}>
                    <h3 className="font-courier text-[33.86px] font-bold uppercase leading-[50.8px] text-blanc transition-colors">{b.t}</h3>
                    <p className="pt-[6.8px] font-courier text-[18px] leading-[23.7px] text-blanc transition-colors">{b.p}</p>
                  </article>
                </div>
              </motion.div>
            ))}

            {/* Cadran : tout est calculé depuis le centre pour rester parfaitement centré */}
            <div className="absolute left-[455px] top-[169px] size-[368px]">
              {/* Orbite d'étoiles */}
              <div aria-hidden="true" className="absolute -inset-[26px] animate-[spin_70s_linear_infinite] rounded-full border border-jaune/35">
                {ETOILES.map(([angle, ecart], i) => (
                  <span
                    key={i}
                    className="absolute size-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-bleu bg-jaune"
                    style={{ left: 210 + (210 + ecart) * Math.sin(angle * DEG), top: 210 - (210 + ecart) * Math.cos(angle * DEG) }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 rounded-full border-[12px] border-jaune bg-fond drop-shadow-[-3px_2px_31.85px_rgba(8,5,47,0.55)]">
                {/* Graduations : une par heure */}
                {Array.from({ length: 24 }, (_, h) => h % 6 !== 0 && (
                  <span
                    key={h}
                    aria-hidden="true"
                    className={`absolute left-1/2 top-0 w-[2px] origin-[50%_168px] rounded-full ${h % 3 === 0 ? 'h-[12px] bg-bleu/70' : 'h-[7px] bg-bleu/30'}`}
                    style={{ transform: `translateX(-50%) rotate(${h * 15}deg)`, marginTop: 4 }}
                  />
                ))}
                {/* Aiguille qui fait le tour du cadran */}
                <div aria-hidden="true" className="absolute inset-0 animate-[spin_24s_linear_infinite]">
                  <span className="absolute left-1/2 top-[8px] h-[56px] w-[3px] -translate-x-1/2 rounded-full bg-jaune" />
                  <span className="absolute left-1/2 top-[4px] size-[11px] -translate-x-1/2 rounded-full border-2 border-bleu bg-jaune" />
                </div>
                {HEURES_CADRAN.map(([h, angle]) => (
                  <span
                    key={h}
                    className="absolute -translate-x-1/2 -translate-y-1/2 bg-fond px-[7px] py-[4px] font-courier text-[10px] font-bold leading-[15px] text-bleu"
                    style={{ left: 172 + 143 * Math.sin(angle * DEG), top: 172 - 143 * Math.cos(angle * DEG) }}
                  >
                    {h}
                  </span>
                ))}
                {/* Disque central */}
                <div className="absolute left-1/2 top-1/2 flex size-[227px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-jaune">
                  <span className="font-courier text-[10.4px] font-bold leading-[15.6px] tracking-[1.66px] text-bleu">NON-STOP</span>
                  <Compteur valeur={24} className="-ml-[0.1em] font-outfit text-[140px] font-bold leading-[105px] tracking-[-0.1em] tabular-nums text-bleu" />
                  <span className="pt-3 font-courier text-[12.8px] font-bold leading-[19.2px] tracking-[3.07px] text-bleu">HEURES</span>
                </div>
              </div>
            </div>

            {ATTACHES.map(([x, y], i) => (
              <span key={i} aria-hidden="true" className="absolute flex size-[34.2px] items-center justify-center" style={{ left: x, top: y }}>
                <span className="absolute size-[26.23px] animate-ping rounded-full bg-jaune/50" style={{ animationDuration: '2.4s', animationDelay: `${i * 0.6}s` }} />
                <span className="relative size-[26.23px] rounded-full border-[7.87px] border-bleu bg-jaune" />
              </span>
            ))}
          </div>
        </CanevasAEchelle>
      </Apparition>

      <Apparition as="p" className="mx-auto mt-[132px] max-w-[790px] text-center font-courier leading-[1.3] text-black" style={{ fontSize: 'clamp(24px, 2.78vw, 40px)' }}>
        Une nuit rythmée par la recherche d’<span className="sr-only">idées</span><MotDecoupe lettres={IDEES} palette="accueil" gap={1} className="mx-1 align-middle" /> la production, les pauses, les repas, la{' '}
        <span className="sr-only">préparation</span><MotDecoupe lettres={PRERATION} palette="accueil" gap={1} className="mx-1 align-middle" /> de la présentation finale.
      </Apparition>
    </section>
  )
}

/* ---------------------------------------------------------------- programme */
const PROGRAMME = [
  { tag: 'Top départ', heure: '09:00', titre: 'Lancement & découverte', texte: 'Accueil, révélation du sujet et des contraintes. Les équipes choisissent leur angle et répartissent les rôles.', etape: 'ÉTAPE 01', duree: '2H', num: '01', fond: 'bg-jaune', txt: 'text-bleu', bord: 'border-bleu', pastille: 'bg-bleu text-jaune', numCls: 'text-bleu opacity-10' },
  { tag: 'Créer', heure: '20:00', titre: 'Production en équipe', texte: 'Design, développement et communication avancent ensemble, au rythme des repas et des pauses nocturnes.', etape: 'ÉTAPE 02', duree: '14H', num: '02', fond: 'bg-grisnoir', txt: 'text-jaune', bord: 'border-jaune', pastille: 'bg-jaune text-bleu', numCls: 'text-jaune opacity-[0.13]' },
  { tag: 'Convaincre', heure: '08:00', titre: 'Finalisation & pitch', texte: 'Les livrables prennent forme. Chaque équipe affine son projet, prépare sa présentation et remet sa production.', etape: 'ÉTAPE 03', duree: '6H', num: '03', fond: 'bg-pierre', txt: 'text-bleu', bord: 'border-bleu', pastille: 'bg-bleu text-carte', numCls: 'text-bleu opacity-10' },
  { tag: 'Célébrer', heure: '10:00', titre: 'Jury & résultats', texte: 'Place aux présentations, aux délibérations et à la remise des trophées pour clôturer cette nuit de création.', etape: 'ÉTAPE 04', duree: '2H', num: '04', fond: 'bg-bleu', txt: 'text-blanc', bord: 'border-blanc', pastille: 'bg-blanc text-bleu', numCls: 'text-blanc opacity-10' },
]

function Programme() {
  return (
    <section aria-label="Programme de la nuit" className="px-4 pb-24 md:px-[98px]">
      <Cascade pas={0.15} className="grid gap-6 lg:grid-cols-2">
        {PROGRAMME.map((c, i) => (
          <Element as="article" key={c.num} whileHover={{ y: -10, rotate: i % 2 ? 0.8 : -0.8 }} className={`group relative flex min-h-[368px] flex-col overflow-hidden rounded-[28px] p-[37px] ${c.fond} ${c.txt}`}>
            <span aria-hidden="true" className={`pointer-events-none absolute bottom-[-40px] right-[-30px] font-outfit text-[280.7px] font-bold leading-[210.5px] tracking-[-0.11em] transition-transform duration-700 ease-out group-hover:-translate-x-6 group-hover:-translate-y-3 ${c.numCls}`}>{c.num}</span>
            <div className="relative flex items-center justify-between font-courier text-[16px] font-bold tracking-[1.38px] md:text-[18px]">
              <span className={`rounded-full border px-[11.2px] py-[7.2px] uppercase leading-[17.3px] ${c.bord}`}>{c.tag}</span>
              <span>{c.heure}</span>
            </div>
            <div className="relative max-w-[496px] py-10">
              <h3 className="max-w-[299px] font-courier text-[30px] font-bold uppercase leading-[0.95] md:text-[38.28px]">{c.titre}</h3>
              <p className="pt-4 font-courier text-[16px] leading-[22.8px] md:text-[18px]">{c.texte}</p>
            </div>
            <div className={`relative mt-auto flex items-center justify-between border-t pt-4 ${c.bord}`}>
              <span className="font-courier text-[16px] font-bold tracking-[1.38px] md:text-[18px]">{c.etape}</span>
              <span className={`grid size-[38.4px] place-items-center rounded-full font-courier text-[16px] font-bold transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-125 md:text-[18px] ${c.pastille}`}>{c.duree}</span>
            </div>
          </Element>
        ))}
      </Cascade>
    </section>
  )
}

/* ---------------------------------------------------------------- trophée (teaser flouté) */
function Trophee() {
  const ref = useRef(null)
  // Le modèle pèse lourd : on ne le charge qu'à l'approche de la section.
  const proche = useInView(ref, { once: true, margin: '400px' })
  return (
    <section aria-labelledby="t-trophee" className="px-4 pb-24 md:px-[98px]">
      <div className="grid items-center gap-10 overflow-hidden rounded-[28px] bg-grisnoir p-8 md:p-12 lg:grid-cols-[1fr_520px]">
        <div>
          <Apparition as="p" className="font-courier text-[16px] font-bold uppercase tracking-[2px] text-jaune/70 md:text-[18px]">À la clé</Apparition>
          <Apparition as="h2" id="t-trophee" delai={0.1} className="mt-4 font-courier font-bold uppercase leading-[0.95] text-jaune" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>
            Le trophée
          </Apparition>
          <Apparition as="p" delai={0.2} className="mt-6 max-w-[460px] font-courier text-[16px] leading-[1.45] text-blanc md:text-[18px]">
            Imaginé et fabriqué pour cette édition, il récompensera l’équipe gagnante. Pour l’instant, il reste dans l’ombre : il sera dévoilé le jour J.
          </Apparition>
          <Apparition as="p" delai={0.3} className="mt-8 inline-block -rotate-2 bg-jaune px-3 py-1 font-shoulders text-[26px] font-black text-grisnoir md:text-[32px]">
            Révélé le jour J
          </Apparition>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE }}
          className="group relative mx-auto aspect-square w-full max-w-[520px]"
          role="img"
          aria-label="Le trophée de la Nuit MMI 2027, volontairement flouté avant sa révélation"
        >
          <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-jaune/25 blur-3xl" />
          {proche && (
            <Suspense fallback={null}>
              <Trophee3D className="absolute inset-0 blur-[34px] transition-[filter] duration-700 group-hover:blur-[26px]" />
            </Suspense>
          )}
          <motion.span
            aria-hidden="true"
            initial={{ scale: 2.5, rotate: -30, opacity: 0 }}
            whileInView={{ scale: 1, rotate: -12, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.6 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border-4 border-jaune px-4 py-1 font-glitch text-[34px] text-jaune md:text-[44px]"
            style={{ x: '-50%', y: '-50%' }}
          >
            TOP SECRET
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}

export default function Accueil() {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-fond">
      <EnTete />
      <div className="mx-auto max-w-page">
        <Heros />
      </div>
      <Planning />
      <div className="mx-auto max-w-page">
        <Vivre />
        <VingtQuatreHeures />
        <Programme />
        <Trophee />
      </div>
      <PiedDePage />
    </div>
  )
}
