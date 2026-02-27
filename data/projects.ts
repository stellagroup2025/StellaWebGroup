export const projects = [
  {
    title: "Plataforma de Gestión Logística",
    sector: "Logística y Distribución",
    image: "/logistics-dashboard.png",
    problem: "Empresa con procesos manuales y errores frecuentes en gestión de rutas y stock",
    solution:
      "Plataforma web centralizada con automatización de pedidos, control de inventario en tiempo real e integración con ERP",
    technologies: ["React", "Node.js", "API REST", "SQL"],
    metrics: [
      { label: "eficiencia operativa", value: "↑37%" },
      { label: "costes logísticos", value: "↓28%" },
    ],
    slug: "plataforma-logistica",
  },
  {
    title: "Qronnect — Fidelización Digital",
    sector: "Retail / Comercio Físico",
    image: "/fashion-ecommerce.png",
    problem: "Comercios con baja recurrencia y sin sistema digital de fidelización",
    solution:
      "Plataforma QR para captación, recompensas y análisis de comportamiento del cliente",
    technologies: ["Next.js", "Backend personalizado", "Métricas en tiempo real"],
    metrics: [
      { label: "recurrencia", value: "↑58%" },
      { label: "retención", value: "↑44%" },
    ],
    slug: "qronnect-fidelizacion",
    externalUrl: "https://www.qronnect.es/",
  },
  {
    title: "Portal Educativo Interactivo",
    sector: "Educación",
    image: "/education-platform.png",
    problem: "Centro educativo con baja interacción digital y contenidos dispersos",
    solution:
      "Portal interactivo con seguimiento de progreso, gamificación y panel de administración",
    technologies: ["React", "Dashboard personalizado", "Integración multimedia"],
    metrics: [
      { label: "engagement", value: "↑52%" },
      { label: "retención de alumnos", value: "↑41%" },
    ],
    slug: "portal-educativo",
  },
  {
    title: "Gestor de Redes Sociales Multi-Cuenta",
    sector: "SaaS / Herramientas de Productividad",
    image: "/social-media-manager.jpg",
    problem: "Community managers gestionando múltiples cuentas sin herramienta centralizada",
    solution:
      "Plataforma centralizada para gestión multi-cuenta, automatización de respuestas y análisis de métricas en tiempo real",
    technologies: ["API Integrations", "Sistema de colas", "Base de datos escalable"],
    metrics: [
      { label: "productividad", value: "↑68%" },
      { label: "engagement gestionado", value: "↑54%" },
    ],
    slug: "gestor-redes-sociales",
  },
  {
    title: "Sistema de Huella Digital para PYMEs",
    sector: "Transformación Digital",
    image: "/digital-footprint.jpg",
    problem: "PYMEs sin presencia digital estructurada ni estrategia de captación online",
    solution:
      "Solución integral para establecer y optimizar la presencia digital en múltiples canales con generación de leads automatizada",
    technologies: ["Next.js", "SEO técnico", "Analytics avanzado"],
    metrics: [
      { label: "visibilidad online", value: "↑73%" },
      { label: "leads generados", value: "↑49%" },
    ],
    slug: "huella-digital-pymes",
  },
  {
    title: "Plataforma de Creación Web Adaptativa",
    sector: "Desarrollo Web",
    image: "/website-builder.jpg",
    problem: "Empresas dependientes de procesos lentos y costosos para crear y mantener sitios web",
    solution:
      "Sistema flexible de creación web que se adapta a grandes empresas y PYMEs, con funcionalidades escalables según necesidades",
    technologies: ["React", "CMS headless", "Deploy automatizado"],
    metrics: [
      { label: "tiempo desarrollo", value: "↓65%" },
      { label: "satisfacción cliente", value: "↑91%" },
    ],
    slug: "creacion-web-adaptativa",
  },
]
