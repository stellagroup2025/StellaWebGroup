"use client"
import { useState } from "react"
import { Navbar } from "../../components/layout/Navbar"
import { Footer } from "../../components/layout/Footer"
import { Container } from "../../components/ui/Container"
import { Section } from "../../components/ui/Section"
import { Heading } from "../../components/ui/Heading"
import { Badge } from "../../components/ui/badge"
import { ContactForm } from "../../components/forms/ContactForm"
import { Mail, Phone, MapPin } from "lucide-react"
import { siteConfig } from "../../config/site"
import Image from "next/image"

export default function ContactoPage() {
  const [isFormActive, setIsFormActive] = useState(false)

  const handleFormActiveChange = (active: boolean) => {
    console.log("[v0] Form active state changed:", active)
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
              <div className="max-w-3xl mx-auto text-center">
                <Badge className="mb-4">Contacto</Badge>
                <Heading level={1} className="mb-4">
                  Hablemos de tu proyecto
                </Heading>
                <p className="text-lg text-muted-foreground">
                  Cuéntanos tu idea y te responderemos en menos de 24 horas
                </p>
              </div>
            </Container>
          </Section>

          <Section className="py-12">
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                {/* Contact Info - fades out and slides left */}
                <div
                  className={`transition-all duration-[1200ms] ease-in-out ${
                    isFormActive ? "opacity-0 -translate-x-8 pointer-events-none" : "opacity-100 translate-x-0"
                  }`}
                >
                  <Heading level={3} className="mb-6">
                    Información de contacto
                  </Heading>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-brand" />
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
                      <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-brand" />
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
                      <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-brand" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Ubicación</p>
                        <p className="text-muted-foreground">Madrid, España</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-muted/50 backdrop-blur-sm">
                    <p className="text-sm text-muted-foreground">
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
