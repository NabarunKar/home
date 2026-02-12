import { parseStringPromise } from 'xml2js';

export default async function handler(req, res) {
    try {
        const LETTERBOXD_RSS_URL = 'https://letterboxd.com/crushedoreos/rss/';
        
        const response = await fetch(LETTERBOXD_RSS_URL);
        const xml = await response.text();
        const result = await parseStringPromise(xml);
        
        // Get all items from the RSS feed
        const items = result.rss.channel[0].item;
        
        // Find the first film with rating >= 4.0
        const favoriteFilm = items.find(item => {
            const rating = parseFloat(item['letterboxd:memberRating']?.[0]);
            return rating && rating >= 4.0;
        });
        
        if (!favoriteFilm) {
            return res.status(404).json({ error: 'No 4+ star movies found.' });
        }
        
        // Extract the image from the description HTML
        const description = favoriteFilm.description[0];
        const imageMatch = description.match(/src="([^"]+)"/);
        const posterUrl = imageMatch ? imageMatch[1] : 'https://via.placeholder.com/200x300?text=No+Poster';
        
        // Extract film slug from the review link and construct the film page URL
        // Review link format: https://letterboxd.com/username/film/film-slug/
        // Film page format: https://letterboxd.com/film/film-slug/
        const reviewLink = favoriteFilm.link[0];
        const filmSlugMatch = reviewLink.match(/\/film\/([^\/]+)\//);
        const filmLink = filmSlugMatch 
            ? `https://letterboxd.com/film/${filmSlugMatch[1]}/`
            : reviewLink; // Fallback to review link if parsing fails
        
        const movieData = {
            title: favoriteFilm['letterboxd:filmTitle'][0],
            link: filmLink,
            image: posterUrl,
            rating: favoriteFilm['letterboxd:memberRating'][0],
            year: favoriteFilm['letterboxd:filmYear']?.[0] || ''
        };
        
        res.status(200).json(movieData);

    } catch (error) {
        console.error('Failed to fetch Letterboxd data:', error);
        res.status(500).json({ error: 'Failed to fetch movie data.' });
    }
}
