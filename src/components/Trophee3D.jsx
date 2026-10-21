import { Component, Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import modele from '../assets/photos/Trophée.glb'

// Reflets pour les matières métal / or (sans environnement, l'or paraît noir).
function Environnement() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    return () => { scene.environment = null; env.dispose(); pmrem.dispose() }
  }, [gl, scene])
  return null
}

function Trophee() {
  const gltf = useLoader(GLTFLoader, modele)
  const pivot = useRef()

  // Centre le modèle et le met à l'échelle pour qu'il tienne dans le cadre.
  const { scene, echelle } = useMemo(() => {
    const s = gltf.scene.clone(true)
    // « Procedural Gold » est un matériau procédural Blender : il n'est pas exporté dans le .glb
    // (il arrive blanc). On le remplace par un or métallique.
    const or = new THREE.MeshStandardMaterial({ color: '#E2A93B', metalness: 1, roughness: 0.28 })
    s.traverse((o) => {
      if (o.isMesh && o.material?.name === 'Procedural Gold') o.material = or
    })
    const boite = new THREE.Box3().setFromObject(s)
    const centre = boite.getCenter(new THREE.Vector3())
    const taille = boite.getSize(new THREE.Vector3())
    s.position.sub(centre)
    return { scene: s, echelle: 3.2 / Math.max(taille.x, taille.y, taille.z) }
  }, [gltf])

  useFrame(({ clock }, dt) => {
    pivot.current.rotation.y += dt * 0.5
    pivot.current.position.y = Math.sin(clock.getElapsedTime() * 1.1) * 0.08
  })

  return (
    <group ref={pivot} scale={echelle}>
      <primitive object={scene} />
    </group>
  )
}

class Secours extends Component {
  state = { erreur: false }
  static getDerivedStateFromError() { return { erreur: true } }
  render() { return this.state.erreur ? null : this.props.children }
}

export default function Trophee3D({ className = '' }) {
  return (
    <div className={className}>
      <Secours>
        <Suspense fallback={null}>
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.4, 6], fov: 35 }} gl={{ antialias: true, alpha: true }}>
            <Environnement />
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 5, 4]} intensity={2.5} />
            <directionalLight position={[-4, 2, -2]} intensity={1.5} color="#F3C137" />
            <Trophee />
          </Canvas>
        </Suspense>
      </Secours>
    </div>
  )
}
