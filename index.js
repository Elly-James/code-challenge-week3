
//FIRST SECTION TO PUT THE MENU INTO DISPLAY


function movieMenu(title, id) {
  const p = document.createElement("p");
  p.className = "movie_list"; // Assign a class for styling

  const btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.className = "delete";
  btn.dataset.movieId = id; // Attach the movie ID to the button

  // Add the title and button inside the <p> element
  p.textContent = `${title} `;
  p.appendChild(btn);

  // Append the <p> to the container_menu div
  const containerMenu = document.querySelector("#container_menu");
  containerMenu.appendChild(p);
}


document.querySelector('.btn_menu').addEventListener('click', handleMenu)

function handleMenu(){
    document.querySelector('.btn_menu').disabled=true;

   

    fetch('http://localhost:3000/films')
    .then(res=> res.json())
    .then(data=>{
        data.forEach(movie=>{
            movieMenu(movie.title);
        });
    })
    .catch((err) => console.error(err));
}


// SECOND SECTION TO DISPLAY THE MOVIES ONE BY ONE TOGETHER WITH THE BUTTONS FOR NAVIGATION
// Store movie data globally
let movieData = [];
let currentIndex = 0; // Track the current movie

// Fetch movie data and display the first movie
function fetchMovies() {
  fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(data => {
      movieData = data; // Store the data globally
      displayMovie(movieData[currentIndex]); // Display the first movie
    })
    .catch(err => console.error('Error fetching movies:', err));
}

// Display movie based on current index
function displayMovie(movie) {
  const imageContainer = document.querySelector('.image-container');
  const buttonsDiv = document.querySelector('.buttons');

  // Clear previous content
  imageContainer.innerHTML = '';
  buttonsDiv.innerHTML = '';

  // Create image tag
  const img = document.createElement('img');
  img.src = movie.poster;
  img.alt = movie.title;
  img.className = 'movie-poster';
  imageContainer.appendChild(img);

  // Navigation and Action Buttons Container
  const navigationDiv = document.createElement('div');
  navigationDiv.className = 'navigation-buttons';
// 1. Previous Button
const prevBtn = document.createElement('button');
prevBtn.textContent = 'Previous Movie';
prevBtn.className = 'movie-btn_previous';
prevBtn.onclick = (event) => {
  event.preventDefault(); // Prevent the default behavior (e.g., page reload)
  currentIndex = (currentIndex - 1 + movieData.length) % movieData.length;
  displayMovie(movieData[currentIndex]);
};
navigationDiv.appendChild(prevBtn);

// 2. Next Button
const nextBtn = document.createElement('button');
nextBtn.textContent = 'Next Movie';
nextBtn.className = 'movie-btn_next';
nextBtn.onclick = (event) => {
  event.preventDefault(); // Prevent the default behavior (e.g., page reload)
  currentIndex = (currentIndex + 1) % movieData.length;
  displayMovie(movieData[currentIndex]);
};
navigationDiv.appendChild(nextBtn);

  buttonsDiv.appendChild(navigationDiv);

  // Action Buttons Container
  const actionDiv = document.createElement('div');
  actionDiv.className = 'action-buttons';

  // 3. Description Button
  const descriptionBtn = document.createElement('button');
  descriptionBtn.textContent = 'Movie Description';
  descriptionBtn.className = 'movie-btn_description';
  descriptionBtn.onclick = () => {
    const availableTickets = movie.capacity - movie.tickets_sold;
    alert(`Title: ${movie.title}\nDescription: ${movie.description}\nRuntime: ${movie.runtime} minutes\nShowtime: ${movie.showtime}\nAvailable Tickets: ${availableTickets}`);
  };
  actionDiv.appendChild(descriptionBtn);

  // 4. Buy Ticket Button
  let availableTickets = movie.capacity - movie.tickets_sold;
  const buyTicketBtn = document.createElement('button');
  buyTicketBtn.textContent = availableTickets <= 0 ? 'Sold Out' : `Buy Ticket (${availableTickets} available)`;
  buyTicketBtn.className = 'movie-btn ' + (availableTickets <= 0 ? 'sold-out' : 'buy-ticket');
  buyTicketBtn.disabled = availableTickets <= 0;
  buyTicketBtn.onclick = () => {
    if (availableTickets > 0) {
      availableTickets -= 1;
      movie.tickets_sold += 1; // Update the tickets_sold property locally
      buyTicketBtn.textContent = availableTickets <= 0 ? 'Sold Out' : `Buy Ticket (${availableTickets} available)`;
      buyTicketBtn.disabled = availableTickets <= 0;
      alert(`You bought a ticket for ${movie.title}!`);
    }
    if (availableTickets <= 0) {
      buyTicketBtn.classList.add('sold-out');
    }
  };
  actionDiv.appendChild(buyTicketBtn);

  buttonsDiv.appendChild(actionDiv);
}

// Initial fetch call when the page loads
document.addEventListener('DOMContentLoaded', fetchMovies);




// THIRD SECTION TO ADD A MOVIE INTO OUR DATA USING POST

function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;

  // Get form data
  const films = {
    title: form.title.value.trim(),
    runtime: form.runtime.value.trim(),
    capacity: form.capacity.value.trim(),
    showtime: form.showtime.value.trim(),
    tickets_sold: form.tickets_sold.value.trim(),
    description: form.description.value.trim(),
    poster: form.poster.value.trim(),
  };

  // Check if all fields are filled
  const isFormValid = Object.values(films).every(value => value !== "");
  if (!isFormValid) {
    alert("Please fill out all fields before submitting.");
    return;
  }

  // Call addMovie to POST the movie data
  addMovie(films);

  // Reset the form after submission
  form.reset();
}

function addMovie(films) {
  fetch('http://localhost:3000/films', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(films),
  })
    .then(res => res.json())
    .then(movie => {
      console.log('Movie added:', movie);
      alert(`Movie "${movie.title}" added successfully!`);
    })
    .catch(err => console.error('Error adding movie:', err));
}

// Attach event listener to form
document.querySelector('#movie-form').addEventListener('submit', handleSubmit);



// FORTH SECTION TO DELETE A MOVIE FROM OUR DATA USING DELETE



document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
      const movieId = e.target.dataset.movieId; // Get the movie ID
      const parentElement = e.target.closest("p"); // Find the parent <p>

      if (movieId && parentElement) {
          parentElement.remove(); // Remove movie from DOM
          deleteMovie(movieId); // Call deleteMovie with ID
      } else {
          console.error("Error: Movie ID or parent element not found");
      }
  }
});

function deleteMovie(id) {
  console.log("Deleting movie with ID:", id); // Log for debugging
  fetch(`http://localhost:3000/films/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
  })
      .then((res) => {
          if (!res.ok) {
              console.error("Failed to delete movie:", res.statusText);
              throw new Error("Failed to delete the movie");
          }
          console.log(`Movie with ID ${id} deleted successfully.`);
          alert(`Movie deleted successfully!`);
      })
      .catch((err) => console.error("Error deleting movie:", err));
}


/*

//Fifth section using Patch

function updateMovieByTitle(title, updatedData) {
  // Fetch all movies to find the movie ID by title
  fetch('http://localhost:3000/films')
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch movies: ${res.statusText}`);
      }
      return res.json();
    })
    .then((movies) => {
      // Find the movie by title
      const movieToUpdate = movies.find((movie) => movie.title === title);
      if (!movieToUpdate) {
        throw new Error(`Movie with title "${title}" not found`);
      }

      // Perform the PATCH request to update the movie
      return fetch(`http://localhost:3000/films/${movieToUpdate.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to update movie: ${res.statusText}`);
      }
      return res.json();
    })
    .then((updatedMovie) => {
      console.log(`Movie updated successfully:`, updatedMovie);
      alert(`Movie "${updatedMovie.title}" updated successfully!`);
    })
    .catch((err) => {
      console.error('Error updating movie:', err);
      alert(`Error updating movie: ${err.message}`);
    });
}

// Example usage
const titleToUpdate = "The Giant Gila Monster"; // Title of the movie to update
const updatedData = {
  runtime: "140", // Example: updating runtime
  capacity: 56,   // Example: updating capacity
};

updateMovieByTitle(titleToUpdate, updatedData);
*/
