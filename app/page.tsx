import { Navbar } from "../components/layout/Navbar"
import { Footer } from "../components/layout/Footer"
import { Hero } from "../components/hero/Hero"
import { ServicesCarousel } from "../components/carousel/ServicesCarousel"
import { Container } from "../components/ui/Container"
import { Section } from "../components/ui/Section"
import { Heading } from "../components/ui/Heading"
import { Badge } from "../components/ui/badge"
import { ProcessSteps } from "../components/process/ProcessSteps"
import { CallToAction } from "../components/cta/CallToAction"
import { HeroAnimationLazy } from "../components/hero/HeroAnimationLazy"

const processSteps = [
  {
    number: "01",
    title: "Descubrimiento",
    description: "Analizamos tus necesidades y objetivos para diseñar la solución perfecta",
  },
  {
    number: "02",
    title: "Diseño",
    description: "Creamos prototipos y arquitecturas que priorizan la experiencia del usuario",
  },
  {
    number: "03",
    title: "Desarrollo",
    description: "Implementamos con las mejores prácticas y tecnologías de vanguardia",
  },
  {
    number: "04",
    title: "Entrega",
    description: "Desplegamos, monitoreamos y optimizamos para garantizar el éxito",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Background animation - always at the bottom layer */}
      <HeroAnimationLazy />

      {/* All content above animation - isolated stacking context */}
      <div className="relative" style={{ zIndex: 1, isolation: "isolate" }}>
        <Navbar />
        <main className="relative">
          <Hero />

          {/* Services */}
          <Section id="servicios" className="pt-12 md:pt-20 pb-4 md:pb-8">
            <div className="w-full">
              <div className="text-center mb-12 px-4">
                <div className="flex items-center gap-4 justify-center mb-10">
                  <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-border" />
                  <Badge className="px-5 py-2 text-sm font-medium rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl text-brand shadow-[0_2px_16px_rgba(0,0,0,0.06)]">Nuestros Servicios</Badge>
                  <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-border" />
                </div>
                <Heading level={2} className="mb-6">
                  Soluciones que impulsan tu{" "}
                  <span className="font-serif italic bg-gradient-to-r from-brand via-blue-300 to-brand bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent">
                    crecimiento
                  </span>
                </Heading>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Transformamos ideas en productos digitales de alto rendimiento
                </p>
              </div>

              <ServicesCarousel />
            </div>
          </Section>

          {/* Process */}
          <Section id="proceso" className="py-12 md:py-20">
            <Container>
              <div className="text-center mb-12">
                <div className="flex items-center gap-4 justify-center mb-10">
                  <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-border" />
                  <Badge className="px-5 py-2 text-sm font-medium rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl text-brand shadow-[0_2px_16px_rgba(0,0,0,0.06)]">Nuestro Proceso</Badge>
                  <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-border" />
                </div>
                <Heading level={2} className="mb-6">
                  De la idea a la{" "}
                  <span className="font-serif italic bg-gradient-to-r from-brand via-blue-300 to-brand bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent">
                    realidad
                  </span>{" "}
                  en 4 pasos
                </Heading>
              </div>

              <ProcessSteps steps={processSteps} />
            </Container>
          </Section>

          {/* CTA */}
          <CallToAction />
        </main>
        <Footer />
      </div>
    </>
  )
}
