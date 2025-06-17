"use client"

import { useState, useEffect } from "react"
import { Trophy, TrendingUp, Zap } from "lucide-react"
import type { Meme } from "@/types/meme"

export function Leaderboard() {
  const [topMemes, setTopMemes] = useState<Meme[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("/api/leaderboard?top=10")
      const data = await response.json()
      setTopMemes(data)
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-green-400 font-mono animate-pulse">CALCULATING MEME RANKINGS...</div>
      </div>
    )
  }

  return (
    <div className="bg-black/60 border-2 border-purple-400 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6" />
        NEURAL_LEADERBOARD.EXE
      </h2>

      <div className="space-y-4">
        {topMemes.map((meme, index) => (
          <div
            key={meme.id}
            className={`
              flex items-center gap-4 p-4 rounded border-2 transition-all duration-300
              ${
                index === 0
                  ? "border-yellow-400 bg-yellow-400/10"
                  : index === 1
                    ? "border-gray-300 bg-gray-300/10"
                    : index === 2
                      ? "border-orange-400 bg-orange-400/10"
                      : "border-gray-600 bg-gray-600/10"
              }
            `}
          >
            {/* Rank */}
            <div
              className={`
              w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
              ${
                index === 0
                  ? "bg-yellow-400 text-black"
                  : index === 1
                    ? "bg-gray-300 text-black"
                    : index === 2
                      ? "bg-orange-400 text-black"
                      : "bg-gray-600 text-white"
              }
            `}
            >
              {index + 1}
            </div>

            {/* Meme Info */}
            <div className="flex-1">
              <h3 className="font-bold text-green-400 mb-1">{meme.title}</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-green-300">
                  <TrendingUp className="w-4 h-4" />
                  {meme.upvotes || 0} upvotes
                </div>
                <div className="flex items-center gap-1 text-yellow-300">
                  <Zap className="w-4 h-4" />
                  {meme.current_bid || 0} credits
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {meme.tags?.slice(0, 2).map((tag, tagIndex) => (
                <span key={tagIndex} className="px-2 py-1 bg-purple-500/30 text-purple-300 text-xs rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
