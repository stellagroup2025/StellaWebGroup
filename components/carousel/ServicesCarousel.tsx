"use client"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
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
  const [activeIndex, setActiveIndex] = useState(2)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length)
  }

  return (
    <div className="relative z-10 w-full">
      {/* Carousel Container */}
      <div className="relative z-10 h-[560px] md:h-[540px] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-2">
          <div className="flex items-center justify-center gap-12">
            {services.map((service, index) => {
              const offset = index - activeIndex
              const isActive = index === activeIndex
              const zIndex = isActive ? 50 : 40 - Math.abs(offset)

              return (
                <motion.div
                  key={service.title}
                  animate={{
                    opacity: Math.abs(offset) >= 2 ? 0 : 1,
                    scale: isActive ? 1 : 0.85,
                    x: offset * 450,
                    filter: isActive
                      ? "blur(0px) brightness(1)"
                      : Math.abs(offset) >= 2
                        ? "blur(5px) brightness(0.5)"
                        : "blur(2px) brightness(0.6)",
                    zIndex,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute w-full max-w-md"
                  onClick={() => !isActive && setActiveIndex(index)}
                  style={{
                    cursor: isActive ? "default" : "pointer",
                    pointerEvents: Math.abs(offset) >= 2 ? "none" : "auto",
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
              className={`h-2 rounded-full transition-all ${index === activeIndex ? "w-8 bg-brand" : "w-2 bg-border"
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
  // 3D Tilt Logic
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || !ref.current) return

    const rect = ref.current.getBoundingClientRect()

    const width = rect.width
    const height = rect.height

    const mouseXFromCenter = e.clientX - rect.left - width / 2
    const mouseYFromCenter = e.clientY - rect.top - height / 2

    // Normalized coordinates (-0.5 to 0.5)
    const xPct = mouseXFromCenter / width
    const yPct = mouseYFromCenter / height

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className="relative flex flex-col items-center perspective-1000 group cursor-grab active:cursor-grabbing w-full"
    >
      <div
        style={{ transform: "translateZ(30px)" }}
        className={`relative w-full aspect-[4/3] rounded-xl border overflow-hidden transition-all duration-300 ${isActive ? "bg-card border-brand/50 shadow-2xl" : "bg-card/50 border-border"
          }`}
      >
        {/* Background Image */}
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand/10 to-brand/5">
            <Icon className={`h-20 w-20 ${isActive ? "text-brand/20" : "text-brand/10"}`} />
          </div>
        )}

        {/* Readability Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

        {/* Shine Effect (Subtler) */}
        {isActive && (
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 Mix-blend-overlay"
            style={{
              background: "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 60%)"
            }}
          />
        )}

        {/* Floating Content Layer */}
        <div
          style={{ transform: "translateZ(50px)" }}
          className="absolute inset-0 flex flex-col justify-end p-6 text-left"
        >
          {/* Icon Badge */}
          <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand/20 backdrop-blur-md border border-brand/10 text-brand shadow-lg">
            <Icon className="w-6 h-6" />
          </div>

          <h3 className="text-2xl font-bold mb-2 text-white text-balance shadow-black drop-shadow-md">
            {title}
          </h3>

          <p className="text-gray-200 text-sm md:text-base leading-relaxed line-clamp-3 text-pretty shadow-black drop-shadow-md opacity-90">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
