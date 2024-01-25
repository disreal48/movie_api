const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'), // import built in node modules fs and path 
  path = require('path');

const app = express();

//Log requests using morgan
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

let topMovies = [
  {
    title: "Forrest Gump",
    year: "1994",
  },
  {
    title: "The Shawshank Redemption",
    year: "1994",
  },
  {
    title: "Mary and Max",
    year: "2009",
  },
  {
    title: "Joker",
    year: "2019",
  },
  {
    title: "Annie Hall",
    year: "1977",
  },
  {
    title: "Beau is Afraid",
    year: "2018",
  },
  {
    title: "The Shining",
    year: "1980",
  },
  {
    title: "The Dark Knight",
    year: "2008",
  },
  {
    title: "Shortbus",
    year: "2006",
  },
  {
    title: "Requiem for a Dream",
    year: "2000",
  },
];

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my movie database!");
});

app.use(express.static("public"));

app.get("/movies", (req, res) => {
  res.json(topMovies);
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
