"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function Cursor() {
    const [isVisible, setIsVisible] = useState(false)
    const [isLink, setIsLink] = useState(false)

    // We split the cursor into two parts:
    // 1. The Dot (follows mouse instantly)
    // 2. The Ring (follows with physics)

    const mouseX = useMotionValue(-100)
    const mouseY = useMotionValue(-100)

    // Smooth spring physics for the outer ring
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
    const ringX = useSpring(mouseX, springConfig)
    const ringY = useSpring(mouseY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)

            if (!isVisible) setIsVisible(true)
        }

        const handleMouseEnter = () => setIsVisible(true)
        const handleMouseLeave = () => setIsVisible(false)

        // Check if hovering a clickable element
        const checkHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName.toLowerCase() === 'a' ||
                target.closest('a') !== null ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('button') !== null;

            setIsLink(isClickable)
        }

        window.addEventListener("mousemove", moveCursor)
        window.addEventListener("mouseenter", handleMouseEnter)
        window.addEventListener("mouseleave", handleMouseLeave)
        window.addEventListener("mouseover", checkHover)

        // Hide default cursor logic is handled in global css or layout

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            window.removeEventListener("mouseenter", handleMouseEnter)
            window.removeEventListener("mouseleave", handleMouseLeave)
            window.removeEventListener("mouseover", checkHover)
        }
    }, [mouseX, mouseY, isVisible])

    return (
        <>
            {/* 1. Main Dot (Instant & Sharp) */}
            {/* High contrast: Black dot with thin white border ensures visibility on ALL backgrounds */}
            <motion.div
                className="fixed top-0 left-0 w-2.5 h-2.5 bg-black border-[0.5px] border-white rounded-full pointer-events-none z-[9999] hidden md:block"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    opacity: isVisible && !isLink ? 1 : 0,
                    scale: isVisible && !isLink ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
            />

            {/* 2. Trailing Ring (Smooth) */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border border-black/20 hidden md:block"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    opacity: isVisible && !isLink ? 1 : 0,
                    scale: isVisible && !isLink ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
            />
        </>
    )
}
