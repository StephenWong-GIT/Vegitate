// initiate page function, and define constants 
const initPage = async () => {
    const inputEl = document.getElementById("movie-input");
    const searchEl = document.getElementById("search-button");
    const clearEl = document.getElementById("clear-history");
    const currentMovie = document.getElementById("movie-selected");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log('searchHistory',searchHistory);

    const res = await fetch(trendingMoviesUrlEndpoint);
    const data = await res.json();
    console.log('data', data);
    const movieTitles = createElementsAndGetTitles(data);
    console.log('titles', movieTitles)
}
// define API Key constant, and API Endpoint Contants
const apiKey = "2e903f6b5d70f51dab346edfeb17bdd4";
const trendingMoviesUrlEndpoint = "https://api.themoviedb.org/3/trending/movie/week?api_key=2e903f6b5d70f51dab346edfeb17bdd4";
const moviePosterURL = "https://www.themoviedb.org/t/p/w220_and_h330_face";


initPage();

const createElementsAndGetTitles = (data) => {
    console.log('movies', data);
    return data.map(movie => { 
       const movieEl = document.createElementById(`movieEl-${movie.title}`)
       return {title: movie.original_title, url: `${moviePosterURL}${movie.backdrop_path}`};
    })
};

// const getMovieReviews = (data) => {
   // console.log('movie reviews', data);
    // return data.map(reviews => {
      //  const movieReviewsEl = document.createElement(`movieReviewsEl-${reviews.title}`)
       // return ()
   // }
// };