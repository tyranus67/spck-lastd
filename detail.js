// Lấy thông tin id và category
const params = new URLSearchParams(window.location.search)
const id = params.get('id')
const category = params.get('category')

const parent = document.querySelector(".movie-detail-section"); 
fetch("./data/movies.json")
      .then(function(response) {
        return response.json(); 
      })
      .then(function(data) {
        const movies = data[category]
        let movie; 
        for (let index = 0; index < movies.length; index += 1) {
            if (movies[index].id == id) {
                movie = movies[index];
            }
        }

        let output = `
         <h2 class="section-title">Movie Details ✨</h2>
            <div class="movie-detail">
                <div class="movie-detail-image">
                    <img id="movie-image" src="${movie.image_url}" alt="Movie Poster">
                </div>
                <div class="movie-detail-info">
                    <h3 id="movie-title" class="movie-detail-title">${movie.title}</h3>
                    <p id="movie-description" class="movie-detail-description">${movie.description}</p>
                    <button class="watch-now-btn">Watch Now</button>
                </div>
            </div>
        `
        parent.innerHTML = output; 
      })