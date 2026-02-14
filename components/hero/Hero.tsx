"use client"

import { useRef } from "react"
import { Button } from "../ui/button"
import { Container } from "../ui/Container"
import { ArrowRight, Sparkles } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Magnetic } from "../animations/Magnetic"
import { TextAssemble } from "../ui/TextAssemble"

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  // Refs for elements to animate
  const badgeRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()

      // 1. Entrance Animation (Fade Up)
      // We animate TO the visible state because elements start with invisible/opacity-0 classes
      // Removed titleRef from here as it is now handled by TextReveal (Framer Motion)
      tl.to([badgeRef.current, textRef.current, buttonsRef.current, statsRef.current], {
        y: 0,
        autoAlpha: 1, // handles visibility + opacity
        duration: 1.5, // Slower entrance
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      })

      // 2. Parallax Effect (ScrollTrigger)
      // "Airy" feel: Elements move at different speeds relative to scroll

      // Title moves slightly faster than scroll (feels closer/floaty)
      // titleRef parallax is removed as TextReveal handles its own animation
      // gsap.to(titleRef.current, {
      //   y: -300, // Increased from -100 to make specific effect obvious
      //   ease: "none",
      //   scrollTrigger: {
      //     trigger: containerRef.current,
      //     start: "top top",
      //     end: "bottom top",
      //     scrub: true,
      //   },
      // })


    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-24">
      {/* Background overlay - single layer to avoid scroll artifacts */}
      <div className="absolute inset-0 bg-background/30 will-change-transform" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          <div ref={badgeRef} className="invisible opacity-0 translate-y-4">
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/60 dark:border-white/15 text-brand mb-6 shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">
              {/* Glass light reflection */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />
              <Sparkles className="relative h-4 w-4" />
              <span className="relative text-sm font-medium">Soluciones tecnológicas de alto impacto</span>
            </div>
          </div>


          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight"
          >

            {/* 1. Base Text - Sci-Fi Swarm Assembly */}
            <TextAssemble text="Construimos software que" />{" "}

            {/* 2. Gradient Text */}
            <TextAssemble
              text="impulsa tu negocio"
              gradient={true}
              stagger={0.2}
            />
          </h1>

          <p
            ref={textRef}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty invisible opacity-0 translate-y-4"
          >
            Desarrollamos aplicaciones web, integraciones y automatizaciones que transforman ideas en resultados
            medibles
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-12 justify-center invisible opacity-0 translate-y-4"
          >
            <Magnetic>
              <Button size="lg" asChild className="relative rounded-full h-14 px-8 !bg-black/70 dark:!bg-white/10 backdrop-blur-xl !text-white border-0 hover:!bg-black/80 dark:hover:!bg-white/15 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)] text-base font-semibold">
                <a href="/contacto" className="flex items-center gap-2">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none translate-x-[-20%]" />
                  <span className="relative">Hablar con nosotros</span>
                  <ArrowRight className="relative ml-1 h-4 w-4" />
                </a>
              </Button>
            </Magnetic>

            <Magnetic>
              <Button size="lg" variant="outline" asChild className="relative rounded-full h-14 px-8 !bg-white/90 dark:!bg-white/10 backdrop-blur-xl border-0 !text-zinc-900 dark:!text-white hover:!bg-white/95 dark:hover:!bg-white/15 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.08),0_8px_32px_rgba(0,0,0,0.06)] text-base font-semibold">
                <a href="/proyectos" className="flex items-center gap-2">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/95 via-white/40 to-transparent dark:from-white/10 dark:via-transparent pointer-events-none" />
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />
                  <span className="relative">Ver casos de éxito</span>
                </a>
              </Button>
            </Magnetic>
          </div>

          <div
            ref={statsRef}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto invisible opacity-0 translate-y-4"
          >
            {[
              { value: "50+", label: "Proyectos entregados" },
              { value: "98%", label: "Satisfacción cliente" },
              { value: "24/7", label: "Soporte técnico" },
              { value: "5 años", label: "De experiencia" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/60 dark:border-white/15 flex items-center justify-center mb-3 shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />
                  <span className="relative text-2xl font-bold text-brand">{stat.value}</span>
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
