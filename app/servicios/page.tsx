import type { Metadata } from "next"
import { Navbar } from "../../components/layout/Navbar"
import { Footer } from "../../components/layout/Footer"
import { Container } from "../../components/ui/Container"
import { Section } from "../../components/ui/Section"
import { Heading } from "../../components/ui/Heading"
import { ServiceImageCard } from "../../components/cards/ServiceImageCard"
import { Button } from "../../components/ui/button"
import { services } from "../../data/services"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

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
                  <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl text-brand mb-6 shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />
                    <Sparkles className="relative h-4 w-4" />
                    <span className="relative text-sm font-medium">Nuestros Servicios</span>
                  </div>
                  <Heading level={1} className="mb-6">
                    Soluciones tecnológicas para cada{" "}
                    <span className="font-serif italic bg-gradient-to-r from-brand via-blue-300 to-brand bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent">
                      necesidad
                    </span>
                  </Heading>
                  <p className="text-lg text-muted-foreground mb-8">
                    Ofrecemos servicios especializados que combinan experiencia técnica con visión de negocio para
                    transformar tus ideas en resultados medibles.
                  </p>
                  <Button size="lg" asChild className="relative rounded-full h-14 px-8 w-full sm:w-auto !bg-black/70 dark:!bg-white/10 backdrop-blur-xl !text-white border-0 hover:!bg-black/80 dark:hover:!bg-white/15 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)] text-base font-semibold">
                    <Link href="/contacto" className="flex items-center justify-center gap-2">
                      <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none translate-x-[-20%]" />
                      <span className="relative">Hablar con nosotros</span>
                      <ArrowRight className="relative h-4 w-4" />
                    </Link>
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

        {/* Bottom CTA - Glass card */}
        <section className="px-4 md:px-8 pb-8">
            <div className="relative w-full max-w-7xl mx-auto text-center py-8 px-6 md:py-10 md:px-12 rounded-[2.5rem] bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
              {/* Glass reflections */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />

              <Heading level={2} className="relative mb-4">
                ¿No encuentras lo que{" "}
                <span className="font-serif italic bg-gradient-to-r from-brand via-blue-300 to-brand bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent">
                  buscas
                </span>
                ?
              </Heading>
              <p className="relative text-lg text-muted-foreground mb-6">
                Cada proyecto es único. Cuéntanos tu desafío y diseñaremos una solución a medida
              </p>
              <Button size="lg" asChild className="relative rounded-full h-14 px-8 w-full sm:w-auto !bg-black/70 dark:!bg-white/10 backdrop-blur-xl !text-white border-0 hover:!bg-black/80 dark:hover:!bg-white/15 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)] text-base font-semibold">
                <Link href="/contacto" className="flex items-center justify-center gap-2">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none translate-x-[-20%]" />
                  <span className="relative">Hablar con nosotros</span>
                  <ArrowRight className="relative h-4 w-4" />
                </Link>
              </Button>
            </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
