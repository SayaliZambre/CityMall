import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { tags } = await request.json()

    // Mock AI responses for demo (replace with actual Gemini API)
    const captions = [
      "Doge hacks the matrix while hodling to the moon! 🚀",
      "When the blockchain meets cyberpunk vibes 💎",
      "Neural networks can't handle this level of meme energy ⚡",
      "Stonks go brrrr in the neon underground 📈",
      "AI detected maximum meme potential achieved 🤖",
    ]

    const vibes = [
      "Neon Crypto Chaos",
      "Retro Stonks Vibes",
      "Cyberpunk Doge Energy",
      "Matrix Meme Madness",
      "Digital Underground Feels",
    ]

    const caption = captions[Math.floor(Math.random() * captions.length)]
    const vibe = vibes[Math.floor(Math.random() * vibes.length)]

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ caption, vibe })
  } catch (error) {
    console.error("Error generating AI content:", error)
    return NextResponse.json({ caption: "YOLO to the moon! 🚀", vibe: "Neon Crypto Chaos" }, { status: 500 })
  }
}
