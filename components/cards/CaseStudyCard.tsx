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
      className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-brand/50 hover:shadow-xl transition-all"
    >
      <Link href={`/proyectos/${slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge className="absolute top-4 left-4">{sector}</Badge>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 group-hover:text-brand transition-colors">{title}</h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {metrics.map((metric, index) => (
              <div key={index} className="px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-medium">
                {metric.value} {metric.label}
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
