"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

export function Magnetic({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            if (!ref.current) return

            const { clientX, clientY } = e
            const { height, width, left, top } = ref.current.getBoundingClientRect()

            const centerX = left + width / 2
            const centerY = top + height / 2

            const distanceX = clientX - centerX
            const distanceY = clientY - centerY

            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
            const triggerRange = width // The magnetic field is roughly the width of the button

            if (distance < triggerRange) {
                // If within range, pull towards mouse
                // We use a non-linear pull (stronger at center)
                const pullStrength = 0.35
                setPosition({ x: distanceX * pullStrength, y: distanceY * pullStrength })
            } else {
                setPosition({ x: 0, y: 0 })
            }
        }

        window.addEventListener("mousemove", handleMouse)
        return () => window.removeEventListener("mousemove", handleMouse)
    }, [])

    const { x, y } = position

    return (
        <motion.div
            ref={ref}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    )
}
