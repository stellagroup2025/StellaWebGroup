"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface ProcessStep {
  number: string
  title: string
  description: string
}

interface ProcessStepsProps {
  steps: ProcessStep[]
}

export function ProcessSteps({ steps }: ProcessStepsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end start"],
  })

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step, index) => (
        <ProcessStepItem
          key={index}
          step={step}
          index={index}
          totalSteps={steps.length}
          scrollProgress={scrollYProgress}
        />
      ))}
    </div>
  )
}

function ProcessStepItem({
  step,
  index,
  totalSteps,
  scrollProgress,
}: {
  step: ProcessStep
  index: number
  totalSteps: number
  scrollProgress: any
}) {
  const stepThreshold = (index / totalSteps) * 0.3 + 0.15

  // Opacity: 0 before threshold, 1 after threshold (stays visible)
  const opacity = useTransform(scrollProgress, [stepThreshold - 0.05, stepThreshold + 0.05], [0, 1])

  // Y position: slides up when appearing, stays in place
  const y = useTransform(scrollProgress, [stepThreshold - 0.05, stepThreshold + 0.05], [50, 0])

  // Scale: grows when appearing, stays at full scale
  const scale = useTransform(scrollProgress, [stepThreshold - 0.05, stepThreshold + 0.05], [0, 1])

  // Line appears after the point is visible
  const lineScaleX = useTransform(scrollProgress, [stepThreshold + 0.05, stepThreshold + 0.15], [0, 1])

  return (
    <motion.div style={{ opacity, y }} className="relative">
      <div className="flex flex-col items-center text-center">
        <motion.div
          style={{ scale }}
          className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mb-4"
        >
          <span className="text-2xl font-bold text-brand">{step.number}</span>
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
        <p className="text-muted-foreground">{step.description}</p>
      </div>
      {index < totalSteps - 1 && (
        <motion.div
          style={{ scaleX: lineScaleX }}
          className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border origin-left"
        />
      )}
    </motion.div>
  )
}
