import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { Apparition, Cascade, Element } from './Anime.jsx'
import facebook from '../assets/svg/facebook.svg'
import twitter from '../assets/svg/twitter.svg'
import instagram from '../assets/svg/instagram.svg'
import linkedin from '../assets/svg/linkedin.svg'
import youtube from '../assets/svg/youtube.svg'

const COLONNES = [
  ['Le projet', [['Programme', '/accueil'], ['Règlement', '/reglement']]],
  ['Contact', [['contact@nuitmmi.fr', 'mailto:contact@nuitmmi.fr']]],
]
const RESEAUX = [['Facebook', facebook, 'w-[14.5px]'], ['Twitter', twitter, 'w-[25px]'], ['Instagram', instagram, 'w-[25px]'], ['LinkedIn', linkedin, 'w-[25px]'], ['YouTube', youtube, 'w-[27.6px]']]
const MOTS = ['Créer', '✦', 'Sans dormir', '✦', '24 heures', '✦', 'En équipe', '✦', 'Du brief au pitch', '✦']

export default function PiedDePage() {
  return (
    <footer>
      {/* Bandeau défilant */}
      <div aria-hidden="true" className="overflow-hidden border-y border-bleu/15 bg-jaune py-4">
        <div className="defile flex w-max will-change-transform">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center gap-8 pr-8 font-courier text-[22px] font-bold uppercase tracking-[2px] text-bleu md:text-[28px]">
              {/* Répété pour que chaque copie dépasse les écrans les plus larges (sinon un vide apparaît en fin de boucle) */}
              {[...MOTS, ...MOTS, ...MOTS].map((m, i) => <span key={i} className="whitespace-nowrap">{m}</span>)}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-page flex-col gap-12 px-4 pb-16 pt-[65px] md:flex-row md:justify-between md:px-[77px]">
        <Apparition className="flex flex-col gap-[55px]">
          <Link to="/accueil" className="logo-cligne flex items-start" aria-label="Nuit MMI 2027 — accueil">
            <Logo annee={null} className="h-[100px] w-[198px] md:h-[132.8px] md:w-[263px]" />
            <span className="-ml-6 font-inter text-[22px] font-black leading-[42.2px] text-jaune md:-ml-8 md:text-[28.2px]">2027</span>
          </Link>
          <Cascade as="ul" pas={0.08} className="flex items-center gap-5">
            {RESEAUX.map(([n, src, w]) => (
              <Element as="li" key={n}>
                <a href="#" aria-label={n} className="block transition-transform duration-300 hover:-translate-y-1 hover:rotate-6">
                  <img src={src} alt="" className={`h-[25px] object-contain ${w}`} />
                </a>
              </Element>
            ))}
          </Cascade>
        </Apparition>
        <div className="flex flex-wrap gap-x-[80px] gap-y-10">
          {COLONNES.map(([titre, liens], i) => (
            <Apparition as="nav" delai={0.1 * (i + 1)} key={titre} aria-label={titre} className="flex flex-col gap-10">
              <p className="font-courier text-[20px] font-bold leading-[22px] text-jaune">{titre}</p>
              <ul className="flex flex-col gap-[18px]">
                {liens.map(([l, vers]) => (
                  <li key={l}>
                    {vers.startsWith('/') ? (
                      <Link to={vers} className="font-courier text-[20px] font-bold leading-[22px] text-bleu underline-offset-4 hover:underline">{l}</Link>
                    ) : (
                      <a href={vers} className="font-courier text-[20px] font-bold leading-[22px] text-bleu underline-offset-4 hover:underline">{l}</a>
                    )}
                  </li>
                ))}
              </ul>
            </Apparition>
          ))}
        </div>
      </div>
      <p className="mx-auto max-w-page px-4 pb-8 font-courier text-[14px] text-bleu/60 md:px-[77px]">© 2027 Nuit MMI · Département MMI</p>
    </footer>
  )
}
