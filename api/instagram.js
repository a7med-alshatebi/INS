module.exports = async (req, res) => {
    try {
        const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
        const USER_ID = process.env.INSTAGRAM_USER_ID || 'me'; // Default to 'me' if USER_ID not set
        
        if (!INSTAGRAM_TOKEN) {
            throw new Error('Instagram token not configured');
        }
        
        const fields = 'id,caption,media_url,permalink,media_type,timestamp';
        const url = `https://graph.instagram.com/${USER_ID}/media?fields=${fields}&access_token=${INSTAGRAM_TOKEN}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Instagram API error: ${response.status}`);
        }
        
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Instagram API Error:', error);
        res.status(500).json({ error: error.message });
    }
};
