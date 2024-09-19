import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

export default async function handler(req, res) {
  const rssUrl = 'https://letterboxd.com/crushedoreos/rss/';

  try {
    const response = await fetch(rssUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const xml = await response.text();
    const data = await parseStringPromise(xml);

    const items = data.rss.channel[0].item;
    const filteredMovies = items.filter(item => {
      const rating = parseFloat(item['letterboxd:memberRating'][0]);
      return rating >= 4.0;
    }).map(item => ({
      title: item.title[0],
      link: item.link[0],
      rating: item['letterboxd:memberRating'][0],
      image: item.description[0].match(/<img src="([^"]+)"/)[1], // Extract the image URL from the description
    }));

    // If there are filtered movies, use the most recent one
    const latestMovie = filteredMovies[0] || null;

    res.status(200).json(latestMovie);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Error fetching or parsing the RSS feed' });
  }
}
