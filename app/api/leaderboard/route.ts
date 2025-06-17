import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const top = Number.parseInt(searchParams.get("top") || "10")

    const { data: memes, error } = await supabase
      .from("memes")
      .select("*")
      .order("upvotes", { ascending: false })
      .limit(top)

    if (error) throw error

    return NextResponse.json(memes || [])
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    return NextResponse.json([], { status: 500 })
  }
}
