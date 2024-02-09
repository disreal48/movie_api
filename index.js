const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'), // import built in node modules fs and path 
  path = require('path');

const app = express();

//Log requests using morgan
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

let movies = [
  {
    id: 1,
    title: "Forrest Gump",
    year: "1994",
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    year: "1994",
  },
  {
    id: 3,
    title: "Mary and Max",
    year: "2009",
  },
  {
    id: 4,
    title: "Joker",
    year: "2019",
  },
  {
    id: 5,
    title: "Annie Hall",
    year: "1977",
  },
  {
    id: 6,
    title: "Beau is Afraid",
    year: "2018",
  },
  {
    id: 7,
    title: "The Shining",
    year: "1980",
  },
  {
    id: 8,
    title: "The Dark Knight",
    year: "2008",
  },
  {
    id: 9,
    title: "Shortbus",
    year: "2006",
  },
  {
    id: 10,
    title: "Requiem for a Dream",
    year: "2000",
  },
];

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my movie database!");
});

app.use(express.static("public"));

// GET all movies
app.get("/movies", (req, res) => {
  res.json(movies);
});

// GET a movie by title
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.title === req.params.title }));
});

// Get a description of a genre
app.get('/movies/genres/:genre', (req, res) => {
  res.send('Successful GET request returning information about the genre ' + req.params.genre);
});

// Get a description of a director
app.get('/movies/directors/:director', (req, res) => {
  res.send('Successful GET request returning information about the director ' + req.params.director);
});

//Create a new user
app.post('/users', (req, res) => {
  res.send('Successfully created a new user');
});

//Update a user's information
app.put('/users/:username/username/:newUsername', (req, res) => {
  res.send('Successfully updated the username from ' + req.params.username + ' to ' + req.params.newUsername);
});

//Add a movie to a user's list of favorites
app.put('/users/:username/favoritemovies/:newFavoriteMovie', (req, res) => {
  res.send('Successfully added ' + req.params.newFavoriteMovie + ' to ' + req.params.username + '\'s favorite movies');
});

//Delete a movie from a user's list of favorites
app.delete('/users/:username/favoritemovies/:movieToDelete', (req, res) => {
  res.send('Successfully deleted ' + req.params.movieToDelete + ' from ' + req.params.username + '\'s favorite movies');
});

//Delete a user
app.delete('/users/:username', (req, res) => {
  res.send('Successfully deleted user ' + req.params.username);
});

//Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
