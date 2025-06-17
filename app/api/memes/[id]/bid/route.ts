import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { amount, userId } = await request.json()
    const memeId = params.id

    // Update meme's current bid
    const { error: updateError } = await supabase.from("memes").update({ current_bid: amount }).eq("id", memeId)

    if (updateError) throw updateError

    // Record the bid
    const { error: bidError } = await supabase.from("bids").insert([
      {
        meme_id: memeId,
        user_id: userId,
        amount,
      },
    ])

    if (bidError) throw bidError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error placing bid:", error)
    return NextResponse.json({ error: "Failed to place bid" }, { status: 500 })
  }
}
