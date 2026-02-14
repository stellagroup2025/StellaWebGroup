import type { Metadata } from 'next'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { Container } from '../../components/ui/Container'
import { Section } from '../../components/ui/Section'
import { Heading } from '../../components/ui/Heading'
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
import { RotatingText } from './RotatingText'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce a nuestros fundadores, misión y valores empresariales'
}

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
    image: '/founders/omarofi.webp',
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
    image: '/founders/javiofi.webp',
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

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <Section className='pt-24 pb-8'>
          <Container>
            <div className='max-w-3xl mx-auto text-center'>
              <div className='flex items-center gap-4 justify-center mb-6'>
                <div className='h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-border' />
                <div className='relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl text-brand shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden'>
                  <div className='absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-transparent to-transparent dark:from-white/10 pointer-events-none' />
                  <div className='absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]' />
                  <Sparkles className='relative h-4 w-4' />
                  <span className='relative text-sm font-medium'>Nosotros</span>
                </div>
                <div className='h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-border' />
              </div>
              <Heading level={1} className='mb-4'>
                Experiencia y Visión para Transformar Ideas en{' '}
                <span className='font-serif italic bg-gradient-to-r from-brand via-blue-300 to-brand bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent'>
                  Realidad
                </span>
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
        <Section className='py-8 md:py-10'>
          <Container>
            <div className='text-center mb-8'>
              <Heading level={2} className='mb-3'>
                Nuestros Valores{' '}
                <span className='font-serif italic bg-gradient-to-r from-brand via-blue-300 to-brand bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent'>
                  Empresariales
                </span>
              </Heading>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                Principios que definen nuestra forma de trabajar y entregar
                valor a cada cliente
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {values.map((value, index) => (
                <div key={index} className='text-center group'>
                  <div className='relative w-14 h-14 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center mx-auto mb-3 shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden transition-shadow group-hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)]'>
                    <div className='absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-transparent to-transparent dark:from-white/10 pointer-events-none' />
                    <div className='absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]' />
                    <value.icon className='relative h-7 w-7 text-brand' />
                  </div>
                  <h3 className='text-lg font-semibold mb-1.5'>{value.title}</h3>
                  <p className='text-sm text-muted-foreground leading-relaxed'>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Founders Section */}
        <Section className='py-8 md:py-10'>
          <Container>
            <div className='text-center mb-8'>
              <Heading level={2} className='mb-3'>
                Nuestros{' '}
                <span className='font-serif italic bg-gradient-to-r from-brand via-blue-300 to-brand bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent'>
                  Fundadores
                </span>
              </Heading>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                Talentos complementarios que se unen para desarrollar los
                mejores proyectos adaptados a cada necesidad
              </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto'>
              {founders.map((founder, index) => (
                <div key={index} className='group'>
                  <div className='relative h-72 rounded-2xl overflow-hidden mb-4 bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]'>
                    <div className='absolute inset-0 z-10 rounded-2xl bg-gradient-to-b from-white/20 via-transparent to-transparent dark:from-white/10 pointer-events-none' />
                    <div className='absolute inset-0 z-10 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]' />
                    <Image
                      src={founder.image || '/placeholder.svg'}
                      alt={founder.name}
                      fill
                      priority
                      className='object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
                    <div className='absolute bottom-5 left-5 right-5 z-10'>
                      <h3 className='text-2xl font-bold text-white mb-1'>
                        {founder.name}
                      </h3>
                      <p className='text-brand font-medium'>{founder.role}</p>
                    </div>
                  </div>

                  <p className='text-sm text-muted-foreground leading-relaxed mb-4'>
                    {founder.description}
                  </p>

                  <div className='flex flex-wrap gap-2'>
                    {founder.expertise.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className='relative px-3 py-1.5 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-xl text-sm font-medium shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden'
                      >
                        <span className='absolute inset-0 rounded-full bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-white/10 pointer-events-none' />
                        <span className='relative'>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Combined Strengths */}
        <Section className='py-8 md:py-10'>
          <Container>
            <div className='max-w-4xl mx-auto'>
              <div className='text-center mb-8'>
                <div className='relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl text-brand mb-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden'>
                  <div className='absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-transparent to-transparent dark:from-white/10 pointer-events-none' />
                  <div className='absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]' />
                  <TrendingUp className='relative h-4 w-4' />
                  <span className='relative text-sm font-medium'>Talentos en Conjunto</span>
                </div>
                <p className='text-muted-foreground leading-relaxed'>
                  La combinación de experiencia en gestión de proyectos, dominio
                  técnico avanzado, arquitectura de software y diseño nos
                  permite ofrecer soluciones integrales.
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='relative text-center p-5 rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden'>
                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-white/10 pointer-events-none' />
                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]' />
                  <Brain className='relative h-10 w-10 text-brand mx-auto mb-3' />
                  <h3 className='relative font-semibold text-lg mb-1.5'>
                    Visión Estratégica
                  </h3>
                  <p className='relative text-sm text-muted-foreground'>
                    Entendimiento profundo de mercados y necesidades
                    empresariales
                  </p>
                </div>

                <div className='relative text-center p-5 rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden'>
                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-white/10 pointer-events-none' />
                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]' />
                  <Code2 className='relative h-10 w-10 text-brand mx-auto mb-3' />
                  <h3 className='relative font-semibold text-lg mb-1.5'>
                    Excelencia Técnica
                  </h3>
                  <p className='relative text-sm text-muted-foreground'>
                    Arquitectura sólida y código de la más alta calidad
                  </p>
                </div>

                <div className='relative text-center p-5 rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden'>
                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-white/10 pointer-events-none' />
                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]' />
                  <Lightbulb className='relative h-10 w-10 text-brand mx-auto mb-3' />
                  <h3 className='relative font-semibold text-lg mb-1.5'>
                    Innovación Constante
                  </h3>
                  <p className='relative text-sm text-muted-foreground'>
                    Dominio de IA y tecnologías emergentes aplicadas
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Constant Evolution Section */}
        <Section className='py-8 md:py-10'>
          <Container>
            <div className='max-w-4xl mx-auto'>
              <div className='text-center mb-8'>
                <div className='inline-flex items-center gap-2 mb-3'>
                  <div className='animate-spin-slow'>
                    <Search className='h-7 w-7 text-brand' />
                  </div>
                  <div className='animate-pulse'>
                    <Sparkles className='h-5 w-5 text-brand' />
                  </div>
                </div>
                <RotatingText />
                <p className='text-muted-foreground leading-relaxed'>
                  Estamos en constante exploración de nuevas tecnologías y
                  buscamos activamente nuevos talentos que compartan nuestra
                  visión.
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='relative p-6 rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden group hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-shadow'>
                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-white/10 pointer-events-none' />
                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]' />

                  <div className='relative w-12 h-12 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center mb-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden'>
                    <div className='absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-transparent to-transparent dark:from-white/10 pointer-events-none' />
                    <Rocket className='relative h-6 w-6 text-brand' />
                  </div>
                  <h3 className='relative text-lg font-semibold mb-2'>
                    Nuevas Tecnologías
                  </h3>
                  <p className='relative text-sm text-muted-foreground leading-relaxed'>
                    Investigamos y adoptamos las últimas innovaciones
                    tecnológicas para mantener a nuestros clientes a
                    la vanguardia del mercado.
                  </p>
                </div>

                <div className='relative p-6 rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden group hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-shadow'>
                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-white/10 pointer-events-none' />
                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]' />

                  <div className='relative w-12 h-12 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center mb-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden'>
                    <div className='absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-transparent to-transparent dark:from-white/10 pointer-events-none' />
                    <Users className='relative h-6 w-6 text-brand' />
                  </div>
                  <h3 className='relative text-lg font-semibold mb-2'>
                    Nuevos Talentos
                  </h3>
                  <p className='relative text-sm text-muted-foreground leading-relaxed'>
                    Buscamos profesionales apasionados que aporten perspectivas
                    frescas y habilidades complementarias para alcanzar
                    objetivos cada vez más ambiciosos.
                  </p>
                </div>
              </div>

              <div className='relative mt-6 p-6 rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] text-center overflow-hidden'>
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-white/10 pointer-events-none' />
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]' />
                <p className='relative text-lg font-medium text-foreground mb-1'>
                  Esta mentalidad de crecimiento continuo nos permite
                </p>
                <p className='relative text-sm text-muted-foreground leading-relaxed'>
                  Adaptarnos rápidamente a los cambios del mercado y entregar
                  soluciones que preparan el camino para el éxito a largo plazo.
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
