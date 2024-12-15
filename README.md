#   Communicating with the Server Using JSON

* The program illustrates communication with the server using JSON methods like POST, DELETE and PATCH.
* This is done by fetching data from a db.json file after lauching JSON server in the local terminal.
* It builds a website that enables the user to interact with the server and be able to manipulate the DOM 
elements.
* The user can view the data in the json file, delete data, add and update the data in the json file.
* It has four file to enable the whole program to work effectively as follows:
  
      1. HTML file to structure the DOM and give the website a skeleton to work with.
      2. CSS fileto structure the elements that appear in the DOM via the HTML file
      3. JSON file to store data to be accessed by the JSON server.
      4. JS file to access and modify the JSON file.

## HTML File

* Gives the structure of the DOM where all elemets get aligned and structured
* It is divided into four sections:

       1. First Section which comprises of the Header elements, the head title of the  site and the logo.
  
       2. Second section is the Menu section that displays all Movie titles available in the json file.
  
       3. Third Section displays each movie **Poster** with navigati buttons for each movie whcih are created in  the js file and appended into the DOM. 
       4. Additionally, it displays a form that a user can use to add any given movie of their liking if the ones available in the Menu aren't their preferences.
       5. The Last Section the Footer, which display the author of the site and rights.


## CSS File
* It styles all the elements available in the DOM including the elements created in the js file.
* Gives the site a good look and makes it presentable.


## JSON File
* Contains all the data to be used in the site in an object data type format.
* The data is accessed by first launching JSON server in the terminal using ``json-server --watch db.json``


## JS File




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
