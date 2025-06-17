import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    const { data: memes, error } = await supabase.from("memes").select("*").order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(memes || [])
  } catch (error) {
    console.error("Error fetching memes:", error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, image_url, tags, owner_id } = body

    // Generate AI content
    let ai_caption = ""
    let vibe_analysis = ""

    try {
      const aiResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/ai/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags }),
      })

      if (aiResponse.ok) {
        const aiData = await aiResponse.json()
        ai_caption = aiData.caption
        vibe_analysis = aiData.vibe
      }
    } catch (aiError) {
      console.error("AI generation failed:", aiError)
      // Fallback captions
      ai_caption = "YOLO to the moon! 🚀"
      vibe_analysis = "Neon Crypto Chaos"
    }

    const { data: meme, error } = await supabase
      .from("memes")
      .insert([
        {
          title,
          image_url,
          tags,
          owner_id,
          ai_caption,
          vibe_analysis,
          upvotes: 0,
          downvotes: 0,
          current_bid: 0,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(meme)
  } catch (error) {
    console.error("Error creating meme:", error)
    return NextResponse.json({ error: "Failed to create meme" }, { status: 500 })
  }
}
