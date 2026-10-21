import { Component } from 'react'

// Si la 3D plante (WebGL indisponible, modèle introuvable…), on affiche `repli` à la place.
// React n'attrape les erreurs qu'avec un composant « classe » : c'est la seule raison de cette syntaxe.
export default class Secours3D extends Component {
  state = { erreur: false }

  static getDerivedStateFromError() {
    return { erreur: true }
  }

  render() {
    return this.state.erreur ? (this.props.repli ?? null) : this.props.children
  }
}
