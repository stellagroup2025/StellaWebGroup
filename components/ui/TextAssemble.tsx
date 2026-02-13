"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TextAssembleProps {
    text: string
    className?: string
    delay?: number
    gradient?: boolean
}

function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

export function TextAssemble({ text, className = "", delay = 0, gradient = false }: TextAssembleProps) {
    const [isMounted, setIsMounted] = useState(false)
    const [startAnimation, setStartAnimation] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const timer = setTimeout(() => {
            setStartAnimation(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    const words = text.split(" ")

    return (
        <span className={`inline-block ${className}`}>
            {words.map((word, wIndex) => (
                <span key={wIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split("").map((char, cIndex) => {
                        const globalIndex = wIndex * 10 + cIndex

                        if (!isMounted) {
                            // SERVER SIDER / INITIAL CLIENT: Static text, perfect hydration matches
                            return (
                                <span key={cIndex} className={`inline-block relative z-10 ${gradient ? 'bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent' : ''}`}>
                                    {char}
                                </span>
                            )
                        }

                        // CLIENT SIDE ONLY: The Magic Show
                        const r1 = seededRandom(globalIndex * 123.45)
                        const r2 = seededRandom(globalIndex * 678.90)

                        const randomAngle = r1 * 360 * (Math.PI / 180)
                        const minRadius = 800
                        const randomRadius = minRadius + (r2 * 600)

                        const randomX = Math.cos(randomAngle) * randomRadius
                        const randomY = Math.sin(randomAngle) * randomRadius

                        const angle = randomAngle * (180 / Math.PI)

                        const variants = {
                            initialHidden: {
                                x: randomX,
                                y: randomY,
                                opacity: 1,
                                scale: 0.5,
                                filter: "blur(2px)"
                            },
                            visible: {
                                x: 0,
                                y: 0,
                                opacity: 1,
                                scale: 1,
                                filter: "blur(0px)",
                                transition: {
                                    duration: 2.0, // Majestic Slow Motion
                                    delay: delay + (r1 * 0.4),
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 70,
                                }
                            }
                        }

                        return (
                            <motion.span
                                key={cIndex}
                                className="inline-block relative"
                                variants={variants}
                                initial="initialHidden"
                                animate={startAnimation ? "visible" : "initialHidden"}
                            >
                                {startAnimation && (
                                    <motion.span
                                        className="absolute top-1/2 left-1/2 h-[2px] bg-cyan-400 origin-left"
                                        style={{
                                            width: "300px",
                                            rotate: `${angle + 180}deg`,
                                            x: "-50%",
                                            y: "-50%",
                                            boxShadow: "0 0 8px 2px rgba(34, 211, 238, 0.6)",
                                            zIndex: 0
                                        }}
                                        initial={{ opacity: 1, scaleX: 1 }}
                                        animate={{ opacity: 0, scaleX: 0.2 }}
                                        transition={{
                                            duration: 1.5,
                                            delay: delay + (r1 * 0.4),
                                            ease: "circIn"
                                        }}
                                    />
                                )}

                                <span className={`relative z-10 ${gradient ? 'bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent' : ''}`}>
                                    {char}
                                </span>
                            </motion.span>
                        )
                    })}
                </span>
            ))}
        </span>
    )
}
