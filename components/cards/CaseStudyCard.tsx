"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Metric {
  label: string
  value: string
}

interface CaseStudyCardProps {
  title: string
  sector: string
  image: string
  problem?: string
  solution?: string
  technologies?: string[]
  metrics: Metric[]
  slug: string
  externalUrl?: string
}

export function CaseStudyCard({ title, sector, image, problem, solution, technologies, metrics, slug, externalUrl }: CaseStudyCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative h-full rounded-[1.75rem] overflow-hidden bg-white/60 dark:bg-white/[0.06] backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] transition-all"
    >
      {/* Glass reflection layers */}
      <div className="absolute inset-0 z-10 rounded-[1.75rem] bg-gradient-to-b from-white/50 via-transparent to-transparent dark:from-white/[0.08] pointer-events-none" />
      <div className="absolute inset-0 z-10 rounded-[1.75rem] bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none" />

      <Link href={externalUrl || `/proyectos/${slug}`} target={externalUrl ? "_blank" : undefined} rel={externalUrl ? "noopener noreferrer" : undefined} className="relative z-[5] flex flex-col h-full">
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Sector badge */}
          <div className="absolute top-3.5 left-3.5">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/70 dark:bg-white/15 backdrop-blur-xl text-[11px] font-semibold tracking-wide uppercase text-brand shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
              {sector}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          <h3 className="text-lg font-bold leading-snug group-hover:text-brand transition-colors">
            {title}
          </h3>

          {/* Problem & Solution */}
          <div className="space-y-1.5 flex-1">
            {problem && (
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground/70">Reto</span>{" "}
                <span className="mx-0.5 text-brand/40">|</span> {problem}
              </p>
            )}
            {solution && (
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground/70">Solución</span>{" "}
                <span className="mx-0.5 text-brand/40">|</span> {solution}
              </p>
            )}
          </div>

          {/* Technologies */}
          {technologies && technologies.length > 0 && (
            <div className="flex items-center justify-center gap-3 text-[11px] text-muted-foreground font-medium">
              {technologies.map((tech, index) => (
                <span key={index} className="flex items-center gap-3">
                  {index > 0 && <span className="text-border">·</span>}
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-2">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="relative px-3 py-1.5 rounded-full bg-brand/[0.06] dark:bg-brand/[0.12] backdrop-blur-md text-brand text-[13px] font-semibold overflow-hidden text-center"
              >
                {metric.value} {metric.label}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-center text-brand text-sm font-semibold pt-1">
            Ver caso completo
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
