// Barre du haut des pages piratée / restaurée.
export default function BarreHaut({ etat = 'piraté', edition = false }) {
  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-2 px-4 py-4 font-courier text-[15px] font-bold text-bleu md:px-[130px] md:text-[18px]">
      <p className="flex flex-wrap items-center gap-[6px]">
        <span>nuitmmi.fr ·</span>
        <span className="bg-grisnoir px-2 py-[2px] text-jaune">{etat}</span>
        <span>le 03.14 à 03h14</span>
      </p>
      {edition && <p>Édition 2027</p>}
    </header>
  )
}
