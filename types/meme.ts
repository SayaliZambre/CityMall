export interface Meme {
  id: string
  title: string
  image_url?: string
  tags?: string[]
  upvotes?: number
  downvotes?: number
  current_bid?: number
  owner_id?: string
  ai_caption?: string
  vibe_analysis?: string
  created_at?: string
}

export interface Bid {
  id: string
  meme_id: string
  user_id: string
  amount: number
  created_at: string
}
