export default async function handler(req, res) {
    const LASTFM_API_KEY = process.env.LASTFM_API_KEY; // Store this in a .env.local file
    const LASTFM_USERNAME = 'CrushedOreos'; // Replace with your Last.fm username

    if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
        return res.status(500).json({ error: 'Last.fm API key or username not configured.' });
    }

    const LASTFM_API_URL = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;

    try {
        const response = await fetch(LASTFM_API_URL);
        const data = await response.json();

        if (data.error) {
            console.error('Last.fm API Error:', data.message);
            return res.status(data.error === 6 ? 404 : 500).json({ error: data.message });
        }

        const track = data.recenttracks.track[0];

        if (!track) {
            return res.status(404).json({ error: 'No recent tracks found.' });
        }

        const isPlaying = track['@attr'] && track['@attr'].nowplaying === 'true';

        // Extract necessary data, handling potential missing fields
        const musicInfo = {
            name: track.name || 'Unknown Song',
            artist: track.artist['#text'] || 'Unknown Artist',
            image: track.image ? track.image[2]['#text'] || track.image[1]['#text'] || 'https://via.placeholder.com/300x300?text=No+Album+Art' : 'https://via.placeholder.com/300x300?text=No+Album+Art',
            isPlaying: isPlaying,
        };

        res.status(200).json(musicInfo);

    } catch (error) {
        console.error('Failed to fetch Last.fm data:', error);
        res.status(500).json({ error: 'Failed to fetch music data.' });
    }
}
