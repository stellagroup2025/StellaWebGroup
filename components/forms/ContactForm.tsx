"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Loader2, CheckCircle2 } from "lucide-react"

interface ContactFormProps {
  onFormActiveChange?: (isActive: boolean) => void
}

export function ContactForm({ onFormActiveChange }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  useEffect(() => {
    const hasContent = Object.values(formValues).some((value) => value.trim() !== "")
    onFormActiveChange?.(hasContent)
  }, [formValues, onFormActiveChange])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // TODO: Implementar endpoint real en /api/contact/route.ts
      // Por ahora simulamos el envío
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSuccess(true)

      // Reset form
      e.currentTarget.reset()
      setFormValues({ name: "", email: "", company: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch {
      setError("Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = "w-full px-4 py-2.5 rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] focus:outline-none focus:shadow-[0_2px_16px_rgba(0,0,0,0.1)] transition-shadow text-sm placeholder:text-muted-foreground/60"

  return (
    <div className="relative p-6 rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />

      <form onSubmit={handleSubmit} className="relative space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5">
              Nombre completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formValues.name}
              onChange={handleInputChange}
              className={inputClasses}
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formValues.email}
              onChange={handleInputChange}
              className={inputClasses}
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1.5">
            Empresa
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formValues.company}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="Nombre de tu empresa"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1.5">
            Mensaje *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={3}
            value={formValues.message}
            onChange={handleInputChange}
            className={`${inputClasses} resize-none`}
            placeholder="Cuéntanos sobre tu proyecto..."
          />
        </div>

        {error && (
          <div className="relative p-3 rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur-xl text-destructive text-sm shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
            <span className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
            <span className="relative">{error}</span>
          </div>
        )}

        {isSuccess && (
          <div className="relative p-3 rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur-xl text-brand text-sm flex items-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
            <span className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
            <CheckCircle2 className="relative h-4 w-4" />
            <span className="relative">¡Mensaje enviado! Te responderemos pronto.</span>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          className="relative w-full rounded-full h-12 !bg-black/70 dark:!bg-white/10 backdrop-blur-xl !text-white border-0 hover:!bg-black/80 dark:hover:!bg-white/15 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)] font-semibold"
          disabled={isSubmitting}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none" />
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none translate-x-[-20%]" />
          {isSubmitting ? (
            <span className="relative flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </span>
          ) : (
            <span className="relative">Enviar mensaje</span>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Al enviar este formulario, aceptas nuestra política de privacidad
        </p>
      </form>
    </div>
  )
}
