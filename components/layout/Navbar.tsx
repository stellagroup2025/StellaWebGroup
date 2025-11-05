"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Container } from "../ui/Container"
import { Button } from "../ui/button"
import { siteConfig } from "../../config/site"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 z-[100] w-full">
      <div
        className={`transition-all duration-300 md:mx-auto md:mt-2.5 md:max-w-5xl md:rounded-full ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border border-border shadow-lg md:shadow-xl"
            : "bg-background/60 backdrop-blur-md border border-border/50 md:border-border"
        }`}
      >
        <Container className="md:px-6">
          <nav className="flex items-center justify-between h-20 md:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-20 h-20 md:w-[92px] md:h-[92px] relative">
                <Image src="/logo.png" alt={siteConfig.alias} fill className="object-contain" priority />
              </div>
              <span className="font-bold text-xl md:text-lg hidden sm:inline-block">{siteConfig.alias}</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? "text-brand bg-brand/10 scale-110"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted hover:scale-110"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <Button size="sm" className="hidden md:inline-flex rounded-full" asChild>
                <Link href="/contacto">Contactar</Link>
              </Button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-muted"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </Container>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg"
          >
            <Container>
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? "text-brand bg-brand/10 scale-110"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted hover:scale-110"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button className="w-full mt-4" asChild>
                  <Link href="/contacto">Contactar</Link>
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
