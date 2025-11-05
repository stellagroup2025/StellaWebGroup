import { NextResponse } from "next/server"
import { contactFormSchema } from "../../../lib/validators"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate data
    const validatedData = contactFormSchema.parse(body)

    // TODO: Implementar envío de email real
    // await sendContactEmail(validatedData)

    console.log("[v0] Contact form submission:", validatedData)

    return NextResponse.json({ success: true, message: "Mensaje enviado correctamente" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Contact form error:", error)

    return NextResponse.json({ success: false, message: "Error al enviar el mensaje" }, { status: 500 })
  }
}
