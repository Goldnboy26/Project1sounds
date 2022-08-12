let term = '';
const updateTerm = () => {
  //event.preventDefault()
  term = document.getElementById('searchTerm').value;

  if (!term || term === '') {
   alert('Please enter a seach term');
} else {
  const url = `https://itunes.apple.com/search?term=${term}` + `&entity=song&limit=75`;
  fetch(url)
  .then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
});

}

};

const searchBtn = document.getElementById('searchTermBtn');
  
  searchBtn.addEventListener('click', updateTerm);
  
//$('searchTermBtn').on('click', updateTerm);




