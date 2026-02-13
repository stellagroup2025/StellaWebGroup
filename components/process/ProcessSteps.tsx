"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      const steps = stepsRef.current.filter(Boolean)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%", // Triggers slightly earlier
          toggleActions: "play none none reverse", // Play automatically on enter
        },
      })

      // Staggered animation (Auto-play)
      tl.fromTo(
        steps,
        {
          y: 50, // Reduced from 100 for snappier feel
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15, // Much faster stagger (was 0.5)
          duration: 0.6,
          ease: "back.out(1.2)", // Subtle bounce for "pop"
        }
      )
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step, index) => (
        <div
          key={index}
          ref={(el) => { if (el) stepsRef.current[index] = el }}
          className="relative"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-brand">{step.number}</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
          {/* Connector line (hidden on mobile, purely decorative) */}
          {index < steps.length - 1 && (
            <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border -z-10 opacity-30" />
          )}
        </div>
      ))}
    </div>
  )
}
