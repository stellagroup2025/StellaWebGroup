import { Navbar } from "../components/layout/Navbar"
import { Footer } from "../components/layout/Footer"
import { Hero } from "../components/hero/Hero"
import { ServicesCarousel } from "../components/carousel/ServicesCarousel"
import { TestimonialCard } from "../components/cards/TestimonialCard"
import { Container } from "../components/ui/Container"
import { Section } from "../components/ui/Section"
import { Heading } from "../components/ui/Heading"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { testimonials } from "../data/testimonials"
import { ProcessSteps } from "../components/process/ProcessSteps"
import { HeroAnimation } from "../components/hero/HeroAnimation"
import { TestimonialGrid } from "../components/testimonials/TestimonialGrid"
import { CallToAction } from "../components/cta/CallToAction"

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
      <Navbar />
      <HeroAnimation />
      <main className="relative z-50">
        <Hero />

        {/* Services */}
        <Section id="servicios" className="bg-transparent/30">
          <div className="w-full">
            <div className="text-center mb-12 px-4">
              <Badge className="mb-4">Nuestros Servicios</Badge>
              <Heading level={2} className="mb-4">
                Soluciones que impulsan tu crecimiento
              </Heading>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transformamos ideas en productos digitales de alto rendimiento
              </p>
            </div>

            <ServicesCarousel />
          </div>
        </Section>

        {/* Process */}
        <Section id="proceso" className="bg-transparent/30">
          <Container>
            <div className="text-center mb-12">
              <Badge className="mb-4">Nuestro Proceso</Badge>
              <Heading level={2} className="mb-4">
                De la idea a la realidad en 4 pasos
              </Heading>
            </div>

            <ProcessSteps steps={processSteps} />
          </Container>
        </Section>

        {/* Testimonials */}
        <Section className="bg-transparent/30">
          <Container>
            <div className="text-center mb-12">
              <Badge className="mb-4">Testimonios</Badge>
              <Heading level={2} className="mb-4">
                Lo que dicen nuestros clientes
              </Heading>
            </div>

            <TestimonialGrid testimonials={testimonials} />
          </Container>
        </Section>

        {/* CTA */}
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
