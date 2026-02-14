"use client"

import { Button } from "../components/ui/button"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center max-w-md px-4">
        <h2 className="text-2xl font-bold">Algo salió mal</h2>
        <p className="text-muted-foreground">
          Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
        </p>
        <Button onClick={reset}>Intentar de nuevo</Button>
      </div>
    </div>
  )
}
