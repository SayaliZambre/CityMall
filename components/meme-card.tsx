"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown, Zap, Eye } from "lucide-react"
import { GlitchButton } from "@/components/glitch-button"
import type { Meme } from "@/types/meme"

interface MemeCardProps {
  meme: Meme
  onVote: (memeId: string, voteType: "up" | "down") => void
  onSelect: () => void
  isSelected: boolean
}

export function MemeCard({ meme, onVote, onSelect, isSelected }: MemeCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div
      className={`
      bg-black/60 border-2 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105
      ${isSelected ? "border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.3)]" : "border-green-400/30"}
    `}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-900">
        {!imageError ? (
          <img
            src={meme.image_url || "/placeholder.svg?height=200&width=300"}
            alt={meme.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-green-400/60">
            <div className="text-center">
              <Zap className="w-12 h-12 mx-auto mb-2" />
              <div className="text-sm">MEME_NOT_FOUND</div>
            </div>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Tags */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {meme.tags?.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-purple-500/80 text-white text-xs font-mono rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-green-400 mb-2 truncate">{meme.title}</h3>

        {/* AI Caption */}
        {meme.ai_caption && (
          <div className="mb-3 p-2 bg-purple-900/30 border border-purple-400/30 rounded">
            <div className="text-xs text-purple-400 mb-1">AI_CAPTION.EXE</div>
            <div className="text-sm text-purple-300 italic">"{meme.ai_caption}"</div>
          </div>
        )}

        {/* Vibe Analysis */}
        {meme.vibe_analysis && (
          <div className="mb-3 p-2 bg-pink-900/30 border border-pink-400/30 rounded">
            <div className="text-xs text-pink-400 mb-1">VIBE_SCAN.EXE</div>
            <div className="text-sm text-pink-300">{meme.vibe_analysis}</div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onVote(meme.id, "up")}
              className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm">{meme.upvotes || 0}</span>
            </button>

            <button
              onClick={() => onVote(meme.id, "down")}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
            >
              <ArrowDown className="w-4 h-4" />
              <span className="text-sm">{meme.downvotes || 0}</span>
            </button>
          </div>

          <div className="text-yellow-400 font-mono text-sm">{meme.current_bid || 0} CREDITS</div>
        </div>

        {/* Actions */}
        <GlitchButton
          onClick={onSelect}
          variant={isSelected ? "accent" : "secondary"}
          className="w-full flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          {isSelected ? "SELECTED" : "VIEW_DETAILS"}
        </GlitchButton>
      </div>
    </div>
  )
}
