"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true)
    const [count, setCount] = useState(0)

    useEffect(() => {
        document.body.style.overflow = "hidden"

        let start = 0
        const end = 100
        const duration = 2000
        const incrementTime = duration / end

        const timer = setInterval(() => {
            start += 1
            setCount(start)
            if (start === end) {
                clearInterval(timer)
                setTimeout(() => {
                    setIsLoading(false)
                    document.body.style.overflow = "auto"
                }, 800)
            }
        }, incrementTime)

        return () => {
            clearInterval(timer)
            document.body.style.overflow = "auto"
        }
    }, [])

    const percentage = count / 100
    const grayValue = Math.round(255 * percentage)
    const backgroundColor = `rgb(${grayValue}, ${grayValue}, ${grayValue})`

    return (
        <AnimatePresence mode="wait" onExitComplete={() => {
            document.body.dataset.preloaderDone = "true"
            window.dispatchEvent(new Event("preloader-complete"))
        }}>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -100, transition: { duration: 0.4 } }}
                        className="relative flex items-center justify-center mix-blend-difference"
                    >
                        <span className="text-6xl md:text-8xl font-bold font-display tracking-tighter text-white">
                            {count}%
                        </span>

                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px]"
                        >
                            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                                <path
                                    id="circlePath"
                                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                    fill="none"
                                />
                                <text className="fill-white text-[10px] font-medium tracking-[0.2em] uppercase opacity-70">
                                    <textPath href="#circlePath" startOffset="0%">
                                        • Design • Code • Strategy • Innovation
                                    </textPath>
                                </text>
                            </svg>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
