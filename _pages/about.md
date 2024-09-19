---
permalink: /
title: "Hello, I am Nabarun!"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

🎓 I am a first year graduate student pursuing a Masters in Computer Science at Texas A&M University

👨🏻‍💻 I am passionate about Data Science and Blockchain technologies

🕵️ Currently seeking Software Engineering Internship Roles for Summer 2025!


Besides development, I really like film, music and clicking pictures!

<div id="top-artists" class="top-artists-grid">
  <!-- Top artists will be displayed here -->
</div>

<script>
  // Fetch top artists from your server-side function
  async function fetchTopArtists() {
    try {
      // Fetch the Last.fm data from your API route
      const response = await fetch('/api/lastfm');
      const data = await response.json();

      // Extract top artists data
      const artists = data.topartists.artist;

      // Generate HTML for top artists
      const artistsHtml = artists.map(artist => `
        <div class="artist-card" style="background-image: url('${artist.image[3]['#text']}')">
          <div class="artist-info">
            <h3 class="artist-name">${artist.name}</h3>
            <p class="play-count">${artist.playcount} plays</p>
          </div>
        </div>
      `).join('');

      // Insert the generated HTML into the DOM
      document.getElementById('top-artists').innerHTML = artistsHtml;
    } catch (error) {
      console.error('Error fetching top artists:', error);
    }
  }

  // Call the function when the script loads
  fetchTopArtists();
</script>


<style>
  .top-artists-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    max-width: 800px;
    margin: 20px auto;
  }

  .artist-card {
    position: relative;
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
  }

  .artist-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
    color: white;
  }

  .artist-name {
    margin: 0;
    font-size: 1em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .play-count {
    margin: 5px 0 0;
    font-size: 0.8em;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .top-artists-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

🎧 Here's the last song I listened to

<div id="lastfm-track" class="animated-card">
  <!-- Last played track will be displayed here -->
</div>

<script>
  // Fetch last played track from serverless function
  fetch('/api/lastfm')
    .then(response => response.json())
    .then(data => {
      const track = data.recenttracks.track[0];
      const trackName = track.name;
      const artistName = track.artist['#text'];
      const albumArt = track.image[3]['#text']; // Size 'large'

      // Update the DOM with the track information
      document.getElementById('lastfm-track').innerHTML = `
        <div class="content-wrapper">
          <img src="${albumArt}" alt="${trackName}" class="album-art" />
          <div class="track-info">
            <p class="now-playing">Last Played Track</p>
            <h2 class="track-name">${trackName}</h2>
            <p class="artist-name">${artistName}</p>
          </div>
        </div>
      `;
    })
    .catch(error => console.error('Error fetching Last.fm data:', error));
</script>

<style>
  .animated-card {
    background-image: url('/images/giphy.webp');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 20px auto;
    overflow: hidden;
    position: relative;
  }

  .animated-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
  }

  .content-wrapper {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
  }

  .album-art {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin-right: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .track-info {
    flex-grow: 1;
  }

  .now-playing {
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }

  .track-name {
    font-size: 1.4em;
    font-weight: bold;
    color: #ffffff;
    margin: 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .artist-name {
    font-size: 1em;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }
</style>

🍿 Last Good Movie I Watched

<div id="latest-movie" class="movie-poster-container">
  <!-- Latest good movie poster will be displayed here -->
</div>

<script>
  async function fetchLatestMovie() {
    try {
      const response = await fetch('../api/latest-movie');
      const movie = await response.json();

      if (movie && movie.image && movie.link) {
        document.getElementById('latest-movie').innerHTML = `
          <a href="${movie.link}" target="_blank" rel="noopener noreferrer">
            <img src="${movie.image}" alt="Last good movie I watched" class="movie-poster" />
          </a>
        `;
      } else {
        document.getElementById('latest-movie').innerHTML = '<p>No movie data available</p>';
      }
    } catch (error) {
      console.error('Error fetching latest movie:', error);
      document.getElementById('latest-movie').innerHTML = '<p>Error loading movie data</p>';
    }
  }

  // Call the function when the script loads
  fetchLatestMovie();
</script>

<style>
  .movie-poster-container {
    width: 200px; /* Adjust based on your desired poster size */
    margin: 20px auto;
  }

  .movie-poster {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .movie-poster:hover {
    transform: scale(1.05);
  }
</style>