import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galería Landings',
  description: 'Galería de landing pages y plantillas de Stella Studio',
}

// La galería es un sitio estático autónomo (public/galeria) con su propio diseño,
// fuentes y scripts. Se incrusta a pantalla completa para exponerla como una ruta
// más de la web sin reescribir su HTML.
export default function GaleriaLandingsPage() {
  return (
    <iframe
      src="/galeria/index.html"
      title="Galería de Landings"
      allow="autoplay; fullscreen; picture-in-picture"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 'none',
      }}
    />
  )
}
