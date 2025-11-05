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
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Title overlaid on image */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed px-2">{description}</p>
    </motion.div>
  )
}
