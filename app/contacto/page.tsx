"use client"
import { useState } from "react"
import { Navbar } from "../../components/layout/Navbar"
import { Footer } from "../../components/layout/Footer"
import { Container } from "../../components/ui/Container"
import { Section } from "../../components/ui/Section"
import { Heading } from "../../components/ui/Heading"
import { ContactForm } from "../../components/forms/ContactForm"
import { Mail, Phone, MapPin, Sparkles } from "lucide-react"
import { siteConfig } from "../../config/site"
import Image from "next/image"

export default function ContactoPage() {
  const [isFormActive, setIsFormActive] = useState(false)

  const handleFormActiveChange = (active: boolean) => {
    setIsFormActive(active)
  }

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen">
        {/* Background Image - Contact */}
        <div
          className={`fixed inset-0 transition-opacity duration-[1200ms] ${
            isFormActive ? "opacity-0 z-0" : "opacity-100 z-[1]"
          }`}
        >
          <Image
            src="/contact-background-inviting.jpg"
            alt="Contact background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/60" />
        </div>

        {/* Background Image - Email Sending */}
        <div
          className={`fixed inset-0 transition-opacity duration-[1200ms] ${
            isFormActive ? "opacity-100 z-[1]" : "opacity-0 z-0"
          }`}
        >
          <Image src="/email-sending-background.jpg" alt="Email sending background" fill className="object-cover" />
          <div className="absolute inset-0 bg-background/60" />
        </div>

        {/* Content */}
        <main className="relative z-10">
          <Section className="pt-20 pb-8">
            <Container>
              <div className="max-w-3xl mx-auto text-center mb-8">
                <div className="flex items-center gap-4 justify-center mb-5">
                  <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-border" />
                  <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl text-brand shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />
                    <Sparkles className="relative h-4 w-4" />
                    <span className="relative text-sm font-medium">Contacto</span>
                  </div>
                  <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-border" />
                </div>
                <Heading level={1} className="mb-3">
                  Hablemos de tu{" "}
                  <span className="font-serif italic bg-gradient-to-r from-brand via-blue-300 to-brand bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent">
                    proyecto
                  </span>
                </Heading>
                <p className="text-lg text-muted-foreground">
                  Cuéntanos tu idea y te responderemos en menos de 24 horas
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                {/* Contact Info - fades out and slides left */}
                <div
                  className={`transition-all duration-[1200ms] ease-in-out ${
                    isFormActive ? "opacity-0 -translate-x-8 pointer-events-none" : "opacity-100 translate-x-0"
                  }`}
                >
                  <Heading level={3} className="mb-5">
                    Información de contacto
                  </Heading>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="relative w-12 h-12 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center flex-shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />
                        <Mail className="relative h-5 w-5 text-brand" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Email</p>
                        <a
                          href={`mailto:${siteConfig.contact.email}`}
                          className="text-muted-foreground hover:text-brand transition-colors"
                        >
                          {siteConfig.contact.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="relative w-12 h-12 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center flex-shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />
                        <Phone className="relative h-5 w-5 text-brand" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Teléfono</p>
                        <a
                          href={`tel:${siteConfig.contact.phone}`}
                          className="text-muted-foreground hover:text-brand transition-colors"
                        >
                          {siteConfig.contact.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="relative w-12 h-12 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center flex-shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />
                        <MapPin className="relative h-5 w-5 text-brand" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Ubicación</p>
                        <p className="text-muted-foreground">Madrid, España</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-6 p-4 rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />
                    <p className="relative text-sm text-muted-foreground">
                      <strong>Horario de atención:</strong>
                      <br />
                      Lunes a Viernes: 9:00 - 18:00
                      <br />
                      Respuesta en menos de 24 horas
                    </p>
                  </div>
                </div>

                {/* Form - moves to center and scales up */}
                <div
                  className={`transition-all duration-[1200ms] ease-in-out ${
                    isFormActive ? "lg:-translate-x-[calc(50%+1rem)] lg:scale-110" : "translate-x-0 scale-100"
                  }`}
                >
                  <ContactForm onFormActiveChange={handleFormActiveChange} />
                </div>
              </div>
            </Container>
          </Section>
        </main>
      </div>
      <div className="relative z-10 bg-background/90">
        <Footer />
      </div>
    </>
  )
}
