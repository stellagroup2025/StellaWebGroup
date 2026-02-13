"use client"

import { useMemo } from "react"

import { motion } from "framer-motion"
import { TestimonialCard } from "../cards/TestimonialCard"
import { type Testimonial } from "../../data/testimonials" // Will fix by exporting type soon

interface TestimonialGridProps {
    testimonials: {
        quote: string
        author: string
        role: string
        company: string
    }[]
}

const FloatingCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
    // Memoize random values so they don't change on re-renders
    const randomDuration = useMemo(() => 3 + Math.random() * 2, [])
    const randomDelay = useMemo(() => Math.random() * 2, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: "easeOut"
            }}
        >
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                    duration: randomDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: randomDelay
                }}
                style={{ willChange: "transform" }} // GPU Hint
            >
                {children}
            </motion.div>
        </motion.div>
    )
}

export function TestimonialGrid({ testimonials }: TestimonialGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
                <FloatingCard key={index} index={index}>
                    <TestimonialCard
                        quote={testimonial.quote}
                        author={testimonial.author}
                        role={testimonial.role}
                        company={testimonial.company}
                    />
                </FloatingCard>
            ))}
        </div>
    )
}
