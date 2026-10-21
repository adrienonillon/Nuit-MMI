// Bord ondulé entre une bande de couleur et le fond de page.
// retournee = vague au-dessus de la bande (la couleur est en bas) ; sinon en dessous.
// Deux couches de vagues décalées qui défilent lentement en boucle.
const ONDE = 'M0 30 C120 6 240 6 360 30 S600 54 720 30 S960 6 1080 30 S1320 54 1440 30 V64 H0 Z'

function Couche({ opacite, duree, decalage, hauteur }) {
  return (
    <div className="vague-defile absolute inset-x-0 bottom-0 flex w-[200%]" style={{ animationDuration: `${duree}s`, animationDelay: `${decalage}s`, height: hauteur }}>
      {[0, 1].map((k) => (
        <svg key={k} viewBox="0 0 1440 64" preserveAspectRatio="none" className="block h-full w-1/2 shrink-0">
          <path d={ONDE} fill="currentColor" fillOpacity={opacite} />
        </svg>
      ))}
    </div>
  )
}

export default function Vague({ retournee = false, couleur = 'text-bleu', className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-[34px] w-full overflow-hidden md:h-[52px] ${couleur} ${retournee ? '-mb-px' : '-mt-px'} ${className}`}
      style={{ transform: retournee ? undefined : 'scaleY(-1)' }}
    >
      <Couche opacite={0.35} duree={22} decalage={-7} hauteur="100%" />
      <Couche opacite={1} duree={16} decalage={0} hauteur="78%" />
    </div>
  )
}
