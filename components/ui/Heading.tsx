import { cn } from "../../lib/utils"
import type React from "react"

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
}

export function Heading({ level = 2, children, className }: HeadingProps) {
  const Tag = `h${level}` as React.ElementType

  const styles = {
    1: "text-4xl md:text-5xl lg:text-6xl font-bold",
    2: "text-3xl md:text-4xl lg:text-5xl font-bold",
    3: "text-2xl md:text-3xl font-semibold",
    4: "text-xl md:text-2xl font-semibold",
    5: "text-lg md:text-xl font-semibold",
    6: "text-base md:text-lg font-semibold",
  }

  return <Tag className={cn(styles[level], "text-balance", className)}>{children}</Tag>
}
