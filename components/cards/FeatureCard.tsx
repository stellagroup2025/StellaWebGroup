"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative p-6 rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all overflow-hidden"
    >
      <div className="relative w-12 h-12 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center mb-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />
        <Icon className="relative h-6 w-6 text-brand" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  )
}
