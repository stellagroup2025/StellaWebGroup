import Link from "next/link"
import { Container } from "../ui/Container"
import { siteConfig } from "../../config/site"
import { Linkedin, Twitter, Github, Mail } from "lucide-react"
import Image from "next/image"

const footerLinks = {
  empresa: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Servicios", href: "/servicios" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Contacto", href: "/contacto" },
  ],
  servicios: [
    { label: "Desarrollo Web", href: "/servicios#desarrollo" },
    { label: "Integraciones", href: "/servicios#integraciones" },
    { label: "Automatizaciones", href: "/servicios#automatizaciones" },
    { label: "IA Aplicada", href: "/servicios#ia" },
  ],
  legal: [
    { label: "Privacidad", href: "/privacidad" },
    { label: "Términos", href: "/terminos" },
    { label: "Cookies", href: "/cookies" },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: siteConfig.links.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: siteConfig.links.twitter, label: "Twitter" },
  { icon: Github, href: siteConfig.links.github, label: "GitHub" },
  { icon: Mail, href: `mailto:${siteConfig.contact.email}`, label: "Email" },
]

export function Footer() {
  return (
    <footer className="relative z-50 bg-background/80 backdrop-blur-lg">
      {/* Glass top edge - replaces border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 text-center md:text-left">
            <div className="flex items-center space-x-2 mb-4 justify-center md:justify-start">
              <div className="w-8 h-8 relative">
                <Image src="/logo.png" alt={siteConfig.alias} fill className="object-contain" />
              </div>
              <span className="font-bold text-lg">{siteConfig.alias}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto md:mx-0">{siteConfig.description}</p>
            <div className="flex gap-3 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-9 h-9 rounded-lg bg-white/70 dark:bg-white/[0.05] backdrop-blur-xl overflow-hidden hover:bg-white/80 dark:hover:bg-white/10 transition-all flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {footerLinks.servicios.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Glass separator - replaces border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 dark:via-white/8 to-transparent" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground">Hecho con ❤️ en España</p>
        </div>
      </Container>
    </footer>
  )
}
