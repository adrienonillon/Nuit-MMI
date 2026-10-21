// ===== Réglages faciles à modifier =====

// Date et heure de la Nuit MMI (fin du compte à rebours).
export const EVENEMENT = new Date('2027-01-28T19:00:00+01:00')

// Nombre de lettres du mot de passe (une fente par lettre).
export const LONGUEUR_CODE = 11

// SHA-256 du mot de passe en MAJUSCULES (le mot lui-même n'apparaît nulle part dans le code).
// Pour le changer : calculez le SHA-256 du nouveau mot en majuscules et collez-le ici.
export const HASH_CODE = 'c7d6687c9444ab73773c50720fb9401d4b64cff8b0c02e25cc0517e28f5abbc3'

// Messages du hacker en cas d'erreur (le premier correspond à la maquette).
export const MOQUERIES = [
  '« Raté. Recommencez. » — le hacker',
  '« Même pas proche. » — le hacker',
  '« Regardez mieux les affiches… » — le hacker',
  '« Le temps file, vous savez. » — le hacker',
]
