import type { Metadata } from "next"
import { Navbar } from "../../components/layout/Navbar"
import { Footer } from "../../components/layout/Footer"
import { Container } from "../../components/ui/Container"
import { Section } from "../../components/ui/Section"
import { Heading } from "../../components/ui/Heading"
import { Badge } from "../../components/ui/badge"
import { CaseStudyCard } from "../../components/cards/CaseStudyCard"
import { projects } from "../../data/projects"

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Casos de éxito y proyectos destacados que hemos desarrollado",
}

export default function ProyectosPage() {
  return (
    <>
      <Navbar />
      <main>
        <Section className="pt-24 pb-12 bg-gradient-to-br from-background via-background to-muted/30">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4">Casos de Éxito</Badge>
              <Heading level={1} className="mb-6">
                Proyectos que transforman negocios
              </Heading>
              <p className="text-lg text-muted-foreground">Resultados medibles en diferentes sectores e industrias</p>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
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
