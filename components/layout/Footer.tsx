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
    <footer className="border-t border-border bg-secondary">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 relative">
                <Image src="/logo.png" alt={siteConfig.alias} fill className="object-contain" />
              </div>
              <span className="font-bold text-lg">{siteConfig.alias}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">{siteConfig.description}</p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-md bg-muted hover:bg-brand hover:text-brand-foreground transition-colors flex items-center justify-center"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
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

          <div>
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

          <div>
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

        <div className="border-t border-border py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground">Hecho con ❤️ en España</p>
        </div>
      </Container>
    </footer>
  )
}
