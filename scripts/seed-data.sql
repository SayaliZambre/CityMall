-- Insert sample memes
INSERT INTO memes (title, image_url, tags, upvotes, downvotes, current_bid, owner_id, ai_caption, vibe_analysis) VALUES
('Doge to the Moon', 'https://i.imgur.com/placeholder1.jpg', ARRAY['doge', 'crypto', 'moon'], 42, 3, 150, 'user1', 'Such moon, much wow! Doge breaks through the digital matrix! 🚀', 'Neon Crypto Chaos'),
('Stonks Only Go Up', 'https://i.imgur.com/placeholder2.jpg', ARRAY['stonks', 'finance', 'meme'], 38, 5, 200, 'user2', 'When your portfolio hits different in the cyberpunk timeline 📈', 'Retro Stonks Vibes'),
('This is Fine AI', 'https://i.imgur.com/placeholder3.jpg', ARRAY['ai', 'fire', 'fine'], 35, 2, 75, 'user3', 'AI burns down the old world while sipping digital coffee ☕', 'Matrix Meme Madness'),
('Cyberpunk Cat', 'https://i.imgur.com/placeholder4.jpg', ARRAY['cat', 'cyberpunk', 'neon'], 28, 1, 120, 'user1', 'Feline overlords rule the neon streets of tomorrow 🐱', 'Digital Underground Feels'),
('Pepe Matrix', 'https://i.imgur.com/placeholder5.jpg', ARRAY['pepe', 'matrix', 'rare'], 45, 4, 300, 'user4', 'Rare Pepe takes the red pill and sees the meme code 💊', 'Cyberpunk Doge Energy');
