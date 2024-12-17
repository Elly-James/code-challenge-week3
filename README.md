#   Communicating with the Server Using JSON

* The program illustrates communication with the server using JSON methods like POST, DELETE and PATCH.
* This is done by fetching data from a db.json file after lauching JSON server in the local terminal.
* It builds a website that enables the user to interact with the server and be able to manipulate the DOM 
elements.
* The user can view the data in the json file, delete data, add and update the data in the json file.
* It has four file to enable the whole program to work effectively as follows:
  

     * **HTML** file to structure the DOM and give the website a skeleton to work with.
     * **CSS** fileto structure the elements that appear in the DOM via the HTML file
     * **JSON** file to store data to be accessed by the JSON server.
     * **JS** file to access and modify the JSON file, and used to add all elements created into the DOM

## HTML File

1.  Gives the structure of the DOM where all elemets get aligned and structured
2.   It is divided into four sections:

       * First Section which comprises of the Header elements, the head title of the  site and the logo.
  
       * Second section is the Menu section that displays all Movie titles available in the json file.
  
       * Third Section displays each movie **Poster** with navigati buttons for each movie whcih are created in  the js file and appended into the DOM. 
       * Additionally, it displays a form that a user can use to add any given movie of their liking if the ones available in the Menu aren't their preferences.
       * The Last Section the Footer, which display the author of the site and rights.


## CSS File
* It styles all the elements available in the DOM including the elements created in the js file.
* Gives the site a good look and makes it presentable.


## JSON File
* Contains all the data to be used in the site in an object data type format.
* The data is accessed by first launching JSON server in the terminal using ``json-server --watch db.json``
* This provides a [URL](http://localhost:3000/films) that can be used to refer to the site where one can view all the data in the db.json file


## JS File
1. Thhis is where most of the website tasks are uitlized in code.
2. It utilizes POST, DELETE and PATCH by using fetch to get the data then specifying one of these methods to use on the data fetched.
3. It is divided into sections according to the functionality of the website:
      ### Section one:  Generating the Menu of the Movies

      * On this section, p tags and button tags are created where each button is appended to the paragraph tag as their parent element.
      * The P tags are then appended to the DOM using the id of the div tag that is their ancestor node
      * The p tags holds the title of the movies while the buttons holds the delete, to delete a movie according to the users preferences.
      * An event listener is added to the button menu so that when a user clickws the button, the menu is generated.
      * Fetch is used to fetch the data, and the dot oprator is used to access the titles of the data
      * The button is disabled after the user clicks it to prevent the user from generating the menu numerously.
      
      ### Section two: Displaying each Movie and the Form to add a Movie.

      #### Displaying each Movie
      * An empty array is initialized to store the data globally once fetched.
      * The data is fetched and stored into the global array where the indexes are reffered to using the currentIndex variable initialized globally.
      * In this section each image is supposed to be renderes together with navigation buttons ``previous and next buttons`` and action buttons ``Description and Buy ticket buttons``.
      * The image tags to hold the images are created together with the buttons then appended to the div's in the DOM.
      * Event listeners is added to the buttons where upon being cliked by the user the actions specified gets executed.
      * When a user clicks a buy ticket button, the user will get a notification that the ticket is bought, otherwise if the tickets are all sold out the button will be disabled indicating **sold out**

      #### Form Area

      * The user can add a movie of via the form if they cannot find a movie of their preference on the  menu displayed.
      * In the form, a user must input all the required details of the movie in order to add a given movie.
      * When all the fields are filled, upon clicking submit, a user gets a notification that the given movie has been added successfully and can view it on the menu.
  

      ### Section Three: Deleting a Movie.

      * In this section, an event listener is added to the delete buttons in the menu section which are associated with the titles of the movies.
      * The buttons also references the id's of the movies such that when a user clicks the buttons it references it to the id's of the given title of the movie.
      * Then if the id  of the given movie is found, the delete button and the parent paragraph tags holding the titles of the movies gets removed``deleted`` from the DOM.

      ### Section Four: Updating a given data partially.

      * The data is commented out to avoid the section updating the given data everytime a user opens the site.
      * To utilize the functionality to the program, one must uncomment the section.
      * The section functionality is not utilized on the page for the user, it was done for the backend  functionalities only.
      * The data is fetched according to the specified title of the movie to be updated.
      * When the movie is found, where the title matches the specified given title the movie is updated partially and the details to be updated must be given globally to be accessed by the fuction.
      * Initializing the details to be updated as an object globally enables the program to ulize them anywhere in the code.
      * The method to be used after fetch must be specified.
      


## Prerequisites

* git clone ````git clone <SSH KEY>```` the repository to your local machine in the terminal.

* Lauch JSON server in the terminal using ``json-server --watch db.json``.
  
* To view the data available in the JSON file use the link in the terminal, the one for **Endpoint** ``http://localhost:3000/films``

* Launch index.html in VsCode by running it using browser like ```Chrome,Firefox, Brave and any other``` 
* To view the page well and interact with all the elements, **Keep the JSON server running** 
* The page **Cannot access the json file without the json server running**


### Author: Elly James Komunga
Incase you are stuck or experiencing any error, reach me via ellyjames1999@gmail.com

### Licence 
I have used MIT licence
