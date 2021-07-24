// initiate page function, and define constants 
const initPage = async() => {
        const inputEl = document.getElementById("movie-input");
        const searchEl = document.getElementById("search-button");
        const clearEl = document.getElementById("clear-history");
        const currentMovie = document.getElementById("movie-selected");
        let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
        console.log('searchHistory', searchHistory);

        const res = await fetch(trendingMoviesUrlEndpoint);
        const data = await res.json();
        console.log('data', data);
        const movieTitles = createElementsAndGetTitles(data);
        console.log('titles', movieTitles)
    }
    // define API Key constant, and API Endpoint Contants
const apiKey = "2e903f6b5d70f51dab346edfeb17bdd4";
const trendingMoviesUrlEndpoint = "https://api.themoviedb.org/3/trending/movie/week?api_key=" + apiKey;
const moviePosterURL = "https://www.themoviedb.org/t/p/w220_and_h330_face";

// init page
initPage();
// defined constant function to grab data from JSON from fwth reqeust, ns create an HTML element for each item in the array
const createElementsAndGetTitles = (data) => {
    console.log('movies', data);
    return data.map(movie => {
        const movieEl = document.createElementById(`movieEl-${movie.title}`)
        return { title: movie.original_title, url: `${moviePosterURL}${movie.backdrop_path}` };
    })
};

// const getMovieReviews = (data) => {
// console.log('movie reviews', data);
// return data.map(reviews => {
//  const movieReviewsEl = document.createElement(`movieReviewsEl-${reviews.title}`)
// return ()

// }
// };

// --- stephen

// function getQuote() {
// fetch("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=" + Math.random())
// .then(response => response.json())
// .then(function(data) {
// console.log(data);

// data.filter(key => {

// let quote = document.querySelector(".quote");
// let author = document.querySelector(".author");
// let cleanQuote = key.content.replace(/<\/?p[^>]*>/g, ''); // This way we remove <p> tag from quote (api has quotes with p tags)

// let share = 'https://twitter.com/home?status=' + cleanQuote + ' Author: ' + key.title;
// console.log(share)

// quote.innerHTML = key.content;
// author.innerHTML = key.title;

// document.getElementById('twitterShare').href=share;
// });

// })
// .catch(function(error) {
// If there is any error you will catch them here
// console.log(error);
// });
// }

// const newQuote = document.getElementById('newQuote')
// newQuote.addEventListener('click', getQuote); // new quote on button click
// window.onload = getQuote; // new quote on page load

// add event listener when click, on call click being added - wong