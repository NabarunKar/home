---
permalink: /
title: "Hello, I am Nabarun!"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---
<head>
  <script type="module">
  import { inject } from '@vercel/analytics';
  inject();
  </script>
</head>

🎓 I am a first year graduate student pursuing a Masters in Computer Science at Texas A&M University

👨🏻‍💻 I am passionate about Data Science and Blockchain technologies

🕵️ Currently seeking Software Engineering Internship Roles for Summer 2025!


Besides development, I really like film, music and clicking pictures!

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

        // Function to wrap text in scrolling container if needed
        function wrapInScrollContainer(text, className) {
          if (text.length > 20) {
            return `<div class="scroll-container ${className}"><span class="scroll-text">${text}</span></div>`;
          }
          return `<div class="${className}">${text}</div>`;
        }

        // Update the DOM with the track information
        document.getElementById('lastfm-track').innerHTML = `
          <div class="content-wrapper">
            <img src="${albumArt}" alt="${trackName}" class="album-art" />
            <div class="track-info">
              <p class="now-playing">Last Played Track</p>
              ${wrapInScrollContainer(trackName, 'track-name')}
              ${wrapInScrollContainer(artistName, 'artist-name')}
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
      overflow: hidden;
    }

    .now-playing {
      font-size: 0.8em;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
    }

    .track-name, .artist-name {
      white-space: nowrap;
      overflow: hidden;
    }

    .track-name {
      font-size: 1.4em;
      font-weight: bold;
      color: #ffffff;
      margin: 5px 0;
    }

    .artist-name {
      font-size: 1em;
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
    }

    .scroll-container {
      position: relative;
      overflow: hidden;
      width: 100%;
    }

    .scroll-text {
      display: inline-block;
      padding-left: 100%;
      animation: scroll-left 15s linear infinite;
    }

    @keyframes scroll-left {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  </style>

🍿 and the last good movie I watched 😁

<div id="latest-movie" class="movie-poster-container">
  <!-- Latest good movie poster will be displayed here -->
</div>

<script>
  async function fetchLatestMovie() {
    try {
      console.log('Fetching latest movie data...');
      const response = await fetch('../api/latest-movie');
      console.log('Response status:', response.status);
      const movie = await response.json();
      console.log('Received movie data:', movie);

      if (movie && movie.image && movie.link) {
        console.log('Rendering movie poster');
        document.getElementById('latest-movie').innerHTML = `
          <a href="${movie.link}" target="_blank" rel="noopener noreferrer">
            <img src="${movie.image}" alt="${movie.title}" class="movie-poster" />
          </a>
        `;
      } else {
        console.log('No valid movie data received');
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
</styl>