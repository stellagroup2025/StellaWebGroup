"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function HeroAnimation() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current

        // --- Configuration ---
        const CONFIG = {
            pointCount: 36000,
            gridSize: 5000,
            color: 0x1a56db, // Brand Color
            baseSize: 3.5,
            interactionRadius: 500,
            jellyStrength: 0.15,
        }

        // --- Setup ---
        const scene = new THREE.Scene()

        // Camera
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000)
        camera.position.set(0, 0, 1200)
        camera.lookAt(0, 0, 0)

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        // Force style on canvas
        renderer.domElement.style.position = 'absolute'
        renderer.domElement.style.top = '0'
        renderer.domElement.style.left = '0'
        renderer.domElement.style.zIndex = '-1'
        container.appendChild(renderer.domElement)

        // --- Particles ---
        const geometry = new THREE.BufferGeometry()
        const bgPositions: number[] = []
        const positions: number[] = []
        const scales: number[] = []

        const rowCols = Math.sqrt(CONFIG.pointCount)
        const spacing = CONFIG.gridSize / rowCols
        const offset = CONFIG.gridSize / 2

        for (let x = 0; x < CONFIG.gridSize; x += spacing) {
            for (let y = 0; y < CONFIG.gridSize; y += spacing) {
                const px = x - offset
                const py = y - offset
                const pz = 0

                const rx = (Math.random() - 0.5) * 15
                const ry = (Math.random() - 0.5) * 15

                positions.push(px + rx, py + ry, pz)
                bgPositions.push(px + rx, py + ry, pz)
                scales.push(1.0)
            }
        }

        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
        geometry.setAttribute("scale", new THREE.Float32BufferAttribute(scales, 1))

        // Shader Material
        const vertexShader = `
        attribute float scale;
        uniform float baseSize;
        varying float vHeight;
        
        void main() {
            vec3 p = position;
            vec4 mvPosition = modelViewMatrix * vec4( p, 1.0 );
            vHeight = max(0.0, p.z); 
            gl_PointSize = baseSize * scale * ( 800.0 / -mvPosition.z );
            gl_Position = projectionMatrix * mvPosition;
        }
    `

        const fragmentShader = `
        uniform vec3 color;
        uniform float opacity;
        
        void main() {
            vec2 coord = gl_PointCoord - vec2(0.5);
            if(length(coord) > 0.5) discard;
            float d = length(coord);
            float alpha = 1.0 - smoothstep(0.4, 0.5, d);
            gl_FragColor = vec4( color, opacity * alpha );
        }
    `

        const material = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(CONFIG.color) },
                baseSize: { value: CONFIG.baseSize },
                opacity: { value: 0.8 },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
        })

        const particles = new THREE.Points(geometry, material)
        scene.add(particles)

        // --- Interaction ---
        const mouse = new THREE.Vector2(0, 0)
        const raycaster = new THREE.Raycaster()
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)

        const smoothMouse = new THREE.Vector3(0, 0, 0)
        const velocity = new THREE.Vector3(0, 0, 0)
        let time = 0
        let globalAlpha = 1.0
        let idleCounter = 0
        let scrollFactor = 1.0

        // Helper functions
        function getBreathingScale(t: number) {
            const duration = 10.0
            const phase = (t % duration) / duration
            let s = 1.0

            if (phase < 0.2) {
                s = THREE.MathUtils.lerp(1.0, 1.15, phase / 0.2)
            } else if (phase < 0.35) {
                s = THREE.MathUtils.lerp(1.15, 1.08, (phase - 0.2) / 0.15)
            } else if (phase < 0.55) {
                s = THREE.MathUtils.lerp(1.08, 1.25, (phase - 0.35) / 0.2)
            } else if (phase < 0.70) {
                s = THREE.MathUtils.lerp(1.25, 1.08, (phase - 0.55) / 0.15)
            } else if (phase < 0.85) {
                s = THREE.MathUtils.lerp(1.08, 1.45, (phase - 0.70) / 0.15)
            } else {
                s = THREE.MathUtils.lerp(1.45, 1.0, (phase - 0.85) / 0.15)
            }
            return s
        }

        function updatePoints() {
            const positions = geometry.attributes.position.array as Float32Array
            const scales = geometry.attributes.scale.array as Float32Array
            const jellyAxis = velocity.clone().normalize()
            const speed = velocity.length()
            const centerBreath = getBreathingScale(time)

            for (let i = 0; i < positions.length; i += 3) {
                const index = i / 3
                const bx = bgPositions[i]
                const by = bgPositions[i + 1]
                const bz = bgPositions[i + 2]

                const bdx = bx - smoothMouse.x
                const bdy = by - smoothMouse.y
                const bDist = Math.sqrt(bdx * bdx + bdy * bdy)
                const bAngle = Math.atan2(bdy, bdx)

                const distDelay = bDist * 0.005
                const anglePhase = Math.sin(bAngle * 1.0) * 0.5
                const localTime = time - distDelay + anglePhase
                const breath = getBreathingScale(localTime)

                const ox = bx * breath
                const oy = by * breath

                const dx = ox - smoothMouse.x
                const dy = oy - smoothMouse.y
                const dist = Math.sqrt(dx * dx + dy * dy)

                let px = ox
                let py = oy
                let pz = bz
                let s = 0

                const angle = Math.atan2(dy, dx)
                const noise = Math.sin(angle * 3.0 + time * 0.5) * Math.cos(angle * 7.0 - time * 0.3)
                const radiusVar = 1.0 + (noise * 0.05)
                const effectiveRadius = (CONFIG.interactionRadius * centerBreath) * radiusVar

                if (dist < effectiveRadius) {
                    const nDist = dist / effectiveRadius
                    const influence = 1 - nDist
                    const peak = 0.75
                    const hole = 0.05

                    if (nDist < hole) {
                        s = 0.0
                    } else if (nDist < peak) {
                        const t = (nDist - hole) / (peak - hole)
                        s = 0.1 + (t * 1.7)
                    } else {
                        const t = (nDist - peak) / (1.0 - peak)
                        s = 1.8 * (1.0 - t)
                    }

                    const bulge = Math.sin(Math.sqrt(influence) * Math.PI) * 150
                    pz += bulge

                    const dirX = dx / dist
                    const dirY = dy / dist

                    if (speed > 0.1) {
                        const alignment = dirX * jellyAxis.x + dirY * jellyAxis.y
                        const clampedSpeed = Math.min(speed, 1.5)
                        const deform = alignment * clampedSpeed * 12 * Math.pow(influence, 2)
                        px += jellyAxis.x * deform
                        py += jellyAxis.y * deform
                    }

                    const ripple = Math.sin(dist * 0.05 - time * 5) * 10 * Math.pow(influence, 2)
                    pz += ripple
                } else {
                    pz = -100000
                    s = 0
                }

                positions[i] = px
                positions[i + 1] = py
                positions[i + 2] = pz
                scales[index] = s
            }

            geometry.attributes.position.needsUpdate = true
            geometry.attributes.scale.needsUpdate = true
        }

        // Animation Loop
        let animationId: number
        function animate() {
            animationId = requestAnimationFrame(animate)
            time += 0.02

            raycaster.setFromCamera(mouse, camera)
            const target = new THREE.Vector3()
            raycaster.ray.intersectPlane(plane, target)

            if (target) {
                const oldPos = smoothMouse.clone()
                smoothMouse.lerp(target, 0.1)
                velocity.subVectors(smoothMouse, oldPos)

                if (velocity.length() > 0.5) {
                    idleCounter = 0
                    globalAlpha = Math.min(1, globalAlpha + 0.1)
                } else {
                    idleCounter++
                }
            }

            if (idleCounter > 60) globalAlpha = Math.max(0, globalAlpha - 0.02)

            // Apply both globalAlpha (idle fade) and scrollFactor (scroll fade)
            material.uniforms.opacity.value = 0.8 * globalAlpha * scrollFactor

            if (globalAlpha > 0.01 && scrollFactor > 0.01) updatePoints()

            renderer.render(scene, camera)
        }

        animate()

        // Events
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
        }

        const handleScroll = () => {
            // Fade particles but keep them visible (increased floor to 0.4 based on feedback)
            scrollFactor = Math.max(0.4, 1 - (window.scrollY / (window.innerHeight * 0.8)))
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("scroll", handleScroll)
            cancelAnimationFrame(animationId)

            // Cleanup Three.js
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement)
            }
            geometry.dispose()
            material.dispose()
            renderer.dispose()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none"
            style={{
                background: 'transparent',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -50 // NUCLEAR OPTION
            }}
        />
    )
}
