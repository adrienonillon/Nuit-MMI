import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import EnTete from '../components/EnTete.jsx'
import PiedDePage from '../components/PiedDePage.jsx'
import { Apparition, Cascade, EASE, Element } from '../components/Anime.jsx'
import { MotDecoupe } from '../components/LettreDecoupee.jsx'
import { PROJETS as LETTRES_PROJETS } from '../data/lettres.js'
import { PROJETS } from '../data/projets.js'
import { EVENEMENT } from '../config.js'
import { formatDateLongue, useCompteARebours } from '../lib/useCompteARebours.js'

// La Nuit dure 24 heures : les projets sont publiés après.
const FIN = new Date(EVENEMENT.getTime() + 24 * 36e5)

/* ---------------------------------------------------------------- héros */
function Heros() {
  return (
    <section aria-labelledby="t-projets" className="mx-auto max-w-page px-4 pb-16 pt-6 md:px-[77px]">
      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className="font-inter text-[16px] uppercase tracking-[2.23px] text-encre md:text-[18px]"
      >
        Nuit MMI · Édition 2027
      </motion.p>
      <h1 id="t-projets" className="flex flex-wrap items-end gap-x-6 gap-y-4 pt-10 md:pt-[58px]">
        <span className="sr-only">Les projets</span>
        <span aria-hidden="true" className="-mt-8 block overflow-hidden pb-2 pt-8">
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="block font-outfit font-bold uppercase leading-[0.78] tracking-[-0.06em] text-encre"
            style={{ fontSize: 'clamp(64px, 8vw, 115.2px)' }}
          >
            Les
          </motion.span>
        </span>
        <span aria-hidden="true" className="flex flex-wrap items-start"><MotDecoupe lettres={LETTRES_PROJETS} palette="accueil" gap={4} anime delai={0.55} /></span>
      </h1>
      <Apparition as="p" delai={1.1} className="mt-8 max-w-[620px] font-courier text-[16px] leading-[1.4] text-bleu md:text-[18px]">
        24 heures, un sujet, des équipes qui ne dorment pas. Voici ce qui en est sorti : toutes les productions de la Nuit MMI 2027.
      </Apparition>
    </section>
  )
}

/* ---------------------------------------------------------------- podium */
// Ordre d'affichage : 2e à gauche, 1er au centre, 3e à droite.
const MARCHES = [
  { rang: 2, hauteur: 'h-[120px] md:h-[190px]', cls: 'bg-bleu text-jaune', delai: 0.15 },
  { rang: 1, hauteur: 'h-[170px] md:h-[270px]', cls: 'bg-jaune text-bleu', delai: 0 },
  { rang: 3, hauteur: 'h-[85px] md:h-[130px]', cls: 'bg-grisnoir text-jaune', delai: 0.3 },
]

function Podium() {
  const revele = PROJETS.some((p) => p.rang)
  return (
    <section aria-labelledby="t-podium" className="mx-auto max-w-page px-4 pb-24 md:px-[77px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Apparition as="h2" id="t-podium" x={-40} y={0} className="font-courier font-bold uppercase tracking-[2.84px] text-encre" style={{ fontSize: 'clamp(34px, 4vw, 56px)' }}>
          Le podium
        </Apparition>
        {!revele && (
          <Apparition as="p" delai={0.2} className="font-courier text-[16px] text-bleu md:text-[18px]">
            Révélé à la fin de la Nuit, après le passage devant le jury.
          </Apparition>
        )}
      </div>

      <ol className="mt-12 grid grid-cols-3 items-end gap-2 md:gap-6">
        {MARCHES.map(({ rang, hauteur, cls, delai }) => {
          const projet = PROJETS.find((p) => p.rang === rang)
          return (
            <li key={rang} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.6 + delai, ease: EASE }}
                className="mb-4 flex w-full flex-col items-center text-center"
              >
                {rang === 1 && (
                  <motion.svg
                    viewBox="0 0 24 24" aria-hidden="true" className="mb-2 size-[34px] md:size-[48px]"
                    animate={{ rotate: [-6, 6, -6] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path d="M3 8l4.5 3.5L12 4l4.5 7.5L21 8l-2 11H5L3 8z" fill="#F3C137" stroke="#151147" strokeWidth="1.5" strokeLinejoin="round" />
                  </motion.svg>
                )}
                {projet ? (
                  <>
                    <div className="mb-3 aspect-square w-full max-w-[220px] overflow-hidden rounded-[18px] bg-bleu md:rounded-[24px]">
                      {projet.image && <img src={projet.image} alt="" className="size-full object-cover" />}
                    </div>
                    <span className="font-courier text-[12px] font-bold uppercase tracking-[1.2px] text-bleu/70 md:text-[14px]">{projet.equipe}</span>
                    <span className="mt-1 font-courier text-[15px] font-bold uppercase leading-[1] text-bleu md:text-[24px]">{projet.titre}</span>
                  </>
                ) : (
                  <>
                    <div className="mb-3 flex aspect-square w-full max-w-[220px] items-center justify-center rounded-[18px] border-2 border-dashed border-bleu/25 md:rounded-[24px]">
                      <span className="font-outfit text-[48px] font-bold tracking-[-0.08em] text-bleu/15 md:text-[88px]">??</span>
                    </div>
                    <span className="font-courier text-[13px] font-bold uppercase text-bleu/50 md:text-[16px]">Équipe mystère</span>
                  </>
                )}
              </motion.div>
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: delai, ease: EASE }}
                className={`flex w-full origin-bottom items-start justify-center rounded-t-[18px] pt-3 md:rounded-t-[28px] md:pt-5 ${hauteur} ${cls}`}
              >
                <span className="font-outfit text-[48px] font-bold leading-none tracking-[-0.06em] md:text-[96px]">
                  {rang}<sup className="text-[0.35em]">{rang === 1 ? 'er' : 'e'}</sup>
                </span>
              </motion.div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

/* ---------------------------------------------------------------- projets publiés */
function CarteProjet({ projet, index }) {
  const fonce = index % 3 === 1
  const Racine = projet.lien ? motion.a : motion.article
  return (
    <Element as="li">
      <Racine
        {...(projet.lien ? { href: projet.lien, target: '_blank', rel: 'noreferrer' } : {})}
        whileHover={{ y: -6, rotate: index % 2 ? 0.6 : -0.6 }}
        className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] ${fonce ? 'bg-grisnoir text-jaune' : index % 3 === 2 ? 'bg-jaune text-bleu' : 'bg-pierre text-bleu'}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-bleu">
          {projet.image ? (
            <img src={projet.image} alt="" className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          ) : (
            <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-outfit text-[120px] font-bold tracking-[-0.08em] text-jaune/20">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
          {projet.prix && (
            <span className="absolute right-4 top-4 rotate-[-6deg] rounded-full bg-jaune px-4 py-2 font-courier text-[14px] font-bold uppercase text-bleu shadow-[3px_4px_0_0_#0e0d12]">
              {projet.prix}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-7">
          <span className={`self-start rounded-full border px-[11px] py-[6px] font-courier text-[13px] font-bold uppercase tracking-[1.4px] ${fonce ? 'border-jaune' : 'border-bleu'}`}>
            {projet.equipe}
          </span>
          <h3 className="mt-4 font-courier text-[26px] font-bold uppercase leading-[0.95] md:text-[30px]">{projet.titre}</h3>
          <p className={`mt-4 font-courier text-[16px] leading-[1.45] ${fonce ? 'text-blanc' : ''}`}>{projet.description}</p>
          {projet.membres?.length > 0 && (
            <p className={`mt-auto pt-6 font-courier text-[14px] ${fonce ? 'text-blanc/70' : 'opacity-70'}`}>{projet.membres.join(' · ')}</p>
          )}
        </div>
      </Racine>
    </Element>
  )
}

function Galerie() {
  return (
    <section aria-labelledby="t-galerie" className="mx-auto max-w-page px-4 pb-24 md:px-[77px]">
      <Apparition as="h2" id="t-galerie" x={-40} y={0} className="mb-10 font-courier font-bold uppercase tracking-[2.84px] text-encre" style={{ fontSize: 'clamp(34px, 4vw, 56px)' }}>
        Tous les projets
      </Apparition>
      <Cascade as="ul" pas={0.1} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJETS.map((p, i) => <CarteProjet key={p.titre} projet={p} index={i} />)}
      </Cascade>
    </section>
  )
}

/* ---------------------------------------------------------------- en attente */
function Attente() {
  const t = useCompteARebours(FIN)
  const termine = Date.now() >= FIN.getTime()
  return (
    <section aria-labelledby="t-attente" className="mx-auto max-w-page px-4 pb-24 md:px-[77px]">
      <Apparition y={60} className="relative overflow-hidden rounded-[28px] bg-bleu p-8 md:p-12">
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-block rounded-full border border-jaune px-[11px] py-[6px] font-courier text-[14px] font-bold uppercase tracking-[1.4px] text-jaune">
              {termine ? 'En cours de mise en ligne' : 'Bientôt dévoilés'}
            </span>
            <h2 id="t-attente" className="mt-5 font-courier text-[30px] font-bold uppercase leading-[0.95] text-jaune md:text-[42px]">
              {termine ? 'Les projets arrivent' : 'Rien à voir… pour l’instant'}
            </h2>
            <p className="mt-4 max-w-[560px] font-courier text-[16px] leading-[1.45] text-blanc md:text-[18px]">
              {termine
                ? 'La Nuit est terminée. Les équipes déposent leurs productions : elles apparaîtront ici très vite.'
                : `Les projets n’existent pas encore : ils seront créés pendant la Nuit, qui débute le ${formatDateLongue(EVENEMENT)}, puis publiés ici une fois les 24 heures écoulées.`}
            </p>
          </div>
          {!termine && (
            <div className="flex flex-col gap-2">
              <p className="font-courier text-[14px] font-bold uppercase tracking-[2px] text-blanc/60">Publication dans</p>
              <p className="flex gap-4 font-outfit font-bold tabular-nums tracking-[-0.04em] text-jaune">
                {[[t.jours, 'j'], [t.heures, 'h'], [t.minutes, 'min'], [t.secondes, 's']].map(([v, u]) => (
                  <span key={u} className="flex items-baseline gap-1">
                    <span className="text-[44px] leading-none md:text-[56px]">{v}</span>
                    <span className="font-courier text-[16px] text-blanc/70">{u}</span>
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      </Apparition>

      {/* Cartes fantômes : la place des futurs projets */}
      <Cascade as="ul" pas={0.08} aria-hidden="true" className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <Element as="li" key={i} className="flex flex-col overflow-hidden rounded-[28px] border-2 border-dashed border-bleu/25">
            <div className="flex aspect-[4/3] items-center justify-center bg-bleu/[0.04]">
              <span className="font-outfit text-[96px] font-bold tracking-[-0.08em] text-bleu/10">??</span>
            </div>
            <div className="flex flex-col gap-3 p-7">
              <span className="h-[26px] w-[110px] rounded-full bg-bleu/10" />
              <span className="h-[22px] w-3/4 rounded bg-bleu/10" />
              <span className="h-[14px] w-full rounded bg-bleu/[0.07]" />
              <span className="h-[14px] w-2/3 rounded bg-bleu/[0.07]" />
            </div>
          </Element>
        ))}
      </Cascade>

      <Apparition className="mt-12 flex flex-wrap gap-4">
        <Link to="/accueil" className="rounded-lg bg-grisnoir px-[18px] py-[9px] font-courier text-[18px] font-bold text-jaune transition-colors hover:bg-bleu md:text-[20px]">
          Découvrir le programme
        </Link>
        <Link to="/reglement" className="rounded-lg border border-bleu px-[18px] py-[9px] font-courier text-[18px] font-bold text-bleu transition-colors hover:bg-bleu hover:text-jaune md:text-[20px]">
          Lire le règlement
        </Link>
      </Apparition>
    </section>
  )
}

export default function Projets() {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-fond">
      <EnTete />
      <Heros />
      <Podium />
      {PROJETS.length > 0 ? <Galerie /> : <Attente />}
      <PiedDePage />
    </div>
  )
}
