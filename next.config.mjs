/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  async rewrites() {
    return [
      // La galería se sirve como documento de nivel superior (sin iframe) para
      // que el scroll, las animaciones de las cards y el autoplay de vídeo
      // funcionen bien en móvil (iOS rompe el scroll dentro de iframes).
      { source: "/galeriaLandings", destination: "/galeria/index.html" },
      { source: "/galeria", destination: "/galeria/index.html" },
    ]
  },
  async headers() {
    return [
      {
        // La galería usa iframes del mismo origen (viewer.html), por eso SAMEORIGIN.
        source: "/galeria/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/((?!galeria/).*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
}

export default nextConfig
