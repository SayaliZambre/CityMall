"use client"

import { useState, useEffect } from "react"
import { MemeCard } from "@/components/meme-card"
import { BiddingPanel } from "@/components/bidding-panel"
import type { Meme } from "@/types/meme"

interface MemeGalleryProps {
  credits: number
  setCredits: (credits: number) => void
}

export function MemeGallery({ credits, setCredits }: MemeGalleryProps) {
  const [memes, setMemes] = useState<Meme[]>([])
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMemes()
  }, [])

  const fetchMemes = async () => {
    try {
      const response = await fetch("/api/memes")
      const data = await response.json()
      setMemes(data)
    } catch (error) {
      console.error("Failed to fetch memes:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (memeId: string, voteType: "up" | "down") => {
    try {
      const response = await fetch(`/api/memes/${memeId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voteType, userId: "user1" }),
      })

      if (response.ok) {
        fetchMemes() // Refresh memes
      }
    } catch (error) {
      console.error("Failed to vote:", error)
    }
  }

  const handleBid = async (memeId: string, amount: number) => {
    if (amount > credits) return

    try {
      const response = await fetch(`/api/memes/${memeId}/bid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, userId: "user1" }),
      })

      if (response.ok) {
        setCredits(credits - amount)
        fetchMemes()
      }
    } catch (error) {
      console.error("Failed to bid:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-green-400 font-mono animate-pulse">LOADING MEMES FROM THE MATRIX...</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {memes.map((meme) => (
            <MemeCard
              key={meme.id}
              meme={meme}
              onVote={handleVote}
              onSelect={() => setSelectedMeme(meme)}
              isSelected={selectedMeme?.id === meme.id}
            />
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        {selectedMeme && (
          <BiddingPanel meme={selectedMeme} credits={credits} onBid={handleBid} onClose={() => setSelectedMeme(null)} />
        )}
      </div>
    </div>
  )
}
