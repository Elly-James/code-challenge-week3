
//FIRST SECTION TO PUT THE MENU INTO DISPLAY


function movieMenu(title, id) {
  const p = document.createElement("p");          //creates a p tag to hold the names of the movies
  p.className = "movie_list";                     //Assign a class to the p tag for styling

  const btn = document.createElement("button");     // creates a button tag
  btn.textContent = "Delete";
  btn.className = "delete";                           
  btn.dataset.movieId = id;                         // Attach the movie ID to the button to reference it

  // Add the title and button inside the <p> element
  p.textContent = `${title} `;                        //the content of the p tag will be the movie title
  p.appendChild(btn);                                 // adds the buttons to each p tag

  // Append the <p> to the container_menu div
  const containerMenu = document.querySelector("#container_menu");  // gets the element in the DOM
  containerMenu.appendChild(p);                                     // appends the p tags and the buttons
}


//adds an event listener to the menu button with a callback function to handle the menu button

document.querySelector('.btn_menu').addEventListener('click', handleMenu)      


function handleMenu(){
    document.querySelector('.btn_menu').disabled=true;   // disables the button after the first click to prevent the user from 
                                                          // populating the menu numerously

   

    fetch('http://localhost:3000/films')   // gets the data from the json data file
    .then(res=> res.json())               // converts the data into json file
    .then(data=>{
        data.forEach(movie=>{             // uses the forEach method to iterate through the object and display the movie titles
                                          // since forEach does not return a new array
            movieMenu(movie.title);
        });
    })
    .catch((err) => console.error(err));        // this is the error handler to the promise, if the for instance the fetch goes wrong 
                                                // the catch block gets executed
}





// SECOND SECTION TO DISPLAY THE MOVIES ONE BY ONE AND THE FORM TO ADD A MOVIE

//First Task to display the movies one by one together with the buttons

// We create an aaray to store movie data globally
let movieData = []; 
let currentIndex = 0; // Track the current movie


// Fetch movie data and display the first movie
function fetchMovies() {                                // gets the data from the json data file
  fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(data => {
      movieData = data;                                 // Store the data globally
      displayMovie(movieData[currentIndex]);            // Display the first movie according to the index of the array
    })

    // this is the error handler to the promise, if the for instance the fetch goes wrong 
     // the catch block gets executed
    .catch(err => console.error('Error fetching movies:', err));     
}

// Display movie based on current index
function displayMovie(movie) {
  const imageContainer = document.querySelector('.image-container');   //gets the movie container class as stipulated in the HTML file
  const buttonsDiv = document.querySelector('.buttons');               // gets the buttons nested in div in the HTML file

  // Clear previous content
  // Ensures to leave the container empty to enable render another image
  // This ensures that an image is not duplicated

  imageContainer.innerHTML = '';
  buttonsDiv.innerHTML = '';

  // Creating an image tag to hold the image to be displayed

  const img = document.createElement('img');
  img.src = movie.poster;
  img.alt = movie.title;
  img.className = 'movie-poster';
  imageContainer.appendChild(img);                              //appends the the tag to the image container in the DOM 

  // Navigation and Action Buttons Container 

  const navigationDiv = document.createElement('div');
  navigationDiv.className = 'navigation-buttons';


// 1. Previous Button to enable  navigate to previous image

const prevBtn = document.createElement('button');
prevBtn.textContent = 'Previous Movie';
prevBtn.className = 'movie-btn_previous';
prevBtn.onclick = (event) => {                  // when a user clicks the button the below code blocks gets executed
  event.preventDefault();                       // Prevent the default behavior (e.g., page reload)

  // Now this ensures that the index of the image does not result into a negative sign
  // e.g if the index is 2 and the array length is 5 then
  // (2-1) = (1 +5) = (6%5) = 1 this will display the image with index 1

  currentIndex = (currentIndex - 1 + movieData.length) % movieData.length;
  displayMovie(movieData[currentIndex]);
};
navigationDiv.appendChild(prevBtn);     // appends the previous button to the navigation div tag





// 2. Next Button
const nextBtn = document.createElement('button');    //creates an next button and sets content to next movie
nextBtn.textContent = 'Next Movie';
nextBtn.className = 'movie-btn_next';
nextBtn.onclick = (event) => {                          // when a user clicks the button the below code blocks gets executed
  event.preventDefault();                           // Prevent the default behavior (e.g., page reload)

  // this ensures that if the index is 1 and array length is 5 then
  // (1+1)= 2%5= 2 -- this display the image in index 2
  // it ensures to go through an array in a cycle

  currentIndex = (currentIndex + 1) % movieData.length;
  displayMovie(movieData[currentIndex]);
};
navigationDiv.appendChild(nextBtn);                   // appends the next button to the navigation div

  buttonsDiv.appendChild(navigationDiv);              // appends both the buttons to the DOM

  // Creating Action Buttons Container
  const actionDiv = document.createElement('div');
  actionDiv.className = 'action-buttons';

  // 3. Creating Description Button
  const descriptionBtn = document.createElement('button');
  descriptionBtn.textContent = 'Movie Description';
  descriptionBtn.className = 'movie-btn_description';

  descriptionBtn.onclick = () => {                      //when the button is clicked it outputs the details of the movie each in a newline
    const availableTickets = movie.capacity - movie.tickets_sold;
    alert(`Title: ${movie.title}\n Description: ${movie.description}\n Runtime: ${movie.runtime} minutes\n 
      Showtime: ${movie.showtime}\n Available Tickets: ${availableTickets}`);
  };
  actionDiv.appendChild(descriptionBtn);             //appends the  button to the action div tag

  // 4. Buy Ticket Button
  let availableTickets = movie.capacity - movie.tickets_sold;
  const buyTicketBtn = document.createElement('button');

  // Uses a ternary operator  to check the condition if its true or false and outputs the 
  // correct output according to the results of availabeleTickets

  buyTicketBtn.textContent = availableTickets <= 0 ? 'Sold Out' : `Buy Ticket (${availableTickets} available)`;
  buyTicketBtn.className = 'movie-btn ' + (availableTickets <= 0 ? 'sold-out' : 'buy-ticket');
  buyTicketBtn.disabled = availableTickets <= 0;          // disabled the button when the tickets are bellow zero


  // is a user clicks the buyticket button it checks if the availyableTicket are above 0
  // if it is > 0 the value ot the tickets is decremented by 1 and tickets_sold incremented by 1

  buyTicketBtn.onclick = () => {
    if (availableTickets > 0) {
      availableTickets -= 1;
      movie.tickets_sold += 1;          // Update the tickets_sold property locally
      buyTicketBtn.textContent = availableTickets <= 0 ? 'Sold Out' : `Buy Ticket (${availableTickets} available)`;
      buyTicketBtn.disabled = availableTickets <= 0;
      alert(`You bought a ticket for ${movie.title}!`);
    }
    if (availableTickets <= 0) {   // if the tickets are below zero, the button outputs sold out
      buyTicketBtn.classList.add('sold-out');
    }
  };     

  // appends the buttons to the DOM

  actionDiv.appendChild(buyTicketBtn);

  buttonsDiv.appendChild(actionDiv);
}



// Initial fetch call when the page loads
// Ensures to render the callback function after the DOM content loaded the rest of the body apart from the function fetchMovies 

document.addEventListener('DOMContentLoaded', fetchMovies);




// The second task on the section is to add a movie via the form using POST

function handleSubmit(e) {
  e.preventDefault();       // Prevents form from reload

  const form = e.target;

  // Getting form data
  const films = {
    title: form.title.value.trim(),
    runtime: form.runtime.value.trim(),
    capacity: form.capacity.value.trim(),
    showtime: form.showtime.value.trim(),
    tickets_sold: form.tickets_sold.value.trim(),
    description: form.description.value.trim(),
    poster: form.poster.value.trim(),
  };

  // Checking if all fields are filled in the form 
  // if not user gets an alert message 


  const isFormValid = Object.values(films).every(value => value !== "");
  if (!isFormValid) {
    alert("Please fill out all fields before submitting.");
    return;
  }

  // Call addMovie to POST the movie data
  addMovie(films);

  // Reset the form after submission to enabale all values to return to empty 
  form.reset();
}

function addMovie(films) {
  fetch('http://localhost:3000/films', {     // fetches the data from the json file
    method: 'POST',                          // specifies the method to be used
    headers: {
      'Content-Type': 'application/json',  // specifying the headers
    },
    body: JSON.stringify(films),           //  This converts the films object (or array) into a JSON-formatted string.

  })
    .then(res => res.json())  // converts the response into a json 
    .then(movie => {
      console.log('Movie added:', movie);
      alert(`Movie "${movie.title}" added successfully!`);   // display this when the movie is posted
    })
    .catch(err => console.error('Error adding movie:', err));
}

// Attach event listener to form
document.querySelector('#movie-form').addEventListener('submit', handleSubmit);






// THIRD SECTION TO DELETE A MOVIE FROM THE MENU USING DELETE



document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {             // The event listener targets the delete button
      const movieId = e.target.dataset.movieId;           // Get the movie ID
      const parentElement = e.target.closest("p");          // Find the parent <p> closest to the button

      if (movieId && parentElement) {            // If the movieId and the parent is found then;
          parentElement.remove();                // Remove movie from DOM
          deleteMovie(movieId);                 // Calls deleteMovie with ID
      } else {
          console.error("Error: Movie ID or parent element not found");  // if the movie id and parent is not found outputs an error message
      }
  }
});

function deleteMovie(id) {
  console.log("Deleting movie with ID:", id);         // Log for debugging
  fetch(`http://localhost:3000/films/${id}`, {         // fetches the data targeting the id
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
  })
      .then((res) => {
          if (!res.ok) {                                      // checks if the response is not okay

              console.error("Failed to delete movie:", res.statusText);  //It provides a short textual description of the HTTP response status code 
                                                                          // res.statusText gives more details about why the deletion failed.
          }
          console.log(`Movie with ID ${id} deleted successfully.`);
          alert(`Movie deleted successfully!`);
      })
      .catch((err) => console.error("Error deleting movie:", err));
}



//SECTION FIVE USING PATCH

// This section is commented to avoid it running every time we lauch the website 
// The user is unable to use the functionality since it is not utilized in the site
// to use the program below, uncomment it


/*

function updateMovieByTitle(title, updatedData) {

  // Fetches all movies to find the movie ID by title

  fetch('http://localhost:3000/films')
    .then((res) => {
      if (!res.ok) {                                                    // if the response is not okay it throws an error
        throw new Error(`Failed to fetch movies: ${res.statusText}`);   // Provides a short textual description of the HTTP response status code 
                                                                        //when error is encountered
      }
      return res.json();                                                 // returns a json file
    })
    .then((movies) => {
      // Find the movie by title
      const movieToUpdate = movies.find((movie) => movie.title === title);  // using find to iterate through the array and find the movie witha specific
                                                                            // title to update
      if (!movieToUpdate) {
        throw new Error(`Movie with title "${title}" not found`);             // if the movie to update is not found, it throws an error
      }

      // Perform the PATCH request to update the movie
      return fetch(`http://localhost:3000/films/${movieToUpdate.id}`, {     // returns fetch with the specific movie id the title matches
        method: 'PATCH',
        headers: {                                                           // specifying the method to be undertaken
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),                                  // converts the  object (or array) promise into a JSON-formatted string.
      });
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to update movie: ${res.statusText}`); // if the response is not okay, throws a n error
      }
      return res.json();                                                // if the response is okay, converts it into a json file
    })
    .then((updatedMovie) => {
      console.log(`Movie updated successfully:`, updatedMovie);
      alert(`Movie "${updatedMovie.title}" updated successfully!`);  // updates the movie  with the given title if all goes well and the title is found
    })
    .catch((err) => {
      console.error('Error updating movie:', err);                    // else is an error is found, we get an error alert message
      alert(`Error updating movie: ${err.message}`);
    });
}

// Example usage where we specify the title of the movie to update and the details to be updated

const titleToUpdate = "Silo"; // Title of the movie to update
const updatedData = {
  runtime: "140", // Example: updating runtime
  capacity: 56,   // Example: updating capacity
};

updateMovieByTitle(titleToUpdate, updatedData);

*/