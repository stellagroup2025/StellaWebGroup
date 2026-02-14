"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface ServiceImageCardProps {
  title: string
  description: string
  image: string
}

export function ServiceImageCard({ title, description, image }: ServiceImageCardProps) {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="group">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300">
        {/* Glass reflection layers */}
        <div className="absolute inset-0 z-10 rounded-2xl bg-gradient-to-b from-white/30 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
        <div className="absolute inset-0 z-10 rounded-2xl bg-gradient-to-r from-transparent via-white/15 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />

        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Title overlaid on image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed px-2">{description}</p>
    </motion.div>
  )
}
