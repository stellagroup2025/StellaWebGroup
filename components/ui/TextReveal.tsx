"use client"

import { motion } from "framer-motion"

interface TextRevealProps {
    text: string
    className?: string
    delay?: number
    gradient?: boolean
}

export function TextReveal({ text, className = "", delay = 0, gradient = false }: TextRevealProps) {
    return (
        <motion.span
            className={`inline-block relative ${className} ${gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand to-slate-400 animate-shimmer bg-[length:200%_100%]' : ''}`}
            initial={{
                opacity: 0,
                scale: 1.2, // Start larger (Punch)
                filter: "blur(12px)", // Heavy blur (Crystallize)
                y: 10
            }}
            animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                y: 0
            }}
            transition={{
                duration: 0.6, // Fast impact
                delay: delay,
                ease: "circOut" // Sudden stop (Slam effect)
            }}
        >
            {text}
        </motion.span>
    )
}
