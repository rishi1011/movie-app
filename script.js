const API_KEY = "0d09c9b3ad7197ffa083c3e4d60339c4"
const CURRENT_THEATRE_MOVIES = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2021-08-18&api_key=${API_KEY}`
const IMG_URL = "https://image.tmdb.org/t/p/w500"
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`

const form = document.getElementById("form")
const search = document.querySelector(".search")
const main = document.getElementById("main")

//initial content
getMovies(CURRENT_THEATRE_MOVIES)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.results)

    showMovies(data.results)
}

function showMovies(results) {
    // main.innerHTML = ""

    results.forEach((movie) => {
        const { title, vote_average, poster_path, overview } = movie

        console.log(title, poster_path, overview, vote_average)

        const movieEle = document.createElement('div')

        movieEle.classList.add("movie")

        movieEle.innerHTML = `
            <div class="img-container">
                <img src="${IMG_URL + poster_path}"
                    alt="${title}">
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${title}</h3>
                <span class="rating">${vote_average}</span>
            </div>
            <div class="overview">
                ${overview}
            </div>
        `

        main.appendChild(movieEle)
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const SEARCH_TERM = search.value
    console.log(SEARCH_TERM)
    if (SEARCH_TERM && SEARCH_TERM !== null) {
        const SEARCH_URL = SEARCH_API + SEARCH_TERM
        getMovies(SEARCH_URL)
    } else {
        window.location.reload();
    }
})





