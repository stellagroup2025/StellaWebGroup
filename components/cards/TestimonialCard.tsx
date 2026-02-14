"use client"

import React from "react"


import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
}

export function TestimonialCard({ quote, author, role, company }: TestimonialCardProps) {
  const divRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleFocus = () => {}

  const handleBlur = () => {}

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      className="relative p-6 rounded-2xl bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl overflow-hidden group transition-all duration-300 shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
    >
      {/* Glass light reflections */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/80 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />

      {/* Spotlight glow on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.15), transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        <Quote className="h-8 w-8 text-brand/30 mb-4 group-hover:text-brand/60 transition-colors" />
        <p className="text-muted-foreground mb-6 leading-relaxed italic group-hover:text-foreground transition-colors mix-blend-color-dodge-">&quot;{quote}&quot;</p>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">
            {role} en {company}
          </p>
        </div>
      </div>
    </div>
  )
}
