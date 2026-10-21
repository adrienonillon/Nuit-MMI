import { HASH_CODE } from '../config.js'

const CLE = 'nuitmmi-deverrouille'

export async function verifierCode(code) {
  const valeur = code.trim().toUpperCase()
  try {
    const octets = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(valeur))
    const hex = [...new Uint8Array(octets)].map((b) => b.toString(16).padStart(2, '0')).join('')
    return hex === HASH_CODE
  } catch {
    return false
  }
}

// On garde le code trouvé par le joueur pour l'afficher sur le site restauré
// (le mot de passe n'est jamais écrit en clair dans le code source).
export function memoriserAcces(code) {
  try { sessionStorage.setItem(CLE, code.trim().toUpperCase()) } catch { /* stockage indisponible */ }
}

export function codeTrouve() {
  try { return sessionStorage.getItem(CLE) || '' } catch { return '' }
}

export function oublierAcces() {
  try { sessionStorage.removeItem(CLE) } catch { /* stockage indisponible */ }
}

export function estDeverrouille() {
  return codeTrouve().length > 0
}
