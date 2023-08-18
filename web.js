const api_key = 'ddae83b8faaea065fdce4a572e55a33a';
const discover_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=1`;
const search_url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=`;
const img_url = 'https://image.tmdb.org/t/p/w500';

const main = document.querySelector('.main');
const form = document.getElementById('form'); 
const search = document.getElementById('search'); 

async function getmovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data);
  return data;
}

async function showMovies(data) {
  main.innerHTML = '';

  data.results.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const moviel = document.createElement('div');
    moviel.classList.add('movie');

    moviel.innerHTML = `
      <img src="${img_url + poster_path}" alt="${title}">
      <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getcolor(vote_average)}">${vote_average} <i class="fa-solid fa-star"></i></span>
      </div>
      <div class="overview">
          ${overview}
      </div>
    `;

    main.appendChild(moviel);
  });
}

getmovies(discover_url);

function getcolor(vote_average) {
  if (vote_average >= 8) {
    return 'green';
  } else if (vote_average >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

function submitt(e) {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (searchTerm) {
    const searchUrl = search_url + searchTerm;
    getmovies(searchUrl);
  }

  search.value = ''; 
}

form.addEventListener('submit', submitt);
