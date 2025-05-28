  function renderMovie (parentClass, nameJson) {
    const parent = document.querySelector(parentClass);
    fetch("./data/movies.json")
      .then(function(response) {
        return response.json(); 
      })
      .then(function(data) {
        const movies = data[nameJson]
        let output = ""; 
        for (let index = 0; index < movies.length; index = index + 1) {
          let movie = movies[index]; 
          output += `
            <div class="col-lg-2 col-md-4 col-sm-6 mb-4">
             <div class="movie" data-id=${movie.id} data-category=${movie.category}>
              <div class="movie-image">
                <img src=${movie.image_url} alt="">
              </div>
              <div class="movie-desc">
                <p>${movie.title}</p>
              </div>
             </div>
            </div>
          `
        }
        parent.innerHTML = output; 
        let listMovie = document.querySelectorAll(".movie");
        for (let index = 0; index < listMovie.length; index = index + 1) {
          let movie = listMovie[index]; 
          movie.addEventListener('click', function (evenet) {
            const id = movie.getAttribute("data-id"); 
            const category = movie.getAttribute("data-category"); 
            window.location.href = `detail.html?id=${id}&category=${category}`
          })
        }
      })
  }

  renderMovie(".trending-row", "trending-movies"); 
  renderMovie(".popular-row", "popular-movies"); 





