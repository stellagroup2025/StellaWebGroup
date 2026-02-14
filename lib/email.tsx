/**
 * Email Service Configuration
 *
 * TODO: Implementar servicio de email real
 *
 * Opciones recomendadas:
 * 1. Resend (https://resend.com) - Fácil integración con Next.js
 * 2. SendGrid - Robusto y escalable
 * 3. Postmark - Excelente deliverability
 *
 * Ejemplo con Resend:
 *
 * import { Resend } from 'resend'
 *
 * const resend = new Resend(process.env.RESEND_API_KEY)
 *
 * export async function sendContactEmail(data: ContactFormData) {
 *   await resend.emails.send({
 *     from: 'contacto@tuempresa.com',
 *     to: 'info@tuempresa.com',
 *     subject: `Nuevo contacto de ${data.name}`,
 *     html: `
 *       <h2>Nuevo mensaje de contacto</h2>
 *       <p><strong>Nombre:</strong> ${data.name}</p>
 *       <p><strong>Email:</strong> ${data.email}</p>
 *       <p><strong>Empresa:</strong> ${data.company || 'No especificada'}</p>
 *       <p><strong>Mensaje:</strong></p>
 *       <p>${data.message}</p>
 *     `
 *   })
 * }
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function sendContactEmail(data: Record<string, unknown>) {
  // TODO: Implementar envío real (ver comentario arriba)
  return { success: true }
}
