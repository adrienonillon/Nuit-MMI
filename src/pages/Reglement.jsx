import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import EnTete from '../components/EnTete.jsx'
import PiedDePage from '../components/PiedDePage.jsx'
import Vague from '../components/Vague.jsx'
import { Apparition, Cascade, Compteur, EASE, Element } from '../components/Anime.jsx'
import { MotDecoupe } from '../components/LettreDecoupee.jsx'
import { REGLEMENT, ARTICLES as LETTRES_ARTICLES } from '../data/lettres.js'
import { EVENEMENT } from '../config.js'
import { formatDateLongue } from '../lib/useCompteARebours.js'

// ===== Contenu du règlement (à faire valider par l'équipe organisatrice) =====
const ARTICLES = [
  {
    id: 'objet',
    titre: 'Objet',
    points: [
      `La Nuit MMI 2027 est un challenge de création numérique de 24 heures organisé par le département MMI. Elle débute le ${formatDateLongue(EVENEMENT)}.`,
      'Les équipes découvrent un sujet au lancement et doivent produire, en temps limité, une réponse créative et fonctionnelle.',
      'Ce règlement s’applique à toutes les personnes inscrites. S’inscrire, c’est l’accepter.',
    ],
  },
  {
    id: 'participants',
    titre: 'Participants & inscription',
    points: [
      'La Nuit MMI est ouverte aux étudiants de BUT 2 et de BUT 3 du département MMI.',
      'L’inscription est gratuite et obligatoire, dans la limite des places disponibles.',
    ],
  },
  {
    id: 'equipes',
    titre: 'Équipes',
    points: [
      'Chaque équipe compte entre 4 et 6 membres. Le mélange des années (BUT 2 et BUT 3) et des profils (design, dev, com) est vivement encouragé.',
      'Une équipe peut être formée à l’avance ou constituée par l’organisation le jour J.',
      'La composition d’une équipe ne peut plus changer une fois le sujet révélé, sauf accord de l’organisation.',
    ],
  },
  {
    id: 'deroulement',
    titre: 'Déroulement',
    points: [
      'Le sujet et ses contraintes sont dévoilés au lancement. Aucun travail préparé à l’avance n’est accepté.',
      'Les équipes travaillent dans les salles prévues pendant toute la durée de l’événement. Repas et pauses sont organisés sur place.',
      'Les livrables doivent être remis avant l’heure limite annoncée. Tout retard entraîne l’exclusion du classement.',
    ],
  },
  {
    id: 'livrables',
    titre: 'Livrables & originalité',
    points: [
      'Toutes les productions doivent être réalisées pendant la Nuit MMI.',
      'Les ressources externes (polices, images, sons, bibliothèques de code) doivent être libres de droits et créditées.',
      'L’usage d’outils d’IA générative doit être déclaré dans le rendu final. Le plagiat entraîne la disqualification.',
    ],
  },
  {
    id: 'jury',
    titre: 'Jury & évaluation',
    points: [
      'Chaque équipe présente son projet lors d’un pitch devant un jury composé d’enseignants.',
      'Critères : pertinence par rapport au sujet, créativité, qualité de réalisation, travail d’équipe et qualité du pitch.',
    ],
  },
  {
    id: 'prix',
    titre: 'Prix',
    points: [
      'Les équipes lauréates reçoivent le trophée de la Nuit MMI 2027 ainsi que des lots offerts par les partenaires.',
      'Les lots ne peuvent être ni échangés ni convertis en argent.',
    ],
  },
  {
    id: 'conduite',
    titre: 'Conduite & sécurité',
    points: [
      'Respect, bienveillance et entraide sont de rigueur. Tout comportement discriminant ou dangereux entraîne l’exclusion immédiate.',
      'Alcool et substances illicites sont strictement interdits dans les locaux.',
      'Les participants prennent soin du matériel et des salles mis à disposition, et respectent les consignes de sécurité.',
    ],
  },
  {
    id: 'droits',
    titre: 'Image & propriété',
    points: [
      'Des photos et vidéos seront prises pendant l’événement pour sa communication. Les participants peuvent s’y opposer en le signalant à l’organisation.',
      'Les projets restent la propriété de leurs auteurs. Le département MMI peut les présenter pour valoriser l’événement, en citant les équipes.',
    ],
  },
]

const CHIFFRES = [
  [24, 'heures', 'pour créer'],
  [6, 'max.', 'par équipe'],
  [1, 'sujet', 'révélé au départ'],
  [1, 'trophée', 'à décrocher'],
]

const allerA = (id) => (e) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// Article visible à l'écran, pour surligner le sommaire.
function useArticleActif(ids) {
  const [actif, setActif] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entrees) => entrees.forEach((e) => e.isIntersecting && setActif(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' },
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [ids])
  return actif
}

/* ---------------------------------------------------------------- héros */
function Heros() {
  return (
    <section aria-labelledby="t-reglement" className="mx-auto max-w-page px-4 pb-20 pt-6 md:px-[77px]">
      <div className="flex items-center justify-between gap-4">
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="font-inter text-[16px] uppercase tracking-[2.23px] text-encre md:text-[18px]"
        >
          Nuit MMI · Édition 2027
        </motion.p>
        <motion.p
          initial={{ opacity: 0, scale: 1.6, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 1.6 }}
          className="hidden rounded-md border-2 border-bleu px-3 py-1 font-courier text-[15px] font-bold tracking-[2.23px] text-bleu sm:block md:text-[17px]"
        >
          LU & APPROUVÉ
        </motion.p>
      </div>
      <h1 id="t-reglement" className="flex flex-col pt-10 md:pt-[58px]">
        <span className="sr-only">Le règlement</span>
        <span aria-hidden="true" className="-mt-8 block overflow-hidden pb-2 pt-8">
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="block font-outfit font-bold uppercase leading-[0.78] tracking-[-0.06em] text-encre"
            style={{ fontSize: 'clamp(64px, 8vw, 115.2px)' }}
          >
            Le
          </motion.span>
        </span>
        <span className="mt-4 flex flex-wrap items-center gap-6 md:gap-10">
          <span aria-hidden="true" className="flex flex-wrap items-start"><MotDecoupe lettres={REGLEMENT} palette="accueil" gap={4} anime delai={0.55} /></span>
          <motion.span
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: -10 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 1.4 }}
            className="flex size-[96px] shrink-0 flex-col items-center justify-center rounded-full bg-jaune text-bleu shadow-[3px_5px_0_0_#0e0d12] md:size-[112px]"
          >
            <span className="font-shoulders text-[26px] font-black leading-none md:text-[30px]">{ARTICLES.length}</span>
            <span className="font-courier text-[13px] font-bold md:text-[14px]">articles</span>
          </motion.span>
        </span>
      </h1>
      <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Apparition as="p" delai={1.1} className="max-w-[640px] font-courier text-[16px] leading-[1.4] text-bleu md:text-[18px]">
          Tout ce qu’il faut savoir avant de passer 24 heures à créer sans dormir : qui peut participer, comment se forment les équipes, ce qu’il faut rendre et comment le jury tranche.
        </Apparition>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.7, ease: EASE }} className="flex shrink-0 flex-wrap gap-4">
          <a href="#articles" onClick={allerA('articles')} className="group flex items-center gap-[10px] rounded-lg bg-grisnoir px-[18px] py-[9px] font-courier text-[18px] font-bold text-jaune transition-colors hover:bg-bleu md:text-[20px]">
            Lire le règlement
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-1"><path d="M12 5v14m0 0-6-6m6 6 6-6" stroke="#F3C137" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <Link to="/accueil" className="flex items-center rounded-lg border border-bleu px-[18px] py-[9px] font-courier text-[18px] font-bold text-bleu transition-colors hover:bg-bleu hover:text-jaune md:text-[20px]">
            Retour à l’accueil
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- l'essentiel */
function Essentiel() {
  return (
    <section aria-labelledby="t-essentiel" className="relative">
      <Vague retournee />
      <div className="bg-bleu px-4 py-16 md:px-[99px] md:py-20">
        <div className="mx-auto max-w-page">
          <Apparition as="h2" id="t-essentiel" x={-40} y={0} className="font-courier font-bold uppercase tracking-[2.84px] text-jaune" style={{ fontSize: 'clamp(34px, 4vw, 56px)' }}>
            L’essentiel
          </Apparition>
          <Cascade as="ul" pas={0.12} className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {CHIFFRES.map(([n, unite, legende]) => (
              <Element as="li" key={legende} className="flex flex-col gap-2 border-t border-blanc/30 pt-5">
                <span className="flex items-baseline gap-2">
                  <Compteur valeur={n} className="font-outfit text-[72px] font-bold leading-none tracking-[-0.06em] text-jaune md:text-[96px]" />
                  <span className="font-courier text-[18px] font-bold uppercase text-blanc md:text-[22px]">{unite}</span>
                </span>
                <span className="font-courier text-[16px] text-blanc/80 md:text-[18px]">{legende}</span>
              </Element>
            ))}
          </Cascade>
        </div>
      </div>
      <Vague />
    </section>
  )
}

/* ---------------------------------------------------------------- articles */
function Sommaire({ actif }) {
  return (
    <nav aria-label="Sommaire du règlement" className="hidden lg:block">
      <div className="sticky top-28">
        <p className="mb-5 font-courier text-[14px] font-bold uppercase tracking-[2px] text-bleu/60">Sommaire</p>
        <ol className="relative flex flex-col border-l-2 border-bleu/15">
          {ARTICLES.map((a, i) => {
            const estActif = a.id === actif
            return (
              <li key={a.id} className="relative">
                {estActif && <motion.span layoutId="sommaire-actif" className="absolute -left-[2px] top-0 h-full w-[3px] bg-jaune" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <a
                  href={`#${a.id}`}
                  onClick={allerA(a.id)}
                  className={`flex gap-3 py-[7px] pl-5 font-courier text-[16px] transition-all duration-300 hover:translate-x-1 ${estActif ? 'font-bold text-bleu' : 'text-bleu/55 hover:text-bleu'}`}
                >
                  <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  {a.titre}
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

function Article({ article, index }) {
  const fonce = index % 3 === 1
  return (
    <motion.article
      id={article.id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: EASE }}
      whileHover={{ rotate: index % 2 ? 0.4 : -0.4 }}
      className={`group relative scroll-mt-28 overflow-hidden rounded-[28px] p-7 md:p-[37px] ${fonce ? 'bg-grisnoir text-jaune' : index % 3 === 2 ? 'bg-jaune text-bleu' : 'bg-pierre text-bleu'}`}
    >
      <span aria-hidden="true" className={`pointer-events-none absolute -bottom-10 -right-4 font-outfit text-[200px] font-bold leading-none tracking-[-0.11em] transition-transform duration-700 ease-out group-hover:-translate-x-4 group-hover:-translate-y-2 md:text-[240px] ${fonce ? 'text-jaune/10' : 'text-bleu/10'}`}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="relative">
        <span className={`inline-block rounded-full border px-[11px] py-[6px] font-courier text-[14px] font-bold uppercase tracking-[1.4px] ${fonce ? 'border-jaune' : 'border-bleu'}`}>
          Article {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="mt-5 font-courier text-[28px] font-bold uppercase leading-[0.95] md:text-[36px]">{article.titre}</h3>
        <ul className="mt-6 flex max-w-[640px] flex-col gap-4">
          {article.points.map((p, i) => (
            <li key={i} className={`flex gap-3 font-courier text-[16px] leading-[1.45] md:text-[18px] ${fonce ? 'text-blanc' : ''}`}>
              <span aria-hidden="true" className={`mt-[9px] size-[9px] shrink-0 rounded-full ${fonce ? 'bg-jaune' : 'bg-bleu'}`} />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

function Articles() {
  const actif = useArticleActif(ARTICLES.map((a) => a.id))
  return (
    <section id="articles" aria-labelledby="t-articles" className="mx-auto max-w-page scroll-mt-20 px-4 pb-24 pt-20 md:px-[77px] md:pt-[110px]">
      <h2 id="t-articles" className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="sr-only">Les articles</span>
        <Apparition as="span" aria-hidden="true" x={-40} y={0} className="font-outfit font-bold uppercase leading-none tracking-[-0.055em] text-encre" style={{ fontSize: 'clamp(44px, 5.8vw, 83.65px)' }}>Les</Apparition>
        <MotDecoupe lettres={LETTRES_ARTICLES} palette="accueil" gap={6} anime delai={0.15} />
      </h2>
      <div className="mt-14 grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
        <Sommaire actif={actif} />
        <div className="flex flex-col gap-6">
          {ARTICLES.map((a, i) => <Article key={a.id} article={a} index={i} />)}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- appel final */
function Question() {
  return (
    <section aria-labelledby="t-question" className="mx-auto max-w-page px-4 pb-24 md:px-[77px]">
      <Apparition y={60} className="flex flex-col items-start justify-between gap-8 rounded-[28px] border-2 border-dashed border-bleu p-8 md:flex-row md:items-center md:p-12">
        <div>
          <h2 id="t-question" className="font-courier text-[30px] font-bold uppercase leading-[0.95] text-bleu md:text-[42px]">Une question ?</h2>
          <p className="mt-3 max-w-[520px] font-courier text-[16px] text-bleu md:text-[18px]">L’équipe organisatrice répond à tout ce que le règlement ne dit pas.</p>
        </div>
        <motion.a
          href="mailto:contact@nuitmmi.fr"
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.96 }}
          className="rounded-full bg-grisnoir px-6 py-3 font-courier text-[18px] font-bold text-jaune transition-colors hover:bg-bleu md:text-[20px]"
        >
          contact@nuitmmi.fr
        </motion.a>
      </Apparition>
    </section>
  )
}

export default function Reglement() {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-fond">
      <EnTete />
      <Heros />
      <Essentiel />
      <Articles />
      <Question />
      <PiedDePage />
    </div>
  )
}
