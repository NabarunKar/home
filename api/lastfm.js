export default async function handler(req, res) {
    const apiKey = process.env.LASTFM_API_KEY;
    const username = 'CrushedOreos';
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching Last.fm data' });
    }
  }

// Fetch top artists
export async function fetchTopArtists() {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = 'CrushedOreos';
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&format=json&period=6month&limit=8`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching Last.fm data');
  }
}

// Fetch current URL
export async function fetchCurrentUrl() {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = 'CrushedOreos';
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&format=json&period=6month&limit=8`;

  try {
    // Just returning the URL as a string
    return url;
  } catch (error) {
    throw new Error('Error fetching URL');
  }
}
