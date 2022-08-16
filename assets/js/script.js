
let term = '';
const updateTerm = (event) => {
  event.preventDefault()
  term = document.getElementById('searchTerm').value;


  if (!term || term === '') {
      alert('Please enter a seach term');
  } else {
      const url = `https://itunes.apple.com/search?term=${term}` + `&entity=song&limit=75`;
      const songContainer = document.getElementById('songs');
      while (songContainer.firstChild) {
          songContainer.removeChild(songContainer.firstChild);
      }
      fetch(url)
          .then((Response) => Response.json())
          .then((data) => {
              const artists = data.results;
              return artists.map(result => {
                 
                //Create HTML Elements

                  const article = document.createElement('article'),
                      artists = document.createElement('p'),
                      song = document.createElement('h4'),
                      img = document.createElement('img'),
                      audio = document.createElement('audio'),
                      audioSource = document.createElement('source')

                  //Append content to song container

                  artists.innerHTML = result.artistName;
                  song.innerHTML = result.trackName;
                  img.src = result.artworkUrl100;
                  audioSource.src = result.previewUrl;
                  audio.controls = true;

                  article.appendChild(img);
                  article.appendChild(artists);
                  article.appendChild(song);
                  article.appendChild(audio);
                  audio.appendChild(audioSource);

                  songContainer.appendChild(article);
              })
          })
          .catch(error => console.log('Request failed:', error))
  }
}

//document.location.replaceWith('./assets/favorites.html');


const searchBtn = document.getElementById('searchTermBtn');
  
  searchBtn.addEventListener('click', updateTerm);

    
  document.addEventListener('play', event => {
    const audio = document.getElementsByTagName('audio');
    for (let i = 0; i < audio.length; i++) {
        if (audio[i] != event.target) {
            audio[i].pause();
        }
    }
}, true)