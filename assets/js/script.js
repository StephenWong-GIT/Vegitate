const inputEl = document.getElementById("movie-input");
const clearEl = document.getElementById("clear-history");
const currentMovie = document.getElementById("movie-selected");
const movies = document.getElementById("movies");

const searchButton = document.querySelector('#search');;
const searchInput = document.querySelector('#exampleInput');
const moviesContainer = document.querySelector('#movies-container');
const moviesSearchable = document.querySelector('#movies-searchable');

// initiate page function, and define constants
const initPage = async () => {
	let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
	console.log('searchHistory', searchHistory);

	const res = await fetch(trendingMoviesUrlEndpoint);
	const data = await res.json();
	const movieTitles = await createElementsAndGetTitles(data.results);
	console.log('titles', movieTitles)
}
// define API Key constant, and API Endpoint Contants
const apiKey = "2e903f6b5d70f51dab346edfeb17bdd4";
const trendingMoviesUrlEndpoint = "https://api.themoviedb.org/3/trending/movie/week?api_key=" + apiKey;
const moviePosterURL = "https://www.themoviedb.org/t/p/w220_and_h330_face";

initPage();

function resetInput() {
    searchInput.value = '';
}

function handleGeneralError(error) {
    log('Error: ', error.message);
    alert(error.message || 'Internal Server');
}

const createElementsAndGetTitles = (data) => {
	return data.map(movie => {
		var div = document.createElement('div');
		div.className = 'column is-one-quarter';
		div.innerHTML = '<div class="card">' +
			'  <div class="card-image">\n' +
			'    <figure class="image is-4by3">\n' +
			'      <img src="' + moviePosterURL + movie.backdrop_path + '" alt="Placeholder image">\n' +
			'    </figure>\n' +
			'  </div>' +
			'<div class="card-content">' +
			'<h2>' + movie.original_title + '</h2>' +
			'</div>' +
			' <footer class="card-footer">' +
			'<p class="card-footer-item">' +
			'<span>Find <a onclick="getReviews(\'' + movie.original_title + '\')">Trailers & Media</a>' +
			'</span>' +
			'</p>' +
			'</footer></div>';
		this.movies.appendChild(div);
		return {title: movie.original_title, url: `${moviePosterURL}${movie.backdrop_path}`};
	})
};
function createIframe(video) {
    const videoKey = (video && video.key) || 'No key found!!!';
    const iframe = document.createElement('iframe');
    iframe.src = `http://www.youtube.com/embed/${videoKey}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;
    return iframe;
}
function insertIframeIntoContent(video, content) {
    const videoContent = document.createElement('div');
    const iframe = createIframe(video);

    videoContent.appendChild(iframe);
    content.appendChild(videoContent);
}
function createVideoTemplate(data) {
    const content = this.content;
    content.innerHTML = '<p id="content-close">X</p>';
    
    const videos = data.results || [];

    if (videos.length === 0) {
        content.innerHTML = `
            <p id="content-close">X</p>
            <p>No Trailer found for this video id of ${data.id}</p>
        `;
        return;
    }

    for (let i = 0; i < 4; i++) {
        const video = videos[i];
        insertIframeIntoContent(video, content);
    }
}
const getReviews = (movieName) => {
	console.log('Clicked movie: ' + movieName);
}

