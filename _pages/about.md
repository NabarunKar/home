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

🎧 Here's the last song I listened to

<div id="lastfm-track" class="glass-card">
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
        <img src="${albumArt}" alt="${trackName}" class="album-art" />
        <div class="track-info">
          <p class="now-playing">Most Recent Track</p>
          <h2 class="track-name">${trackName}</h2>
          <p class="artist-name">${artistName}</p>
        </div>
      `;
    })
    .catch(error => console.error('Error fetching Last.fm data:', error));
</script>

<style>
  .glass-card {
    background: #ECDFCC;
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    max-width: 400px;
    margin: 20px auto;
    overflow: hidden;
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
    color: #697565;
    margin: 0;
  }

  .track-name {
    font-size: 1.4em;
    font-weight: bold;
    color: #181C14;
    margin: 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .artist-name {
    font-size: 1em;
    color: #3C3D37;
    margin: 0;
  }
</style>