"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload, Sparkles } from "lucide-react"
import { GlitchButton } from "@/components/glitch-button"

interface CreateMemeModalProps {
  onClose: () => void
  onMemeCreated: () => void
}

export function CreateMemeModal({ onClose, onMemeCreated }: CreateMemeModalProps) {
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [tags, setTags] = useState("")
  const [loading, setLoading] = useState(false)
  const [generatingAI, setGeneratingAI] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/memes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          image_url: imageUrl,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          owner_id: "user1",
        }),
      })

      if (response.ok) {
        onMemeCreated()
      }
    } catch (error) {
      console.error("Failed to create meme:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateAIContent = async () => {
    if (!tags) return

    setGeneratingAI(true)
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags: tags.split(",").map((tag) => tag.trim()) }),
      })

      const data = await response.json()
      // This would update the meme with AI content after creation
    } catch (error) {
      console.error("Failed to generate AI content:", error)
    } finally {
      setGeneratingAI(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border-2 border-green-400 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-green-400 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            CREATE_MEME.EXE
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">MEME_TITLE</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-black border border-green-400/30 text-green-400 p-2 rounded font-mono focus:border-green-400 focus:outline-none"
              placeholder="Enter meme title..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">IMAGE_URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-black border border-green-400/30 text-green-400 p-2 rounded font-mono focus:border-green-400 focus:outline-none"
              placeholder="https://example.com/meme.jpg"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">TAGS (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-black border border-green-400/30 text-green-400 p-2 rounded font-mono focus:border-green-400 focus:outline-none"
              placeholder="doge, stonks, crypto"
            />
          </div>

          <div className="flex gap-3">
            <GlitchButton
              type="button"
              onClick={generateAIContent} // Use the imported generateAI function
              disabled={!tags || generatingAI}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {generatingAI ? "GENERATING..." : "AI_ENHANCE"}
            </GlitchButton>

            <GlitchButton type="submit" disabled={!title || loading} variant="primary" className="flex-1">
              {loading ? "UPLOADING..." : "DEPLOY_MEME"}
            </GlitchButton>
          </div>
        </form>
      </div>
    </div>
  )
}
