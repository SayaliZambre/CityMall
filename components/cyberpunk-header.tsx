"use client"

import { useState, useEffect } from "react"
import { Skull, Coins, Wifi } from "lucide-react"

interface CyberpunkHeaderProps {
  credits: number
}

export function CyberpunkHeader({ credits }: CyberpunkHeaderProps) {
  const [time, setTime] = useState(new Date())
  const [glitchText, setGlitchText] = useState("MEMEHUSTLE")

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
      const original = "MEMEHUSTLE"
      let glitched = ""

      for (let i = 0; i < original.length; i++) {
        if (Math.random() < 0.1) {
          glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)]
        } else {
          glitched += original[i]
        }
      }

      setGlitchText(glitched)

      setTimeout(() => setGlitchText("MEMEHUSTLE"), 100)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <header className="border-b border-green-400/30 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skull className="w-8 h-8 text-pink-500 animate-pulse" />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-pulse">
              {glitchText}
            </h1>
            <div className="hidden md:flex items-center gap-2 text-green-400/60 text-sm">
              <Wifi className="w-4 h-4" />
              <span>NEURAL_NET_ONLINE</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-green-400/10 border border-green-400/30 px-3 py-1 rounded">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{credits.toLocaleString()}</span>
              <span className="text-green-400/60 text-sm">CREDITS</span>
            </div>

            <div className="text-green-400/60 text-sm font-mono">{time.toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
