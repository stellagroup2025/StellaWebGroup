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
  const [isFocused, setIsFocused] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = React.useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(1)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      className="relative p-6 rounded-xl bg-card border border-border overflow-hidden group hover:border-brand/30 transition-colors duration-300"
    >
      {/* Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(var(--brand-rgb), 0.1), transparent 40%)`, // Assuming usage of brand color variable or similar. Fallback to hardcoded if needed.
        }}
      />

      {/* Spotlight Border (Subtle) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.3), transparent 40%)`,
        }}
        aria-hidden="true"
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
