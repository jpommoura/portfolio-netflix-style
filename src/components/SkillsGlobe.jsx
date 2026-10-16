import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGitAlt,
  FaGithub, FaBootstrap, FaDatabase, FaNpm, FaTerminal, FaCode,
  FaBolt, FaServer, FaFileCode, FaLaptopCode,
} from 'react-icons/fa'
import './SkillsGlobe.css'

/* ── Skills Data ── */
const skills = [
  { name: 'HTML',       icon: FaHtml5,              color: '#e34c26', link: 'https://developer.mozilla.org/docs/Web/HTML' },
  { name: 'CSS',        icon: FaCss3Alt,             color: '#264de4', link: 'https://developer.mozilla.org/docs/Web/CSS' },
  { name: 'JavaScript', icon: FaJsSquare,            color: '#f7df1e', link: 'https://developer.mozilla.org/docs/Web/JavaScript' },
  { name: 'React',      icon: FaReact,               color: '#61dafb', link: 'https://react.dev' },
  { name: 'Node.js',    icon: FaNodeJs,              color: '#68a063', link: 'https://nodejs.org' },
  { name: 'Vite',       icon: FaBolt,                color: '#646cff', link: 'https://vitejs.dev' },
  { name: 'Git',        icon: FaGitAlt,              color: '#f05032', link: 'https://git-scm.com' },
  { name: 'GitHub',     icon: FaGithub,              color: '#ffffff', link: 'https://github.com/jpommoura' },
  { name: 'Bootstrap',  icon: FaBootstrap,           color: '#7952b3', link: 'https://getbootstrap.com' },
  { name: 'Supabase',   icon: FaDatabase,            color: '#3ecf8e', link: 'https://supabase.com' },
  { name: 'JSON Server',icon: FaServer,              color: '#ffffff', link: 'https://github.com/typicode/json-server' },
  { name: 'npm',        icon: FaNpm,                 color: '#cb3837', link: 'https://www.npmjs.com' },
  { name: 'VS Code',    icon: FaLaptopCode,          color: '#007acc', link: 'https://code.visualstudio.com' },
  { name: 'Terminal',   icon: FaTerminal,            color: '#4caf50', link: '#' },
  { name: 'Express',    icon: FaCode,                color: '#ffffff', link: 'https://expressjs.com' },
  { name: 'SQL',        icon: FaFileCode,            color: '#00758f', link: '#' },
]

/* ── Fibonacci Sphere ── */
function fibonacciSphere(n, radius) {
  const golden = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / n
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    return new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius)
  })
}

const ICON_PX = 40
const RADIUS = 3.3
const DRAG_THRESHOLD = 6
const ACCENT = '#e50914'

const _world = new THREE.Vector3()
const _dir = new THREE.Vector3()
const _camDir = new THREE.Vector3()
const _ndc = new THREE.Vector3()
const _view = new THREE.Vector3()

function Globe({ count, radius, items, motion, pose }) {
  const group = useRef(null)
  const points = useMemo(() => fibonacciSphere(count, radius), [count, radius])
  const shell = radius * 0.85
  const iconWorld = THREE.MathUtils.clamp((radius * 0.8) / Math.sqrt(count), 0.32, 0.6)

  useLayoutEffect(() => {
    if (group.current) group.current.rotation.y = pose.current.rotationY
  }, [pose])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const { camera } = state
    const { width, height } = state.size

    if (motion) g.rotation.y += delta * 0.06
    pose.current.rotationY = g.rotation.y
    ;(pose.current.camera ??= new THREE.Vector3()).copy(camera.position)
    g.updateWorldMatrix(true, false)
    camera.updateMatrixWorld()
    _camDir.copy(camera.position).normalize()
    const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)

    points.forEach((p, i) => {
      const el = items.current[i]
      if (!el) return
      _world.copy(p).applyMatrix4(g.matrixWorld)
      const t = THREE.MathUtils.clamp((_dir.copy(_world).normalize().dot(_camDir) - 0.1) * 2, 0, 1)
      _ndc.copy(_world).project(camera)
      const x = (_ndc.x + 1) * 0.5 * width
      const y = (1 - _ndc.y) * 0.5 * height
      const depth = -_view.copy(_world).applyMatrix4(camera.matrixWorldInverse).z
      const pxPerUnit = height / (2 * tanHalfFov * depth)
      const scale = ((iconWorld * pxPerUnit) / ICON_PX) * (0.8 + 0.4 * t)

      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`
      el.style.opacity = String(t)
      el.style.zIndex = String(Math.round(t * 100))
      el.style.pointerEvents = t > 0.8 ? 'auto' : 'none'
      el.style.visibility = t < 0.02 ? 'hidden' : 'visible'
    })
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[shell, 2]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.1} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[shell, 2]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[shell * 0.98, 32, 32]} />
        <meshBasicMaterial color="#000" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[shell * 1.035, 32, 32]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.06} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

function FitCamera({ radius, pose }) {
  const camera = useThree((s) => s.camera)
  const aspect = useThree((s) => s.size.width / s.size.height)

  useLayoutEffect(() => {
    if (pose.current.camera) camera.position.copy(pose.current.camera)
    const vFov = THREE.MathUtils.degToRad(camera.fov)
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect)
    camera.position.setLength(radius / Math.sin(Math.min(vFov, hFov) / 2))
  }, [camera, aspect, radius, pose])

  return null
}

export default function SkillsGlobe() {
  const container = useRef(null)
  const items = useRef([])
  const dragStart = useRef(null)
  const [visible, setVisible] = useState(true)
  const [mounted, setMounted] = useState(true)
  const pose = useRef({ rotationY: 0, camera: null })
  const motion = useRef(!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches).current

  useEffect(() => {
    const el = container.current
    if (!el || !('IntersectionObserver' in window)) return
    let timer
    const io = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(timer)
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setMounted(true)
        else timer = setTimeout(() => setMounted(false), 1500)
      },
      { rootMargin: '200px 0px' }
    )
    io.observe(el)
    return () => { clearTimeout(timer); io.disconnect() }
  }, [])

  const onPointerDown = (e) => { dragStart.current = { x: e.clientX, y: e.clientY } }
  const onClickCapture = (e) => {
    const start = dragStart.current
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > DRAG_THRESHOLD) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <section className="skills-globe-section" id="skills">
      <h2 className="section-title">Skills</h2>
      <p className="skills-globe-subtitle">Arraste para girar o globo</p>
      <div className="skills-globe">
        <div
          ref={container}
          className="skills-globe__stage"
          onPointerDown={onPointerDown}
          onClickCapture={onClickCapture}
        >
          {mounted && (
            <Canvas
              eventSource={container}
              frameloop={visible ? 'always' : 'never'}
              camera={{ position: [0, 0, 9], fov: 50 }}
              dpr={[1, 1.5]}
              gl={{ alpha: true, antialias: true }}
            >
              <fog attach="fog" args={['#141414', 10, 25]} />
              <FitCamera radius={RADIUS * 1.2} pose={pose} />
              <Float speed={motion ? 1 : 0} rotationIntensity={motion ? 0.2 : 0} floatIntensity={motion ? 0.2 : 0}>
                <Globe count={skills.length} radius={RADIUS} items={items} motion={motion} pose={pose} />
              </Float>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={motion}
                autoRotateSpeed={0.8}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
              />
            </Canvas>
          )}

          <ul className="skills-globe__layer">
            {skills.map((skill, i) => {
              const Icon = skill.icon
              return (
                <li key={skill.name} className="skills-globe__li">
                  <a
                    ref={(el) => { items.current[i] = el }}
                    className="skills-globe__item"
                    style={{ '--skill': skill.color }}
                    href={skill.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    draggable={false}
                    aria-label={skill.name}
                  >
                    <Icon className="skills-globe__icon" aria-hidden="true" />
                    <span className="skills-globe__label">{skill.name}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
