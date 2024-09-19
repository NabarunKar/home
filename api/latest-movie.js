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
    console.log('Parsed result:', result); // Debug: Check the structure of the parsed XML

    // Ensure the structure is as expected
    if (!result.rss || !result.rss.channel || !result.rss.channel[0].item) {
      throw new Error('Unexpected XML structure');
    }

    const items = result.rss.channel[0].item;

    // Filter movies with at least a 4.0 rating
    const latestMovie = items
      .map(item => {
        const title = item.title ? item.title[0] : 'No Title';
        const link = item.link ? item.link[0] : 'No Link';
        const rating = item['letterboxd:memberRating'] ? parseFloat(item['letterboxd:memberRating'][0] || '0') : 0;
        const imageUrlMatch = item.description ? item.description[0].match(/<img src="([^"]+)"/) : null;
        const imageUrl = imageUrlMatch ? imageUrlMatch[1] : '';
        const pubDate = item.pubDate ? new Date(item.pubDate[0]) : new Date();

        return { title, link, rating, imageUrl, pubDate };
      })
      .filter(movie => movie.rating >= 4.0)
      .sort((a, b) => b.pubDate - a.pubDate)[0];

    if (latestMovie) {
      res.status(200).json({
        title: latestMovie.title,
        link: latestMovie.link,
        rating: latestMovie.rating,
        image: latestMovie.imageUrl,  // Make sure this property is named 'image'
        pubDate: latestMovie.pubDate
      });
    } else {
      res.status(404).json({ error: 'No suitable movies found' });
    }
  } catch (error) {
    console.error('Error fetching or parsing the RSS feed:', error);
    res.status(500).json({ error: 'Error fetching or parsing the RSS feed' });
  }
}