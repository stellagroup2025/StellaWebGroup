"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface TextAssembleProps {
    text: string
    className?: string
    stagger?: number
    gradient?: boolean
}

function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

export function TextAssemble({ text, className = "", stagger = 0, gradient = false }: TextAssembleProps) {
    const isNavigation = typeof document !== "undefined" && document.body.dataset.preloaderDone === "true"

    const gradientClass = gradient ? "bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent" : ""
    const words = text.split(" ")

    // Navigation: plain text, zero framer-motion, zero animation
    if (isNavigation) {
        return (
            <span className={`inline-block ${className}`}>
                {words.map((word, wIndex) => (
                    <span key={wIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
                        {word.split("").map((char, cIndex) => (
                            <span key={cIndex} className="inline-block relative">
                                <span className={`relative z-10 ${gradientClass}`}>{char}</span>
                            </span>
                        ))}
                    </span>
                ))}
            </span>
        )
    }

    // First load: animated version
    return <TextAssembleAnimated text={text} className={className} stagger={stagger} gradient={gradient} />
}

function TextAssembleAnimated({ text, className = "", stagger = 0, gradient = false }: TextAssembleProps) {
    const [isReady, setIsReady] = useState(false)
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    useEffect(() => {
        if (document.body.dataset.preloaderDone === "true") {
            setIsReady(true)
            return
        }

        const onComplete = () => setIsReady(true)
        window.addEventListener("preloader-complete", onComplete, { once: true })
        return () => window.removeEventListener("preloader-complete", onComplete)
    }, [])

    const shouldAnimate = isReady && isInView
    const gradientClass = gradient ? "bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent" : ""
    const words = text.split(" ")

    return (
        <span ref={ref} className={`inline-block ${className}`}>
            {words.map((word, wIndex) => (
                <span key={wIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split("").map((char, cIndex) => {
                        const globalIndex = wIndex * 10 + cIndex
                        const r1 = seededRandom(globalIndex * 123.45)
                        const r2 = seededRandom(globalIndex * 678.90)

                        const randomAngle = r1 * 360 * (Math.PI / 180)
                        const minRadius = 800
                        const randomRadius = minRadius + (r2 * 600)

                        const randomX = Math.cos(randomAngle) * randomRadius
                        const randomY = Math.sin(randomAngle) * randomRadius

                        const angle = randomAngle * (180 / Math.PI)

                        return (
                            <motion.span
                                key={cIndex}
                                className="inline-block relative"
                                animate={shouldAnimate ? "visible" : "hidden"}
                                variants={{
                                    hidden: {
                                        x: randomX,
                                        y: randomY,
                                        opacity: 0,
                                        scale: 0.5,
                                        filter: "blur(2px)",
                                        transition: { duration: 0 }
                                    },
                                    visible: {
                                        x: 0,
                                        y: 0,
                                        opacity: 1,
                                        scale: 1,
                                        filter: "blur(0px)",
                                        transition: {
                                            duration: 2.0,
                                            delay: stagger + (r1 * 0.4),
                                            type: "spring" as const,
                                            damping: 25,
                                            stiffness: 70,
                                        }
                                    }
                                }}
                            >
                                {shouldAnimate && (
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
                                            delay: stagger + (r1 * 0.4),
                                            ease: "circIn"
                                        }}
                                    />
                                )}

                                <span className={`relative z-10 ${gradientClass}`}>
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
