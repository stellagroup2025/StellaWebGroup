"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../ui/button"
import { Container } from "../ui/Container"
import { ArrowRight, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

const backgroundImages = [
  "/modern-developer-office.png",
  "/technology-workspace-with-multiple-monitors-and-co.jpg",
  "/professional-team-collaborating-on-software-projec.jpg",
  "/modern-tech-office.png",
]

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)

      setTimeout(() => {
        setIsTransitioning(false)
      }, 1000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentTextColor = isTransitioning ? "text-brand" : "text-black"

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={backgroundImages[currentImageIndex] || "/placeholder.svg"}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-background/40 to-background/30" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Soluciones tecnológicas de alto impacto</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Construimos software que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-slate-400">
              impulsa tu negocio
            </span>
          </motion.h1>

          <motion.p
            className={`text-lg md:text-xl ${currentTextColor} mb-8 max-w-2xl mx-auto text-pretty transition-colors duration-1000`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Desarrollamos aplicaciones web, integraciones y automatizaciones que transforman ideas en resultados
            medibles
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" asChild>
              <a href="/contacto">
                Hablar con nosotros
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/proyectos">Ver casos de éxito</a>
            </Button>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {[
              { value: "50+", label: "Proyectos entregados" },
              { value: "98%", label: "Satisfacción cliente" },
              { value: "24/7", label: "Soporte técnico" },
              { value: "5 años", label: "De experiencia" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-brand mb-1">{stat.value}</div>
                <div className={`text-sm ${currentTextColor} transition-colors duration-1000`}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
