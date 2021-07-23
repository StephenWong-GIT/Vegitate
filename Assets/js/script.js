const inputEl = document.getElementById("movie-input");
const searchEl = document.getElementById("search-button");
const clearEl = document.getElementById("clear-history");
const currentMovie = document.getElementById("movie-selected");
const movies = document.getElementById("movies");

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
			'<span>View <a onclick="getReviews(\'' + movie.original_title + '\')">Reviews</a>' +
			'</span>' +
			'</p>' +
			'</footer></div>';
		this.movies.appendChild(div);
		return {title: movie.original_title, url: `${moviePosterURL}${movie.backdrop_path}`};
	})
};
const apiKeyNYTIMES = "WyaWdFrtDXpA5hGBGGfXhNcvUYyItAf9";

// this is the url endopoint to pull from NY Times to see if there are any reviews.
const movieReviewURLEndodpoint = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=WyaWdFrtDXpA5hGBGGfXhNcvUYyItAf9&query=";

//const resReviews = await fetch (movieReviewURLEndodpoint);
//const reviewData = await resReviews.json();
//const movieReviews = createElementsAndGetTitles(reviewData.results);
//console.log('Labawski Reviews',movieReviews);
//const getReviews = (movieName) => {
//	console.log('Clicked movie: ' + movieName);
//}

//const getMovieReviews = (data) => {
//console.log('movie reviews', data);
//return data.map(reviews => {
//const movieReviewsEl = document.createElement(`movieReviewsEl-${reviews.title}`)
//  return ()

//}
//}