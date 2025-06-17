"use client"

import { useState, useEffect } from "react"

export function TerminalEffect() {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  const fullText = `> INITIALIZING MEMEHUSTLE NEURAL NETWORK...
> LOADING CYBERPUNK PROTOCOLS...
> AI CAPTION GENERATOR: ONLINE
> MEME MARKETPLACE: ACTIVE
> WELCOME TO THE NEON UNDERGROUND`

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, fullText])

  return (
    <div className="bg-black/60 border border-green-400/30 p-4 rounded font-mono text-green-400 mb-8">
      <div className="whitespace-pre-line">
        {displayText}
        <span className="animate-pulse">█</span>
      </div>
    </div>
  )
}
