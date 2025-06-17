-- Create memes table
CREATE TABLE IF NOT EXISTS memes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url TEXT,
  tags TEXT[],
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  current_bid INTEGER DEFAULT 0,
  owner_id VARCHAR(255),
  ai_caption TEXT,
  vibe_analysis VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bids table
CREATE TABLE IF NOT EXISTS bids (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meme_id UUID REFERENCES memes(id) ON DELETE CASCADE,
  user_id VARCHAR(255) NOT NULL,
  amount INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_memes_upvotes ON memes(upvotes DESC);
CREATE INDEX IF NOT EXISTS idx_memes_created_at ON memes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_memes_tags ON memes USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_bids_meme_id ON bids(meme_id);
