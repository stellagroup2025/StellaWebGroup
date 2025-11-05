"use client"

import { motion } from "framer-motion"
import { techStack } from "../../data/tech"

export function TechMarquee() {
  // Duplicate the array for seamless loop
  const duplicatedTech = [...techStack, ...techStack]

  return (
    <div className="relative overflow-hidden py-8">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        className="flex gap-12"
        animate={{
          x: [0, -50 * techStack.length],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {duplicatedTech.map((tech, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all"
          >
            <span className="text-2xl font-bold text-muted-foreground">{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
