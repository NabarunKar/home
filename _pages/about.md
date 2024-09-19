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


## About Me

This is Nabarun's homepage. Here is the most recently played track on my Last.fm:

<div id="lastfm-track">
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
      const albumArt = track.image[2]['#text']; // Size 'medium'

      // Update the DOM with the track information
      document.getElementById('lastfm-track').innerHTML = `
        <img src="${albumArt}" alt="${trackName}" />
        <p>Last played track: <strong>${trackName}</strong> by ${artistName}</p>
      `;
    })
    .catch(error => console.error('Error fetching Last.fm data:', error));
</script>

<!-- Inline CSS -->
<style>
  .track-info {
    text-align: center;
    margin-top: 20px;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 10px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    background-color: #f9f9f9;
  }
  
  .track-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2em;
    color: #333;
  }

  strong {
    color: #007acc;
  }
</style>