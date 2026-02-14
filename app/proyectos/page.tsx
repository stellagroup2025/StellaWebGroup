import type { Metadata } from "next"
import { Navbar } from "../../components/layout/Navbar"
import { Footer } from "../../components/layout/Footer"
import { Container } from "../../components/ui/Container"
import { Section } from "../../components/ui/Section"
import { Heading } from "../../components/ui/Heading"
import { CaseStudyCard } from "../../components/cards/CaseStudyCard"
import { projects } from "../../data/projects"
import { Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Casos de éxito y proyectos destacados que hemos desarrollado",
}

export default function ProyectosPage() {
  return (
    <>
      <Navbar />
      <main>
        <Section className="pt-24 pb-12 md:pb-16">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-10">
              <div className="flex items-center gap-4 justify-center mb-10">
                <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-border" />
                <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl text-brand shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />
                  <Sparkles className="relative h-4 w-4" />
                  <span className="relative text-sm font-medium">Casos de Éxito</span>
                </div>
                <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-border" />
              </div>
              <Heading level={1} className="mb-6">
                Proyectos que transforman{" "}
                <span className="font-serif italic bg-gradient-to-r from-brand via-blue-300 to-brand bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent">
                  negocios
                </span>
              </Heading>
              <p className="text-lg text-muted-foreground">Resultados medibles en diferentes sectores e industrias</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <CaseStudyCard
                  key={index}
                  title={project.title}
                  sector={project.sector}
                  image={project.image}
                  metrics={project.metrics}
                  slug={project.slug}
                />
              ))}
            </div>
          </Container>
        </Section>

      </main>
      <Footer />
    </>
  )
}
