"use client"

import dynamic from "next/dynamic"

const HeroAnimation = dynamic(
    () => import("./HeroAnimation").then(mod => mod.HeroAnimation),
    { ssr: false }
)

export function HeroAnimationLazy() {
    return <HeroAnimation />
}
