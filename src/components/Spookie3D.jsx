import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Secours3D from './Secours3D.jsx'
import modele from '../assets/photos/Spookie.glb'
import spookieImage from '../assets/photos/spookie.webp'

// Rapproche doucement `actuel` de `cible` à chaque image (plus `vitesse` est grand, plus c'est rapide).
const lisser = (actuel, cible, vitesse, dt) => THREE.MathUtils.damp(actuel, cible, vitesse, dt)
const UN_TOUR = Math.PI * 2

// Ombre ronde et floue dessinée dans un petit canvas 2D.
function creerTextureOmbre() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 128
  const ctx = canvas.getContext('2d')
  const degrade = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  degrade.addColorStop(0, 'rgba(21,17,71,0.45)')
  degrade.addColorStop(1, 'rgba(21,17,71,0)')
  ctx.fillStyle = degrade
  ctx.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(canvas)
}

// souris : position de la souris dans la fenêtre (de -1 à 1)
// prise  : état du cliquer-glisser { actif, angle, distance }
function Fantome({ souris, prise }) {
  const gltf = useLoader(GLTFLoader, modele)
  const groupe = useRef() // tourne vers la souris
  const corps = useRef() // flotte et se dandine
  const ombre = useRef()
  const pirouette = useRef({ cible: 0, actuel: 0 })
  const [survol, setSurvol] = useState(false)
  const animationsReduites = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])
  const textureOmbre = useMemo(creerTextureOmbre, [])

  // On récupère les yeux du modèle (Oeil_D / Oeil_G) pour les faire cligner,
  // et la hauteur du fantôme pour le centrer.
  const { scene, yeux, centreY } = useMemo(() => {
    const scene = gltf.scene.clone(true)
    const boite = new THREE.Box3().setFromObject(scene)
    const yeux = [scene.getObjectByName('Oeil_D'), scene.getObjectByName('Oeil_G')].filter(Boolean)
    yeux.forEach((oeil) => { oeil.userData.hauteur = oeil.scale.y }) // hauteur d'origine de l'œil ouvert
    return { scene, yeux, centreY: (boite.max.y + boite.min.y) / 2 }
  }, [gltf])

  // Appelé à chaque image (~60 fois par seconde). dt = temps écoulé depuis l'image précédente.
  useFrame(({ clock }, dt) => {
    const temps = clock.getElapsedTime()
    const p = prise.current

    // 1. Rotation : suit la souris, sauf pendant qu'on le fait tourner à la main.
    //    Une fois lâché, il revient face à nous (au tour complet le plus proche).
    if (!p.actif) p.angle = lisser(p.angle, Math.round(p.angle / UN_TOUR) * UN_TOUR, 2.5, dt)
    pirouette.current.actuel = lisser(pirouette.current.actuel, pirouette.current.cible, 4, dt)
    const suitLaSouris = p.actif ? 0 : 1
    groupe.current.rotation.y = lisser(groupe.current.rotation.y, souris.current.x * 0.6 * suitLaSouris + p.angle + pirouette.current.actuel, p.actif ? 18 : 5, dt)
    groupe.current.rotation.x = lisser(groupe.current.rotation.x, -souris.current.y * 0.18 * suitLaSouris, 5, dt)

    // 2. Flotte de haut en bas et se dandine.
    const flottement = animationsReduites ? 0 : Math.sin(temps * 1.4) * 0.14
    corps.current.position.y = flottement
    corps.current.rotation.z = animationsReduites ? 0 : Math.sin(temps * 0.9) * 0.05

    // 3. Gonfle au survol, s'écrase un peu quand on le tient.
    const largeur = p.actif ? 1.08 : survol ? 1.06 : 1
    const hauteur = p.actif ? 0.93 : survol ? 1.06 : 1
    corps.current.scale.x = corps.current.scale.z = lisser(corps.current.scale.x, largeur, 8, dt)
    corps.current.scale.y = lisser(corps.current.scale.y, hauteur, 8, dt)

    // 4. L'ombre rétrécit quand il monte.
    const tailleOmbre = 1 - flottement * 1.2
    ombre.current.scale.set(2.6 * tailleOmbre, 0.7 * tailleOmbre, 1)

    // 5. Clignement des yeux toutes les 4,2 secondes.
    const yeuxFermes = temps % 4.2 > 4.05
    yeux.forEach((oeil) => {
      const hauteurVoulue = oeil.userData.hauteur * (yeuxFermes ? 0.12 : 1)
      oeil.scale.y = lisser(oeil.scale.y, hauteurVoulue, 30, dt)
    })
  })

  const faireUnePirouette = (e) => {
    e.stopPropagation()
    if (prise.current.distance > 6) return // la souris a bougé : c'était un glisser, pas un clic
    pirouette.current.cible += UN_TOUR
  }

  return (
    <group ref={groupe} position={[0, -centreY + 0.05, 0]}>
      <mesh ref={ombre} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={textureOmbre} transparent depthWrite={false} />
      </mesh>
      <group ref={corps} onClick={faireUnePirouette} onPointerOver={() => setSurvol(true)} onPointerOut={() => setSurvol(false)}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

export default function Spookie3D({ className = '' }) {
  const souris = useRef({ x: 0, y: 0 })
  const prise = useRef({ actif: false, angle: 0, distance: 0, dernierX: 0 })
  const [tenu, setTenu] = useState(false)

  // Position de la souris sur toute la fenêtre, ramenée entre -1 et 1.
  useEffect(() => {
    const suivre = (e) => {
      souris.current.x = (e.clientX / window.innerWidth) * 2 - 1
      souris.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', suivre)
    return () => window.removeEventListener('pointermove', suivre)
  }, [])

  // Cliquer-glisser pour le faire tourner.
  const attraper = (e) => {
    prise.current = { ...prise.current, actif: true, distance: 0, dernierX: e.clientX }
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setTenu(true)
  }
  const glisser = (e) => {
    const p = prise.current
    if (!p.actif) return
    const dx = e.clientX - p.dernierX
    p.dernierX = e.clientX
    p.distance += Math.abs(dx)
    p.angle += dx * 0.012
  }
  const lacher = () => {
    prise.current.actif = false
    setTenu(false)
  }

  const image = <img src={spookieImage} alt="" className="h-full w-full object-contain object-bottom" />

  return (
    <div
      className={`${className} ${tenu ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ touchAction: 'pan-y' }}
      role="img"
      aria-label="Spookie, le fantôme de la Nuit MMI, en 3D : cliquez-glissez pour le faire tourner"
      onPointerDown={attraper}
      onPointerMove={glisser}
      onPointerUp={lacher}
      onPointerCancel={lacher}
    >
      {/* Tant que le modèle charge (ou si la 3D ne marche pas), on montre l'image fixe */}
      <Secours3D repli={image}>
        <Suspense fallback={image}>
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0.3, 6.2], fov: 35 }} gl={{ alpha: true }}>
            <ambientLight intensity={1.1} />
            <directionalLight position={[3, 5, 5]} intensity={2.2} />
            <directionalLight position={[-4, 2, -3]} intensity={1.2} color="#F3C137" />
            <pointLight position={[0, 1, 4]} intensity={6} distance={10} />
            <Fantome souris={souris} prise={prise} />
          </Canvas>
        </Suspense>
      </Secours3D>
    </div>
  )
}
