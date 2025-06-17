import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { voteType } = await request.json()
    const memeId = params.id

    const { data: meme, error: fetchError } = await supabase
      .from("memes")
      .select("upvotes, downvotes")
      .eq("id", memeId)
      .single()

    if (fetchError) throw fetchError

    const updates = voteType === "up" ? { upvotes: (meme.upvotes || 0) + 1 } : { downvotes: (meme.downvotes || 0) + 1 }

    const { error: updateError } = await supabase.from("memes").update(updates).eq("id", memeId)

    if (updateError) throw updateError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error voting on meme:", error)
    return NextResponse.json({ error: "Failed to vote" }, { status: 500 })
  }
}
