"use client"

import { useState } from "react"
import { X, Zap, TrendingUp } from "lucide-react"
import { GlitchButton } from "@/components/glitch-button"
import type { Meme } from "@/types/meme"

interface BiddingPanelProps {
  meme: Meme
  credits: number
  onBid: (memeId: string, amount: number) => void
  onClose: () => void
}

export function BiddingPanel({ meme, credits, onBid, onClose }: BiddingPanelProps) {
  const [bidAmount, setBidAmount] = useState(Math.max((meme.current_bid || 0) + 10, 10))

  const quickBids = [10, 50, 100, 250, 500]

  const handleBid = () => {
    if (bidAmount <= credits && bidAmount > (meme.current_bid || 0)) {
      onBid(meme.id, bidAmount)
    }
  }

  return (
    <div className="bg-black/80 border-2 border-pink-500 rounded-lg p-6 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-pink-400 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          BIDDING_TERMINAL
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Meme Preview */}
      <div className="mb-4 p-3 bg-gray-900/50 border border-gray-600 rounded">
        <div className="text-sm text-green-400 font-mono mb-1">TARGET: {meme.title}</div>
        <div className="text-xs text-gray-400">Owner: {meme.owner_id || "ANONYMOUS"}</div>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-green-900/30 border border-green-400/30 p-3 rounded">
          <div className="text-xs text-green-400 mb-1">CURRENT_BID</div>
          <div className="text-lg font-bold text-green-300">{meme.current_bid || 0}</div>
        </div>
        <div className="bg-purple-900/30 border border-purple-400/30 p-3 rounded">
          <div className="text-xs text-purple-400 mb-1">UPVOTES</div>
          <div className="text-lg font-bold text-purple-300">{meme.upvotes || 0}</div>
        </div>
      </div>

      {/* Bid Input */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">BID_AMOUNT</label>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(Number(e.target.value))}
          min={(meme.current_bid || 0) + 1}
          max={credits}
          className="w-full bg-black border border-green-400/30 text-green-400 p-2 rounded font-mono focus:border-green-400 focus:outline-none"
        />
      </div>

      {/* Quick Bid Buttons */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {quickBids.map((amount) => (
          <button
            key={amount}
            onClick={() => setBidAmount(Math.max(amount, (meme.current_bid || 0) + 1))}
            disabled={amount > credits}
            className="bg-gray-800 border border-gray-600 text-gray-300 p-2 rounded text-sm hover:border-green-400 hover:text-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +{amount}
          </button>
        ))}
      </div>

      {/* Bid Button */}
      <GlitchButton
        onClick={handleBid}
        variant="accent"
        disabled={bidAmount > credits || bidAmount <= (meme.current_bid || 0)}
        className="w-full mb-4"
      >
        <TrendingUp className="w-4 h-4 mr-2" />
        EXECUTE_BID
      </GlitchButton>

      {/* Credits Display */}
      <div className="text-center text-sm text-gray-400">
        Available: <span className="text-yellow-400 font-bold">{credits}</span> credits
      </div>
    </div>
  )
}
