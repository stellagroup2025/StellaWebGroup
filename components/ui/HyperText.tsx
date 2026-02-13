"use client"

import { useEffect, useState, useRef } from "react"

const CHARS = "ABCDEFGHIJKLNO PQRSTUVXYZabcdefghijklmnopqrstu vxyz0123456789"

interface HyperTextProps {
    text: string
    className?: string
    delay?: number
}

export function HyperText({ text, className = "", delay = 0 }: HyperTextProps) {
    const [display, setDisplay] = useState(" ") // Start empty
    const [complete, setComplete] = useState(false)

    const iterationRef = useRef(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const startScramble = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        iterationRef.current = 0
        setComplete(false)

        intervalRef.current = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iterationRef.current) {
                            return text[index]
                        }
                        if (letter === " ") return " "
                        return CHARS[Math.floor(Math.random() * CHARS.length)]
                    })
                    .join("")
            )

            if (iterationRef.current >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current)
                setComplete(true)
            }

            iterationRef.current += 1 / 3
        }, 30)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            startScramble()
        }, delay)

        return () => {
            clearTimeout(timer)
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [text, delay])

    const handleMouseEnter = () => {
        if (complete) startScramble()
    }

    return (
        <div
            className={`relative inline-block overflow-hidden ${className}`}
            onMouseEnter={handleMouseEnter}
        >
            {/* 1. THE ANCHOR (Invisible) - Holds the exact space */}
            <span className="opacity-0 pointer-events-none select-none">
                {text}
            </span>

            {/* 2. THE HOLOGRAM (Animated) - Overlays the anchor */}
            <span className="absolute top-0 left-0 w-full h-full">
                {display}
            </span>
        </div>
    )
}
