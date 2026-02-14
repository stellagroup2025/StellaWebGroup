"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { ArrowRight } from "lucide-react"

interface Metric {
  label: string
  value: string
}

interface CaseStudyCardProps {
  title: string
  sector: string
  image: string
  metrics: Metric[]
  slug: string
}

export function CaseStudyCard({ title, sector, image, metrics, slug }: CaseStudyCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl overflow-hidden bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all"
    >
      {/* Glass reflection layers */}
      <div className="absolute inset-0 z-10 rounded-2xl bg-gradient-to-b from-white/30 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
      <div className="absolute inset-0 z-10 rounded-2xl bg-gradient-to-r from-transparent via-white/15 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />

      <Link href={`/proyectos/${slug}`} className="relative z-[5]">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-4 relative inline-flex items-center px-3 py-1 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl text-brand text-xs font-medium shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
            <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
            <span className="relative">{sector}</span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 group-hover:text-brand transition-colors">{title}</h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {metrics.map((metric, index) => (
              <div key={index} className="relative px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-xl text-brand text-sm font-medium shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
                <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
                <span className="relative">{metric.value} {metric.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center text-brand font-medium">
            Ver caso completo
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
