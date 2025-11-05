"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heading } from "../../components/ui/Heading"

const rotatingTexts = [
  { text: "En Constante Evolución", font: "font-heading" },
  { text: "Innovación Sin Límites", font: "font-display" },
  { text: "Crecimiento Continuo", font: "font-serif" },
  { text: "Transformación Digital", font: "font-sans" },
]

export function RotatingText() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mb-6 h-16 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTextIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={rotatingTexts[currentTextIndex].font}
        >
          <Heading level={2}>{rotatingTexts[currentTextIndex].text}</Heading>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
