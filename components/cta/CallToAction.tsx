"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "../ui/button"
import { Heading } from "../ui/Heading"
import { Magnetic } from "../animations/Magnetic"
import { ArrowRight, MessageSquare } from "lucide-react"

function WhiteParticles() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return
        const container = containerRef.current
        const rect = container.getBoundingClientRect()

        const POINT_COUNT = 6000
        const GRID_SIZE = 3000
        const INTERACTION_RADIUS = 400
        const BASE_SIZE = 2.5

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(60, rect.width / rect.height, 1, 5000)
        camera.position.set(0, 0, 1200)
        camera.lookAt(0, 0, 0)

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
        renderer.setSize(rect.width, rect.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.domElement.style.position = 'absolute'
        renderer.domElement.style.inset = '0'
        container.appendChild(renderer.domElement)

        const geometry = new THREE.BufferGeometry()
        const bgPositions: number[] = []
        const positions: number[] = []
        const scales: number[] = []

        const rowCols = Math.sqrt(POINT_COUNT)
        const spacing = GRID_SIZE / rowCols
        const offset = GRID_SIZE / 2

        for (let x = 0; x < GRID_SIZE; x += spacing) {
            for (let y = 0; y < GRID_SIZE; y += spacing) {
                const px = x - offset
                const py = y - offset
                const rx = (Math.random() - 0.5) * 15
                const ry = (Math.random() - 0.5) * 15
                positions.push(px + rx, py + ry, 0)
                bgPositions.push(px + rx, py + ry, 0)
                scales.push(1.0)
            }
        }

        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
        geometry.setAttribute("scale", new THREE.Float32BufferAttribute(scales, 1))

        const material = new THREE.ShaderMaterial({
            uniforms: {
                baseSize: { value: BASE_SIZE },
                opacity: { value: 0.35 },
                uTime: { value: 0 },
            },
            vertexShader: `
                attribute float scale;
                uniform float baseSize;
                uniform float uTime;
                varying float vHeight;
                void main() {
                    vec3 p = position;
                    float noise = sin(p.x * 0.001 + uTime * 0.5) * cos(p.y * 0.001 + uTime * 0.3) * 40.0;
                    p.z += noise;
                    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
                    vHeight = p.z;
                    gl_PointSize = baseSize * scale * (800.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform float opacity;
                varying float vHeight;
                void main() {
                    vec2 coord = gl_PointCoord - vec2(0.5);
                    if (length(coord) > 0.5) discard;
                    float d = length(coord);
                    float mixRatio = smoothstep(-50.0, 200.0, vHeight);
                    float edgeSoftness = mix(0.45, 0.2, mixRatio);
                    float alpha = 1.0 - smoothstep(edgeSoftness, 0.5, d);
                    float alphaBoost = 1.0 + (mixRatio * 0.5);
                    gl_FragColor = vec4(1.0, 1.0, 1.0, opacity * alpha * alphaBoost);
                }
            `,
            transparent: true,
        })

        const particles = new THREE.Points(geometry, material)
        scene.add(particles)

        const mouse = new THREE.Vector2(0, 0)
        const raycaster = new THREE.Raycaster()
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
        const smoothMouse = new THREE.Vector3(0, 0, 0)
        const velocity = new THREE.Vector3(0, 0, 0)
        let time = 0
        let globalAlpha = 1.0
        let idleCounter = 0

        function getBreathingScale(t: number) {
            const phase = (t % 10.0) / 10.0
            let s = 1.0
            if (phase < 0.2) s = THREE.MathUtils.lerp(1.0, 1.15, phase / 0.2)
            else if (phase < 0.35) s = THREE.MathUtils.lerp(1.15, 1.08, (phase - 0.2) / 0.15)
            else if (phase < 0.55) s = THREE.MathUtils.lerp(1.08, 1.25, (phase - 0.35) / 0.2)
            else if (phase < 0.70) s = THREE.MathUtils.lerp(1.25, 1.08, (phase - 0.55) / 0.15)
            else if (phase < 0.85) s = THREE.MathUtils.lerp(1.08, 1.45, (phase - 0.70) / 0.15)
            else s = THREE.MathUtils.lerp(1.45, 1.0, (phase - 0.85) / 0.15)
            return s
        }

        function updatePoints() {
            const pos = geometry.attributes.position.array as Float32Array
            const sc = geometry.attributes.scale.array as Float32Array
            const jellyAxis = velocity.clone().normalize()
            const speed = velocity.length()
            const centerBreath = getBreathingScale(time)

            for (let i = 0; i < pos.length; i += 3) {
                const idx = i / 3
                const bx = bgPositions[i], by = bgPositions[i + 1], bz = bgPositions[i + 2]
                const bdx = bx - smoothMouse.x, bdy = by - smoothMouse.y
                const bDist = Math.sqrt(bdx * bdx + bdy * bdy)
                const bAngle = Math.atan2(bdy, bdx)
                const localTime = time - bDist * 0.005 + Math.sin(bAngle) * 0.5
                const breath = getBreathingScale(localTime)
                const ox = bx * breath, oy = by * breath
                const dx = ox - smoothMouse.x, dy = oy - smoothMouse.y
                const dist = Math.sqrt(dx * dx + dy * dy)

                let px = ox, py = oy, pz = bz, s = 0
                const angle = Math.atan2(dy, dx)
                const noise = Math.sin(angle * 3.0 + time * 0.5) * Math.cos(angle * 7.0 - time * 0.3)
                const effectiveRadius = (INTERACTION_RADIUS * centerBreath) * (1.0 + noise * 0.05)

                if (dist < effectiveRadius) {
                    const nDist = dist / effectiveRadius
                    const influence = 1 - nDist
                    if (nDist < 0.05) s = 0.0
                    else if (nDist < 0.75) s = 0.1 + ((nDist - 0.05) / 0.7) * 1.7
                    else s = 1.8 * (1.0 - (nDist - 0.75) / 0.25)

                    pz += Math.sin(Math.sqrt(influence) * Math.PI) * 150

                    const dirX = dx / dist, dirY = dy / dist
                    if (speed > 0.1) {
                        const alignment = dirX * jellyAxis.x + dirY * jellyAxis.y
                        const cs = Math.min(speed, 1.5)
                        px += jellyAxis.x * alignment * cs * 12 * influence * influence
                        py += jellyAxis.y * alignment * cs * 12 * influence * influence
                        const swirl = cs * 15.0 * influence * influence * influence
                        const spin = (i % 2 === 0) ? 1 : -1
                        px += -dirY * swirl * spin
                        py += dirX * swirl * spin
                    }
                    pz += Math.sin(dist * 0.05 - time * 5) * 10 * influence * influence
                } else {
                    pz = -100000
                    s = 0
                }

                pos[i] = px; pos[i + 1] = py; pos[i + 2] = pz
                sc[idx] = s
            }
            geometry.attributes.position.needsUpdate = true
            geometry.attributes.scale.needsUpdate = true
        }

        let animId: number
        function animate() {
            animId = requestAnimationFrame(animate)
            time += 0.02
            material.uniforms.uTime.value = time

            raycaster.setFromCamera(mouse, camera)
            const target = new THREE.Vector3()
            raycaster.ray.intersectPlane(plane, target)

            if (target) {
                const oldPos = smoothMouse.clone()
                smoothMouse.lerp(target, 0.1)
                velocity.subVectors(smoothMouse, oldPos)
                if (velocity.length() > 0.5) { idleCounter = 0; globalAlpha = Math.min(1, globalAlpha + 0.1) }
                else idleCounter++
            }
            if (idleCounter > 60) globalAlpha = Math.max(0, globalAlpha - 0.02)
            material.uniforms.opacity.value = 0.35 * globalAlpha
            if (globalAlpha > 0.01) updatePoints()
            renderer.render(scene, camera)
        }
        animate()

        const handleResize = () => {
            const r = container.getBoundingClientRect()
            camera.aspect = r.width / r.height
            camera.updateProjectionMatrix()
            renderer.setSize(r.width, r.height)
        }

        const handleMouseMove = (e: MouseEvent) => {
            const r = container.getBoundingClientRect()
            mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1
            mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1
        }

        const ro = new ResizeObserver(handleResize)
        ro.observe(container)
        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            ro.disconnect()
            cancelAnimationFrame(animId)
            if (container && renderer.domElement) container.removeChild(renderer.domElement)
            geometry.dispose()
            material.dispose()
            renderer.dispose()
        }
    }, [])

    return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
}

export function CallToAction() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Parallax for the content against the background
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [-50, 50])

    return (
        <section className="py-8 px-4 md:px-8">
            <div
                ref={containerRef}
                className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-[2.5rem] bg-zinc-950/80 dark:bg-black/80 backdrop-blur-2xl shadow-[0_8px_64px_rgba(0,0,0,0.15)]"
            >
                {/* Glass light reflections */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-white/[0.08] via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none translate-x-[-20%]" />

                {/* White particles - same animation as background but in white */}
                <WhiteParticles />

                {/* Subtle gradient glow */}
                <div className="absolute inset-0 opacity-30">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand blur-[120px] opacity-40"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500 blur-[120px] opacity-30"
                    />
                </div>

                {/* --- Content --- */}
                <div className="relative z-10 p-10 md:p-16 flex flex-col items-center text-center">

                    <motion.div
                        style={{ y }}
                        className="flex flex-col items-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl text-white/80 mb-8 overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.1)]"
                        >
                            <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none" />
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none translate-x-[-20%]" />
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium tracking-wide">Disponible para nuevos proyectos</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <Heading level={2} className="text-4xl md:text-6xl lg:text-7xl !font-bold text-white mb-6 tracking-tight">
                                ¿Listo para despegar?
                            </Heading>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed"
                        >
                            Transformamos ideas complejas en productos digitales que tus usuarios amarán. Hablemos de tu visión.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-12 items-center w-full sm:w-auto"
                        >
                            <Magnetic>
                                <Button
                                    size="lg"
                                    className="relative !bg-white/80 backdrop-blur-xl !text-zinc-900 hover:!bg-white/90 h-14 px-8 rounded-full text-base font-semibold overflow-hidden shadow-[0_4px_24px_rgba(255,255,255,0.2)]"
                                    asChild
                                >
                                    <a href="/contacto" className="flex items-center gap-2">
                                        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/90 via-transparent to-transparent pointer-events-none" />
                                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none translate-x-[-20%]" />
                                        <MessageSquare className="relative w-5 h-5 text-zinc-900" />
                                        <span className="relative text-zinc-900">Empezar ahora</span>
                                    </a>
                                </Button>
                            </Magnetic>

                            <Magnetic>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="relative !bg-white/10 backdrop-blur-xl border-0 !text-white hover:!bg-white/15 h-14 px-8 rounded-full text-base overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
                                    asChild
                                >
                                    <a href="/proyectos" className="flex items-center gap-2">
                                        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none" />
                                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none translate-x-[-20%]" />
                                        <span className="relative">Ver nuestro trabajo</span>
                                        <ArrowRight className="relative w-5 h-5" />
                                    </a>
                                </Button>
                            </Magnetic>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
