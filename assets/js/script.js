

let term = '';
const updateTerm = (event) => {
  event.preventDefault()
  term = document.getElementById('searchTerm').value;


  if (!term || term === '') {
      alert('Please enter a seach term');
  } else {
      const url = `https://itunes.apple.com/search?term=${term}` + `&entity=song&limit=75&sort=recent`;
      const songContainer = document.getElementById('songs');
      while (songContainer.firstChild) {
          songContainer.removeChild(songContainer.firstChild);
      }
      fetch(url)
          .then((Response) => Response.json())
          .then((data) => {
            const artists = data.results;
            return artists.map(result => {
                // Now create Html Element 

                //heart icon SVG //
                let svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

                svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
                svgEl.setAttribute('id', 'heart')
                svgEl.setAttribute(null, 'viewbox', '0 0 24 24')

                let pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');

                pathEl.setAttributeNS(null, 'd', 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z')

                

                const article = document.createElement('article'),
                    artists = document.createElement('p'),
                    song = document.createElement('h4'),
                    img = document.createElement('img'),
                    audio = document.createElement('audio'),
                    audioSource = document.createElement('source')

                // Now put content 

                artists.innerHTML = result.artistName;
                song.innerHTML = result.trackName;
                img.src = result.artworkUrl100;
                audioSource.src = result.previewUrl;
                audio.controls = true;

                svgEl.appendChild(pathEl)
                article.appendChild(img);
                article.appendChild(artists);
                article.appendChild(song);
                article.appendChild(audio);
                article.appendChild(svgEl);
                audio.appendChild(audioSource);
                songContainer.appendChild(article);

                //Like button event listener //
                const heart = document.getElementById("heart");
                
    const likeUnlikePost = function () {
        
                     if (this.classList.contains('like')) {
                    this.classList.remove("like")
                    this.classList.add("unlike")
                    } else {
                        this.classList.remove("unlike")
                        this.classList.add("like")
                        console.log('saved');
                    }
            }
                svgEl.addEventListener('click', likeUnlikePost); 

            })
        })
        .catch(error => console.log('Request failed:', error))
}
}

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