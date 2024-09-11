const apiKey = '3ef3be10'; 

function findMovies(query, type) {
  const url = `http://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=${type}&apikey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const resultsDiv = document.querySelector('.result');
      console.log(data);
      resultsDiv.innerHTML = ''; 
      if (data.Search) {
        data.Search.forEach(movie => {
          const movieDiv = document.createElement('div');
          movieDiv.classList.add('movies-content');
          movieDiv.innerHTML = `
            <h2>${movie.Title}</h2>
            <p>Year: ${movie.Year}</p>
            <p>Type: ${movie.Type}</p>
            <img src="${movie.Poster}" alt="${movie.Title}">
          `;
          movieDiv.addEventListener('click', () => showMovieDetails(movie));
          resultsDiv.appendChild(movieDiv);
        });
      } else {
        resultsDiv.innerHTML = 'No results found.';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      const resultsDiv = document.querySelector('.result');
      resultsDiv.innerHTML = 'An error occurred while searching.';
    });
}

function showMovieDetails(movie) {
  document.getElementById('modalTitle').innerText = movie.Title;
  document.getElementById('modalYear').innerText = `Year: ${movie.Year}`;
  document.getElementById('modalType').innerText = `Type: ${movie.Type}`;
  document.getElementById('modalPoster').src = movie.Poster;
  document.getElementById('modalPlot').innerText = movie.Plot || 'No plot available';

  const modal = document.getElementById('movieModal');
  modal.style.display = 'block';

  const closeModal = document.querySelector('.close');
  closeModal.onclick = () => modal.style.display = 'none';

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}

function handleRatingSubmit(event) {
  event.preventDefault();
  const rating = document.getElementById('rating').value;
  const movieTitle = document.getElementById('modalTitle').innerText;

  if (rating && movieTitle) {
    document.getElementById('averageRating').innerText = `Your rating for ${movieTitle}: ${rating}`;
  } else {
    alert('Please provide a rating.');
  }
}

function handleSearch(event) {
  event.preventDefault(); 
  const query = document.getElementById('query').value.trim();
  const type = document.getElementById('type').value;
  
  if (query) {
    findMovies(query, type);
  } else {
    alert('Please enter a movie title.');
  }
}

document.getElementById('searchForm').addEventListener('submit', handleSearch);
document.getElementById('ratingForm').addEventListener('submit', handleRatingSubmit);
