"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlitchButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "accent"
  className?: string
  disabled?: boolean
}

export function GlitchButton({
  children,
  onClick,
  variant = "primary",
  className,
  disabled = false,
}: GlitchButtonProps) {
  const baseClasses =
    "relative px-4 py-2 font-mono font-bold uppercase tracking-wider transition-all duration-200 border-2 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"

  const variantClasses = {
    primary:
      "border-green-400 text-green-400 hover:bg-green-400 hover:text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]",
    secondary:
      "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]",
    accent:
      "border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-black hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]",
  }

  return (
    <button onClick={onClick} disabled={disabled} className={cn(baseClasses, variantClasses[variant], className)}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </button>
  )
}
