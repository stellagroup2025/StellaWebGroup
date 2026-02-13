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
  const titleRef = useRef<HTMLHeadingElement>(null)
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

      // Text moves a bit slower than title
      gsap.to(textRef.current, {
        y: -150, // Increased from -50
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      // Buttons stay more grounded or move oppositely slightly for contrast
      gsap.to(buttonsRef.current, {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center">
      {/* Background gradients (kept from original) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-background/40 to-background/30" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          <div ref={badgeRef} className="invisible opacity-0 translate-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Soluciones tecnológicas de alto impacto</span>
            </div>
          </div>


          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight"
          >

            {/* 1. Base Text - Sci-Fi Swarm Assembly */}
            <TextAssemble text="Construimos software que" delay={2.5} />{" "}

            {/* 2. Gradient Text */}
            <TextAssemble
              text="impulsa tu negocio"
              gradient={true}
              delay={2.7}
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
              <Button size="lg" asChild>
                <a href="/contacto">
                  Hablar con nosotros
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </Magnetic>

            <Magnetic>
              <Button size="lg" variant="outline" asChild>
                <a href="/proyectos">Ver casos de éxito</a>
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
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-brand mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
