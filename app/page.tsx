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
import { ArrowRight } from "lucide-react"
import { ProcessSteps } from "../components/process/ProcessSteps"

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
      <main>
        <Hero />

        {/* Services */}
        <Section id="servicios" className="bg-muted/30">
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
        <Section className="bg-muted/30">
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
        <Section className="bg-muted/30">
          <Container>
            <div className="text-center mb-12">
              <Badge className="mb-4">Testimonios</Badge>
              <Heading level={2} className="mb-4">
                Lo que dicen nuestros clientes
              </Heading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  company={testimonial.company}
                />
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section>
          <Container>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-brand/80 p-12 text-center text-brand-foreground">
              <div className="relative z-10">
                <Heading level={2} className="mb-4 text-brand-foreground">
                  ¿Listo para transformar tu negocio?
                </Heading>
                <p className="text-lg mb-8 text-brand-foreground/90 max-w-2xl mx-auto">
                  Hablemos de tu proyecto y descubre cómo podemos ayudarte a alcanzar tus objetivos
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <a href="/contacto">
                      Hablar con nosotros
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-brand-foreground text-brand-foreground hover:bg-brand-foreground/10"
                    asChild
                  >
                    <a href="/proyectos">Ver casos de éxito</a>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
