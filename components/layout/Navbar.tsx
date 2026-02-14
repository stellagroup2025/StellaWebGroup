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
        className={`relative z-10 transition-all duration-300 md:mx-auto md:mt-2.5 md:max-w-5xl md:rounded-full overflow-hidden ${
          isScrolled
            ? "bg-white/70 dark:bg-black/60 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
            : "bg-white/50 dark:bg-black/40 backdrop-blur-lg shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
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
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 overflow-hidden ${
                    pathname === item.href
                      ? "text-brand bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-white/[0.06]"
                  }`}
                >
                  {pathname === item.href && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/5 pointer-events-none translate-x-[-20%]" />
                    </>
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <Button size="sm" className="relative hidden md:inline-flex rounded-full !bg-black/70 dark:!bg-white/10 backdrop-blur-xl !text-white border-0 hover:!bg-black/80 dark:hover:!bg-white/15 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.15)] font-semibold" asChild>
                <Link href="/contacto">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none translate-x-[-20%]" />
                  <span className="relative">Contactar</span>
                </Link>
              </Button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-white/50 dark:hover:bg-white/[0.06] transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </Container>
      </div>

      {/* Mobile Menu - Fullscreen glass overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-2xl"
          >
            {/* Glass reflections */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent dark:from-white/5 pointer-events-none" />

            <div className="relative flex flex-col items-center justify-center h-full gap-1 pb-20">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-8 py-3.5 rounded-full text-xl font-medium transition-all ${
                      pathname === item.href
                        ? "text-brand bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                        : "text-muted-foreground active:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
                className="mt-6 w-full px-12"
              >
                <Button size="lg" asChild className="relative w-full rounded-full h-14 px-8 !bg-black/70 dark:!bg-white/10 backdrop-blur-xl !text-white border-0 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)] text-base font-semibold">
                  <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2">
                    <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none translate-x-[-20%]" />
                    <span className="relative">Contactar</span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
