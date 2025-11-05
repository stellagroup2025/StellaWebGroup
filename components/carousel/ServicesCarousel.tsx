"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  Users,
  Code2,
  Workflow,
  LayoutDashboard,
  Zap,
  Brain,
  Search,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react"
import { Button } from "../ui/button"

// los servicios viven aquí dentro (CLIENTE)
const services: {
  icon: LucideIcon
  title: string
  description: string
  image?: string
}[] = [
  {
    icon: Users,
    title: "Gestión de Redes Sociales",
    description:
      "Plataforma completa para community managers: gestiona múltiples cuentas, responde mensajes y comentarios, visualiza estadísticas en tiempo real y controla pagos desde un solo lugar",
    image: "/services/social-media-management.jpg",
  },
  {
    icon: Code2,
    title: "Desarrollo Web",
    description: "Aplicaciones web modernas con React, Next.js y las últimas tecnologías del mercado",
    image: "/services/web-development.jpg",
  },
  {
    icon: Workflow,
    title: "Integraciones",
    description: "Conectamos tus sistemas y herramientas para optimizar flujos de trabajo",
    image: "/services/integrations.jpg",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards & AG Grid",
    description: "Paneles de control interactivos con visualización de datos en tiempo real",
    image: "/services/dashboards.jpg",
  },
  {
    icon: Zap,
    title: "Automatizaciones",
    description: "Automatizamos procesos repetitivos para aumentar la productividad",
    image: "/services/automation.jpg",
  },
  {
    icon: Brain,
    title: "IA Aplicada",
    description: "Implementamos soluciones de inteligencia artificial para resolver problemas reales",
    image: "/services/ai-applied.jpg",
  },
  {
    icon: Search,
    title: "SEO Técnico",
    description: "Optimización técnica para mejorar el posicionamiento en buscadores",
    image: "/services/seo-technical.jpg",
  },
]

export function ServicesCarousel() {
  // como ya sabes: empezabas en 2
  const [activeIndex, setActiveIndex] = useState(2)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length)
  }

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative h-[560px] md:h-[540px] flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto px-2">
          <div className="flex items-center justify-center gap-12">
            {services.map((service, index) => {
              const offset = index - activeIndex
              const isActive = index === activeIndex
              const zIndex = isActive ? 50 : 40 - Math.abs(offset)

              return (
                <motion.div
                  key={service.title}
                  animate={{
                    opacity: isActive ? 1 : 0.65,
                    scale: isActive ? 1 : 0.85,
                    x: offset * 450,
                    filter: isActive ? "blur(0px)" : "blur(1.5px)",
                    zIndex,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute w-full max-w-md"
                  onClick={() => !isActive && setActiveIndex(index)}
                  style={{
                    cursor: isActive ? "default" : "pointer",
                    // esto ya lo tenías
                    pointerEvents: Math.abs(offset) > 2 ? "none" : "auto",
                  }}
                >
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    isActive={isActive}
                    image={service.image}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="rounded-full bg-transparent md:hidden"
          aria-label="Anterior servicio"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Dots */}
        <div className="flex gap-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-brand" : "w-2 bg-border"
              }`}
              aria-label={`Ir al servicio ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="rounded-full bg-transparent md:hidden"
          aria-label="Siguiente servicio"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  isActive,
  image,
}: {
  icon: LucideIcon
  title: string
  description: string
  isActive: boolean
  image?: string
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative w-full aspect-[4/3] rounded-xl border overflow-hidden transition-all ${
          isActive ? "bg-card border-brand/50 shadow-2xl" : "bg-card/50 border-border"
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand/10 to-brand/5">
            <div
              className={`w-20 h-20 rounded-lg flex items-center justify-center transition-colors ${
                isActive ? "bg-brand/20" : "bg-brand/10"
              }`}
            >
              <Icon className={`h-10 w-10 ${isActive ? "text-brand" : "text-brand/70"}`} />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-center px-4 h-[180px] flex flex-col">
        <h3
          className={`text-2xl font-semibold mb-3 transition-opacity line-clamp-2 ${
            isActive ? "opacity-100" : "opacity-80"
          }`}
        >
          {title}
        </h3>
        <p
          className={`leading-relaxed transition-opacity line-clamp-4 ${
            isActive ? "text-foreground opacity-100" : "text-muted-foreground opacity-70"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
