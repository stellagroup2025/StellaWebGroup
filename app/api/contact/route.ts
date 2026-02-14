import { NextResponse } from "next/server"
import { contactFormSchema } from "../../../lib/validators"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate data
    contactFormSchema.parse(body)

    // TODO: Implementar envío de email real
    // await sendContactEmail(validatedData)

    return NextResponse.json({ success: true, message: "Mensaje enviado correctamente" }, { status: 200 })
  } catch {

    return NextResponse.json({ success: false, message: "Error al enviar el mensaje" }, { status: 500 })
  }
}
