import Link from "next/link"
import { Button } from "../components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center max-w-md px-4">
        <h2 className="text-6xl font-bold text-brand">404</h2>
        <p className="text-xl font-semibold">Página no encontrada</p>
        <p className="text-muted-foreground">
          La página que buscas no existe o ha sido movida.
        </p>
        <Button asChild>
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  )
}
