// In latest-movie.js (server-side)
export default async function handler(req, res) {
  try {
    // Dynamically import node-fetch
    const { default: fetch } = await import('node-fetch');
    
    // Fetch the RSS feed
    const response = await fetch('https://letterboxd.com/crushedoreos/rss/');
    const text = await response.text();

    console.log('RSS feed fetched successfully');

    // Parse the XML to JSON
    const { parseStringPromise } = await import('xml2js');
    const result = await parseStringPromise(text);
    
    console.log('RSS feed parsed successfully');
    console.log('Feed structure:', JSON.stringify(result, null, 2));

    if (!result.rss || !result.rss.channel || !result.rss.channel[0].item) {
      console.error('Unexpected RSS feed structure');
      throw new Error('Unexpected RSS feed structure');
    }

    const items = result.rss.channel[0].item;
    console.log(`Found ${items.length} items in the feed`);

    const latestMovie = items
      .map(item => {
        const title = item.title ? item.title[0] : 'No Title';
        const link = item.link ? item.link[0] : 'No Link';
        const imageUrlMatch = item.description ? item.description[0].match(/<img src="([^"]+)"/) : null;
        const imageUrl = imageUrlMatch ? imageUrlMatch[1] : '';
        const pubDate = item.pubDate ? new Date(item.pubDate[0]) : new Date();

        // Extract the direct movie link without the username
        const directLinkMatch = link.match(/https:\/\/letterboxd\.com\/film\/[^/]+\//);
        const directLink = directLinkMatch ? directLinkMatch[0] : link;

        console.log(`Processing movie: ${title}`);
        console.log(`  Direct link: ${directLink}`);
        console.log(`  Image URL: ${imageUrl}`);

        return { title, directLink, imageUrl, pubDate };
      })
      .filter(movie => {
        // You might want to keep your rating filter if it's still relevant
        const ratingItem = items.find(item => item.title[0] === movie.title);
        const rating = ratingItem && ratingItem['letterboxd:memberRating'] 
          ? parseFloat(ratingItem['letterboxd:memberRating'][0] || '0') 
          : 0;
        console.log(`  Rating for ${movie.title}: ${rating}`);
        return rating >= 4.0;
      })
      .sort((a, b) => b.pubDate - a.pubDate)[0];

    if (latestMovie) {
      console.log('Latest movie found:', latestMovie);
      res.status(200).json({
        title: latestMovie.title,
        link: latestMovie.directLink,
        image: latestMovie.imageUrl,
      });
    } else {
      console.log('No suitable movies found');
      res.status(404).json({ error: 'No suitable movies found' });
    }
  } catch (error) {
    console.error('Error in movie data processing:', error);
    res.status(500).json({ error: 'Error fetching or parsing the RSS feed' });
  }
}


