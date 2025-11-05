'use client'

import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { Container } from '../../components/ui/Container'
import { Section } from '../../components/ui/Section'
import { Heading } from '../../components/ui/Heading'
import { Badge } from '../../components/ui/badge'
import {
  Target,
  Users,
  Lightbulb,
  Award,
  Brain,
  Code2,
  Rocket,
  TrendingUp,
  Search,
  Sparkles
} from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const values = [
  {
    icon: Target,
    title: 'Visión Estratégica',
    description:
      'Comprendemos tanto el mercado tecnológico como el comercial para captar ideas y ejecutarlas con precisión'
  },
  {
    icon: Rocket,
    title: 'Innovación Aplicada',
    description:
      'Dominamos tecnologías emergentes y las aplicamos de forma práctica para generar resultados reales'
  },
  {
    icon: Users,
    title: 'Adaptabilidad Total',
    description:
      'Cada proyecto se desarrolla a medida, adaptado específicamente a las necesidades de cada persona o empresa'
  },
  {
    icon: Award,
    title: 'Excelencia Técnica',
    description:
      'Combinamos experiencia en gestión, programación, arquitectura y diseño para entregar soluciones superiores'
  }
]

const founders = [
  {
    name: 'Omar Somoza',
    role: 'Co-fundador & Project Manager',
    image: '/founders/omar.webp',
    description:
      'Project Manager con experiencia demostrable en la gestión de proyectos tecnológicos complejos. Posee un amplio conocimiento de tecnologías existentes y emergentes, con especial dominio en Inteligencia Artificial y su aplicación práctica en soluciones empresariales.',
    expertise: [
      'Gestión de Proyectos',
      'Inteligencia Artificial',
      'Tecnologías Emergentes',
      'Estrategia Digital'
    ]
  },
  {
    name: 'Javier Reyes',
    role: 'Co-fundador & Lead Developer',
    image: '/founders/javier.webp',
    description:
      'Programador experimentado, arquitecto de software y diseñador. Su talento multidisciplinario abarca desde la arquitectura técnica hasta el diseño de interfaces, garantizando soluciones robustas, escalables y visualmente impecables.',
    expertise: [
      'Arquitectura de Software',
      'Desarrollo Full-Stack',
      'Diseño UI/UX',
      'Optimización de Sistemas'
    ]
  }
]

export default function NosotrosClient() {
  const rotatingTexts = [
    { text: 'En Constante Evolución', font: 'font-heading' },
    { text: 'Innovación Sin Límites', font: 'font-display' },
    { text: 'Crecimiento Continuo', font: 'font-serif' },
    { text: 'Transformación Digital', font: 'font-sans' }
  ]

  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 3000) // Change text every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <Section className='pt-24 pb-12 bg-gradient-to-br from-background via-background to-muted/30'>
          <Container>
            <div className='max-w-3xl mx-auto text-center'>
              <Badge className='mb-4'>Nosotros</Badge>
              <Heading level={1} className='mb-6'>
                Experiencia y Visión para Transformar Ideas en Realidad
              </Heading>
              <p className='text-lg text-muted-foreground leading-relaxed'>
                Combinamos un profundo entendimiento de los mercados tecnológico
                y comercial con la capacidad de captar ideas y llevarlas a cabo
                con excelencia técnica
              </p>
            </div>
          </Container>
        </Section>

        {/* Company Values */}
        <Section className='bg-muted/30'>
          <Container>
            <div className='text-center mb-12'>
              <Heading level={2} className='mb-4'>
                Nuestros Valores Empresariales
              </Heading>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                Principios que definen nuestra forma de trabajar y entregar
                valor a cada cliente
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {values.map((value, index) => (
                <div key={index} className='text-center group'>
                  <div className='w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4 transition-all group-hover:bg-brand/20 group-hover:scale-110'>
                    <value.icon className='h-8 w-8 text-brand' />
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>{value.title}</h3>
                  <p className='text-muted-foreground leading-relaxed'>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Founders Section */}
        <Section>
          <Container>
            <div className='text-center mb-16'>
              <Heading level={2} className='mb-4'>
                Nuestros Fundadores
              </Heading>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                Talentos complementarios que se unen para desarrollar los
                mejores proyectos adaptados a cada necesidad
              </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto'>
              {founders.map((founder, index) => (
                <div key={index} className='group'>
                  <div className='relative h-80 rounded-2xl overflow-hidden mb-6 bg-muted'>
                    <Image
                      src={founder.image || '/placeholder.svg'}
                      alt={founder.name}
                      fill
                      className='object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent' />
                    <div className='absolute bottom-6 left-6 right-6'>
                      <h3 className='text-2xl font-bold text-foreground mb-1'>
                        {founder.name}
                      </h3>
                      <p className='text-brand font-medium'>{founder.role}</p>
                    </div>
                  </div>

                  <p className='text-muted-foreground leading-relaxed mb-6'>
                    {founder.description}
                  </p>

                  <div className='flex flex-wrap gap-2'>
                    {founder.expertise.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant='secondary'
                        className='text-sm'
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Combined Strengths */}
        <Section className='bg-gradient-to-br from-brand/5 via-background to-accent/5'>
          <Container>
            <div className='max-w-4xl mx-auto'>
              <div className='text-center mb-12'>
                <div className='inline-flex items-center gap-2 mb-4'>
                  <TrendingUp className='h-8 w-8 text-brand' />
                  <Heading level={2}>Talentos en Conjunto</Heading>
                </div>
                <p className='text-lg text-muted-foreground leading-relaxed'>
                  La combinación de experiencia en gestión de proyectos, dominio
                  técnico avanzado, arquitectura de software y diseño nos
                  permite ofrecer soluciones integrales que abarcan desde la
                  conceptualización hasta la implementación final.
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div className='text-center p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50'>
                  <Brain className='h-12 w-12 text-brand mx-auto mb-4' />
                  <h3 className='font-semibold text-lg mb-2'>
                    Visión Estratégica
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Entendimiento profundo de mercados y necesidades
                    empresariales
                  </p>
                </div>

                <div className='text-center p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50'>
                  <Code2 className='h-12 w-12 text-brand mx-auto mb-4' />
                  <h3 className='font-semibold text-lg mb-2'>
                    Excelencia Técnica
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Arquitectura sólida y código de la más alta calidad
                  </p>
                </div>

                <div className='text-center p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50'>
                  <Lightbulb className='h-12 w-12 text-brand mx-auto mb-4' />
                  <h3 className='font-semibold text-lg mb-2'>
                    Innovación Constante
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Dominio de IA y tecnologías emergentes aplicadas
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Constant Evolution Section */}
        <Section>
          <Container>
            <div className='max-w-4xl mx-auto'>
              <div className='text-center mb-12'>
                <div className='inline-flex items-center gap-2 mb-4'>
                  <div className='animate-spin-slow'>
                    <Search className='h-8 w-8 text-brand' />
                  </div>
                  <div className='animate-pulse'>
                    <Sparkles className='h-6 w-6 text-accent' />
                  </div>
                </div>
                <div className='mb-6 h-16 flex items-center justify-center'>
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={currentTextIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className={rotatingTexts[currentTextIndex].font}
                    >
                      <Heading level={2}>
                        {rotatingTexts[currentTextIndex].text}
                      </Heading>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <p className='text-lg text-muted-foreground leading-relaxed mb-8'>
                  Nuestra búsqueda nunca se detiene. Estamos en constante
                  exploración de nuevas tecnologías que nos permitan ofrecer
                  soluciones más innovadoras y eficientes. Al mismo tiempo,
                  buscamos activamente nuevos talentos que compartan nuestra
                  visión y nos impulsen hacia nuevas metas.
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='p-8 rounded-2xl bg-gradient-to-br from-brand/10 to-brand/5 border border-brand/20 relative overflow-hidden group hover:scale-105 transition-transform duration-300'>
                  <div className='absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                  <div className='w-14 h-14 rounded-full bg-brand/20 flex items-center justify-center mb-6 relative z-10 group-hover:rotate-12 transition-transform duration-300'>
                    <Rocket className='h-7 w-7 text-brand animate-pulse' />
                  </div>
                  <h3 className='text-xl font-semibold mb-3 relative z-10'>
                    Nuevas Tecnologías
                  </h3>
                  <p className='text-muted-foreground leading-relaxed relative z-10'>
                    Investigamos y adoptamos las últimas innovaciones
                    tecnológicas, desde frameworks emergentes hasta avances en
                    inteligencia artificial, para mantener a nuestros clientes a
                    la vanguardia del mercado.
                  </p>
                </div>

                <div className='p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-foreground/20 relative overflow-hidden group hover:scale-105 transition-transform duration-300'>
                  <div className='absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                  <div className='w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-6 relative z-10 group-hover:-rotate-12 transition-transform duration-300'>
                    <Users className='h-7 w-7 text-accent animate-pulse' />
                  </div>
                  <h3 className='text-xl font-semibold mb-3 relative z-10'>
                    Nuevos Talentos
                  </h3>
                  <p className='text-muted-foreground leading-relaxed relative z-10'>
                    Buscamos profesionales apasionados que aporten perspectivas
                    frescas y habilidades complementarias, expandiendo nuestras
                    capacidades y permitiéndonos alcanzar objetivos cada vez más
                    ambiciosos.
                  </p>
                </div>
              </div>

              <div className='mt-12 p-8 rounded-2xl bg-muted/50 border border-border text-center relative overflow-hidden'>
                <p className='text-lg font-medium text-foreground mb-2 relative z-10'>
                  Esta mentalidad de crecimiento continuo nos permite
                </p>
                <p className='text-muted-foreground leading-relaxed relative z-10'>
                  Adaptarnos rápidamente a los cambios del mercado, anticipar
                  las necesidades futuras de nuestros clientes y entregar
                  soluciones que no solo resuelven problemas actuales, sino que
                  preparan el camino para el éxito a largo plazo.
                </p>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
