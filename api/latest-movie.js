import { parseStringPromise } from 'xml2js';

export default async function handler(req, res) {
  try {
    // Dynamically import node-fetch
    const { default: fetch } = await import('node-fetch');
    
    // Fetch the RSS feed
    const response = await fetch('https://letterboxd.com/crushedoreos/rss/');
    const text = await response.text();

    // Parse the XML to JSON
    const result = await parseStringPromise(text);
    const items = result.rss.channel[0].item;

    // Filter movies with at least a 4.0 rating
    const latestMovie = items
      .map(item => ({
        title: item.title[0],
        link: item.link[0],
        rating: parseFloat(item['letterboxd:memberRating'][0] || '0'),
        imageUrl: item.description[0].match(/<img src="([^"]+)"/)?.[1] || '',
        pubDate: new Date(item.pubDate[0])
      }))
      .filter(movie => movie.rating >= 4.0)
      .sort((a, b) => b.pubDate - a.pubDate)[0];

    if (latestMovie) {
      res.status(200).json(latestMovie);
    } else {
      res.status(404).json({ error: 'No suitable movies found' });
    }
  } catch (error) {
    console.error('Error fetching or parsing the RSS feed:', error);
    res.status(500).json({ error: 'Error fetching or parsing the RSS feed' });
  }
}
