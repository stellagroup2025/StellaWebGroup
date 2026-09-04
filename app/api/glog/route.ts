import { NextResponse } from "next/server"

// Endpoint temporal de diagnóstico móvil de la galería: recibe beacons del
// cliente y los vuelca a los logs de Vercel para poder depurar dispositivos
// (iPhone) sin acceso físico. Retirar cuando se cierre la incidencia.
export async function POST(request: Request) {
  try {
    const body = await request.text()
    console.log("[GLOG]", body.slice(0, 2000))
  } catch {
    // nunca fallar: es solo telemetría
  }
  return NextResponse.json({ ok: true })
}
