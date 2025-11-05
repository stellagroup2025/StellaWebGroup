import type { Metadata } from "next"
import { Navbar } from "../../components/layout/Navbar"
import { Footer } from "../../components/layout/Footer"
import { Container } from "../../components/ui/Container"
import { Section } from "../../components/ui/Section"
import { Heading } from "../../components/ui/Heading"
import { Badge } from "../../components/ui/badge"
import { ServiceImageCard } from "../../components/cards/ServiceImageCard"
import { Button } from "../../components/ui/button"
import { services } from "../../data/services"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Servicios",
  description: "Desarrollo web, integraciones, dashboards, automatizaciones, IA aplicada y SEO técnico",
}

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <main>
        <Section className="pt-24 pb-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left column - Sticky text */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <Badge className="mb-4">Nuestros Servicios</Badge>
                  <Heading level={1} className="mb-6">
                    Soluciones tecnológicas para cada necesidad
                  </Heading>
                  <p className="text-lg text-muted-foreground mb-8">
                    Ofrecemos servicios especializados que combinan experiencia técnica con visión de negocio para
                    transformar tus ideas en resultados medibles.
                  </p>
                  <Button size="lg" asChild>
                    <a href="/contacto">
                      Hablar con nosotros
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right column - Scrollable cards in 2 columns */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {services.map((service, index) => (
                    <ServiceImageCard
                      key={index}
                      title={service.title}
                      description={service.description}
                      image={service.image}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="bg-muted/30">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <Heading level={2} className="mb-6">
                ¿No encuentras lo que buscas?
              </Heading>
              <p className="text-lg text-muted-foreground mb-8">
                Cada proyecto es único. Cuéntanos tu desafío y diseñaremos una solución a medida
              </p>
              <Button size="lg" asChild>
                <a href="/contacto">
                  Hablar con nosotros
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
