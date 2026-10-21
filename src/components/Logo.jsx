import logoBrut from '../assets/svg/logo.svg?raw'

// Logo Nuit MMI (composant Figma « Logo Nuit MMI », recolorable).
// lettres : couleur des lettres · yeux : couleur des yeux · annee : couleur de « 2027 » (null pour la masquer)
export default function Logo({ lettres = '#151147', yeux = '#F3C137', annee = '#151147', className = '', titre = 'Nuit MMI 2027' }) {
  let svg = logoBrut
    .replace(/preserveAspectRatio="none"/, '')
    .replace(/style="display: block;"/, '')
    .replace(/width="[\d.]+" height="[\d.]+"/, 'width="100%" height="100%"')
    .replace(/fill="#151147"/g, `fill="${lettres}"`)
    .replace(/fill="#F3C137"/g, `fill="${yeux}"`)
  // « 2027 » est le dernier tracé (Vector_14)
  svg = svg.replace(/(<path id="Vector_14"[^>]*?)fill="[^"]*"/, annee ? `$1fill="${annee}"` : '$1fill="none"')
  return <span role="img" aria-label={titre} className={`block ${className}`} dangerouslySetInnerHTML={{ __html: svg }} />
}
