"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
}

export function TestimonialCard({ quote, author, role, company }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="p-6 rounded-xl bg-card border border-border hover:border-brand/50 hover:shadow-lg transition-all"
    >
      <Quote className="h-8 w-8 text-brand/30 mb-4" />
      <p className="text-muted-foreground mb-6 leading-relaxed italic">"{quote}"</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">
          {role} en {company}
        </p>
      </div>
    </motion.div>
  )
}
