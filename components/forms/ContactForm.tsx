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

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
    }

    try {
      // TODO: Implementar endpoint real en /api/contact/route.ts
      // Por ahora simulamos el envío
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("[v0] Form data:", data)
      setIsSuccess(true)

      // Reset form
      e.currentTarget.reset()
      setFormValues({ name: "", email: "", company: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err) {
      setError("Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
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
            className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
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
          className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
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
          className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm"
          placeholder="Cuéntanos sobre tu proyecto..."
        />
      </div>

      {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

      {isSuccess && (
        <div className="p-3 rounded-lg bg-brand/10 text-brand text-sm flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          ¡Mensaje enviado! Te responderemos pronto.
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar mensaje"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Al enviar este formulario, aceptas nuestra política de privacidad
      </p>
    </form>
  )
}
