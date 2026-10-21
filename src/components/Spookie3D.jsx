import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import modele from '../assets/photos/Spookie.glb'
import spookiePng from '../assets/photos/spookie.png'

const calme = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Position de la souris sur toute la fenêtre, entre -1 et 1.
function useSouris() {
  const souris = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const maj = (e) => {
      souris.current.x = (e.clientX / window.innerWidth) * 2 - 1
      souris.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', maj)
    return () => window.removeEventListener('pointermove', maj)
  }, [])
  return souris
}

// Ombre douce au sol (dégradé radial).
function textureOmbre() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, 'rgba(21,17,71,0.45)')
  g.addColorStop(1, 'rgba(21,17,71,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

function Fantome({ souris, prise }) {
  const gltf = useLoader(GLTFLoader, modele)
  const groupe = useRef()
  const corps = useRef()
  const ombre = useRef()
  const tour = useRef({ cible: 0, actuel: 0 })
  const [survol, setSurvol] = useState(false)
  const reduit = useMemo(calme, [])

  // Les yeux sont dans le modèle (Oeil_D / Oeil_G) : on garde leur échelle d'origine pour les faire cligner.
  const { scene, yeux, centreY } = useMemo(() => {
    const s = gltf.scene.clone(true)
    s.updateMatrixWorld(true)
    const boite = new THREE.Box3().setFromObject(s)
    const yeux = ['Oeil_D', 'Oeil_G']
      .map((nom) => s.getObjectByName(nom))
      .filter(Boolean)
      .map((oeil) => ({ oeil, base: oeil.scale.y }))
    return { scene: s, yeux, centreY: (boite.max.y + boite.min.y) / 2 }
  }, [gltf])

  const texOmbre = useMemo(textureOmbre, [])

  useFrame(({ clock }, dt) => {
    const t = clock.getElapsedTime()
    const { x, y } = souris.current
    const g = groupe.current
    if (!g) return

    // Pirouette au clic
    tour.current.actuel = THREE.MathUtils.damp(tour.current.actuel, tour.current.cible, 4, dt)

    // Cliquer-glisser : il tourne avec la main, garde un peu d'élan, puis revient face à nous
    const p = prise.current
    if (!p.actif) {
      p.lacet += p.elan * dt * 60
      p.elan = THREE.MathUtils.damp(p.elan, 0, 2.5, dt)
      if (performance.now() - p.lache > 1400 && Math.abs(p.elan) < 0.003) {
        p.lacet = THREE.MathUtils.damp(p.lacet, Math.round(p.lacet / (Math.PI * 2)) * Math.PI * 2, 2.5, dt)
        p.tangage = THREE.MathUtils.damp(p.tangage, 0, 3, dt)
      }
    }
    const suivi = p.actif ? 0 : 1

    // Tourne la tête vers la souris
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, x * 0.6 * suivi + tour.current.actuel + p.lacet, p.actif ? 18 : 5, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -y * 0.18 * suivi + p.tangage, p.actif ? 18 : 5, dt)

    // Flotte et se dandine
    const flot = reduit ? 0 : Math.sin(t * 1.4) * 0.14
    corps.current.position.y = flot
    corps.current.rotation.z = reduit ? 0 : Math.sin(t * 0.9) * 0.05
    // Gonfle au survol, s'écrase un peu quand on le tient
    const sx = p.actif ? 1.08 : survol ? 1.06 : 1
    const sy = p.actif ? 0.93 : survol ? 1.06 : 1
    corps.current.scale.x = corps.current.scale.z = THREE.MathUtils.damp(corps.current.scale.x, sx, 8, dt)
    corps.current.scale.y = THREE.MathUtils.damp(corps.current.scale.y, sy, 8, dt)

    // Ombre qui respire avec le flottement
    const o = 1 - flot * 1.2
    ombre.current.scale.set(2.6 * o, 0.7 * o, 1)
    ombre.current.material.opacity = 0.8 - flot

    // Clignement des yeux
    const cycle = t % 4.2
    const ferme = cycle > 4.05 ? 0.12 : 1
    yeux.forEach(({ oeil, base }) => {
      oeil.scale.y = THREE.MathUtils.damp(oeil.scale.y, base * ferme, 30, dt)
    })
  })

  const pirouette = (e) => {
    e.stopPropagation()
    if (prise.current.distance > 6) return // c'était un glisser, pas un clic
    tour.current.cible += Math.PI * 2
  }

  return (
    <group ref={groupe} position={[0, -centreY + 0.05, 0]}>
      <mesh ref={ombre} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texOmbre} transparent depthWrite={false} />
      </mesh>
      <group
        ref={corps}
        onClick={pirouette}
        onPointerOver={() => setSurvol(true)}
        onPointerOut={() => setSurvol(false)}
      >
        <primitive object={scene} />
      </group>
    </group>
  )
}

// Repli si WebGL n'est pas disponible : l'image fixe de Spookie.
class Secours extends Component {
  state = { erreur: false }
  static getDerivedStateFromError() { return { erreur: true } }
  render() { return this.state.erreur ? this.props.repli : this.props.children }
}

// Cliquer-glisser n'importe où sur la scène pour faire tourner Spookie.
function usePrise() {
  const prise = useRef({ actif: false, x: 0, y: 0, distance: 0, lacet: 0, tangage: 0, elan: 0, lache: 0 })
  const [tenu, setTenu] = useState(false)
  const gestes = {
    onPointerDown: (e) => {
      Object.assign(prise.current, { actif: true, x: e.clientX, y: e.clientY, distance: 0, elan: 0 })
      e.currentTarget.setPointerCapture?.(e.pointerId)
      setTenu(true)
    },
    onPointerMove: (e) => {
      const p = prise.current
      if (!p.actif) return
      const dx = e.clientX - p.x
      const dy = e.clientY - p.y
      p.x = e.clientX
      p.y = e.clientY
      p.distance += Math.abs(dx) + Math.abs(dy)
      p.lacet += dx * 0.012
      p.tangage = THREE.MathUtils.clamp(p.tangage + dy * 0.006, -0.6, 0.6)
      p.elan = dx * 0.012
    },
  }
  const lacher = () => {
    if (!prise.current.actif) return
    prise.current.actif = false
    prise.current.lache = performance.now()
    setTenu(false)
  }
  gestes.onPointerUp = lacher
  gestes.onPointerCancel = lacher
  return { prise, tenu, gestes }
}

export default function Spookie3D({ className = '' }) {
  const souris = useSouris()
  const { prise, tenu, gestes } = usePrise()
  const repli = <img src={spookiePng} alt="" className="h-full w-full object-contain object-bottom" />
  return (
    <div
      className={`${className} ${tenu ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ touchAction: 'pan-y' }}
      role="img"
      aria-label="Spookie, le fantôme de la Nuit MMI, en 3D : cliquez-glissez pour le faire tourner"
      {...gestes}
    >
      <Secours repli={repli}>
        <Suspense fallback={repli}>
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0.3, 6.2], fov: 35 }} gl={{ antialias: true, alpha: true }}>
            <ambientLight intensity={1.1} />
            <directionalLight position={[3, 5, 5]} intensity={2.2} />
            <directionalLight position={[-4, 2, -3]} intensity={1.2} color="#F3C137" />
            <pointLight position={[0, 1, 4]} intensity={6} distance={10} color="#ffffff" />
            <Fantome souris={souris} prise={prise} />
          </Canvas>
        </Suspense>
      </Secours>
    </div>
  )
}
