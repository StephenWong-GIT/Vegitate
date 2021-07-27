gapi.load("client", loadClient);

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
			'<span><a class="button is-primary is-large modal-button" data-target="modal" onclick="getReviews(\'' + movie.original_title + '\')">Trailers & Media</a>' +
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


	loadClient();
	execute(movieName);
	var modal = document.getElementById("modal-tre");
	modal.className = 'modal is-active';

	var modalMovieTitle = document.getElementById("modalMovieTitle");
	modalMovieTitle.innerText = movieName;

	var modalMovieBody = document.getElementById("modalMovieBody");


};

function loadClient() {
	gapi.client.setApiKey("AIzaSyAw-kJfm7f9eOk4vpEI3pYEoBIZuP1txDU");
	return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
	.then(function() { console.log("GAPI client loaded for API"); },
		function(err) { console.error("Error loading GAPI client for API", err); });
}

function execute(movieName) {
	const searchString = movieName;
	const maxresult = 3;

	var arr_search = {
		"part": 'snippet',
		"type": 'video',
		"maxResults": maxresult,
		"q": searchString
	};

	return gapi.client.youtube.search.list(arr_search)
	.then(function(response) {
			// Handle the results here (response.result has the parsed body).
			const listItems = response.result.items;
			if (listItems) {
				let output = '<h4>Videos</h4><ul>';

				listItems.forEach(item => {
					const videoId = item.id.videoId;
					const videoTitle = item.snippet.title;
					output += `
                    <li><a data-fancybox href="https://www.youtube.com/watch?v=${videoId}"><img src="http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg" /></a><p>${videoTitle}</p></li>
                `;
				});
				output += '</ul>';

				if (response.result.prevPageToken) {
					output += `<br><a class="paginate" href="#" data-id="${response.result.prevPageToken}" onclick="paginate(event, this)">Prev</a>`;
				}

				if (response.result.nextPageToken) {
					output += `<a href="#" class="paginate" data-id="${response.result.nextPageToken}" onclick="paginate(event, this)">Next</a>`;
				}

				var modalMovieBody = document.getElementById("modalMovieBody");

				// Output list
				modalMovieBody.innerHTML = output;
			}
		},

		function(err) { console.error("Execute error", err); });
}

