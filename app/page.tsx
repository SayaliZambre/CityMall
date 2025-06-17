"use client"

import { useState } from "react"
import { MemeGallery } from "@/components/meme-gallery"
import { CreateMemeModal } from "@/components/create-meme-modal"
import { Leaderboard } from "@/components/leaderboard"
import { CyberpunkHeader } from "@/components/cyberpunk-header"
import { TerminalEffect } from "@/components/terminal-effect"
import { GlitchButton } from "@/components/glitch-button"
import { Plus, TrendingUp, Zap } from "lucide-react"

export default function HomePage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [activeTab, setActiveTab] = useState<"gallery" | "leaderboard">("gallery")
  const [credits, setCredits] = useState(1000)

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ff00ff%22%20fillOpacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse" />
      </div>

      <div className="relative z-10">
        <CyberpunkHeader credits={credits} />

        {/* Terminal intro effect */}
        <div className="container mx-auto px-4 py-8">
          <TerminalEffect />

          {/* Navigation */}
          <div className="flex flex-col lg:flex-row gap-6 mt-8">
            {/* Main content */}
            <div className="flex-1">
              <div className="flex gap-4 mb-6">
                <GlitchButton
                  onClick={() => setActiveTab("gallery")}
                  variant={activeTab === "gallery" ? "primary" : "secondary"}
                  className="flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  MEME_GALLERY.EXE
                </GlitchButton>
                <GlitchButton
                  onClick={() => setActiveTab("leaderboard")}
                  variant={activeTab === "leaderboard" ? "primary" : "secondary"}
                  className="flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  LEADERBOARD.EXE
                </GlitchButton>
                <GlitchButton
                  onClick={() => setShowCreateModal(true)}
                  variant="accent"
                  className="flex items-center gap-2 ml-auto"
                >
                  <Plus className="w-4 h-4" />
                  CREATE_MEME.EXE
                </GlitchButton>
              </div>

              {activeTab === "gallery" && <MemeGallery credits={credits} setCredits={setCredits} />}
              {activeTab === "leaderboard" && <Leaderboard />}
            </div>
          </div>
        </div>

        {showCreateModal && (
          <CreateMemeModal
            onClose={() => setShowCreateModal(false)}
            onMemeCreated={() => {
              setShowCreateModal(false)
              // Refresh gallery
            }}
          />
        )}
      </div>
    </div>
  )
}
