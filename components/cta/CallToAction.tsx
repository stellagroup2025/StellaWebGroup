"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "../ui/button"
import { Heading } from "../ui/Heading"
import { Magnetic } from "../animations/Magnetic"
import { ArrowRight, MessageSquare } from "lucide-react"

export function CallToAction() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Parallax for the content against the background
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [-50, 50])

    return (
        <section className="py-20 px-4 md:px-8">
            <div
                ref={containerRef}
                className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-[2.5rem] bg-zinc-950 dark:bg-black border border-white/10 shadow-2xl"
            >
                {/* --- Background Effects --- */}

                {/* 1. Aurora Gradients */}
                <div className="absolute inset-0 opacity-60">
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] rounded-full bg-brand blur-[100px] opacity-40 mix-blend-screen"
                    />
                    <motion.div
                        animate={{
                            rotate: [360, 0],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-purple-600 blur-[100px] opacity-30 mix-blend-screen"
                    />
                    <motion.div
                        animate={{
                            x: [-100, 100],
                            y: [-50, 50],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut"
                        }}
                        className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] rounded-full bg-blue-500 blur-[120px] opacity-30 mix-blend-screen"
                    />
                </div>

                {/* 2. Noise Texture (Cinematic Feel) */}
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                    style={{ opacity: 0.05 }}></div>

                {/* 3. Grid Overlay (Tech Feel) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                {/* --- Content --- */}
                <div className="relative z-10 p-12 md:p-24 flex flex-col items-center text-center">

                    <motion.div
                        style={{ y }}
                        className="flex flex-col items-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/80 mb-8"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium tracking-wide">Disponible para nuevos proyectos</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <Heading level={2} className="text-4xl md:text-6xl lg:text-7xl !font-bold text-white mb-6 tracking-tight">
                                ¿Listo para despegar?
                            </Heading>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed"
                        >
                            Transformamos ideas complejas en productos digitales que tus usuarios amarán. Hablemos de tu visión.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-12 items-center w-full sm:w-auto"
                        >
                            <Magnetic>
                                <Button
                                    size="lg"
                                    className="bg-white !text-black hover:bg-zinc-200 h-14 px-8 rounded-full text-base font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
                                    asChild
                                >
                                    <a href="/contacto" className="flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-black" />
                                        <span className="text-black">Empezar ahora</span>
                                    </a>
                                </Button>
                            </Magnetic>

                            <Magnetic>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="!bg-transparent border-white/20 !text-white hover:bg-white/10 hover:!text-white h-14 px-8 rounded-full text-base backdrop-blur-sm"
                                    asChild
                                >
                                    <a href="/proyectos" className="flex items-center gap-2">
                                        Ver nuestro trabajo
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </Button>
                            </Magnetic>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
