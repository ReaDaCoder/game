const express = require('express');
const path = require('path');

const fs = require('node:fs');
//const uuid = require('uuid/v1');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log('Views directory:', path.join(__dirname, 'views'));

// const scoresRoute = require('./public/app');

// app.use('/api/game', scoresRoute);

var data = fs.readFileSync('data.json');
var myObject= JSON.parse(data); 


let playerScore =[

]
// let player = window.sharedInput;

app.get("/userScore", (req, res) => {
  res.send(playerScore);
    res.send("Hello from Express!");
  });

  app.post('/', (req, res) =>{
    const {playerScore} = req.body;

    
    if (playerScore) {
      const { player, score } = playerScore;
      console.log(`Saving score: Player - ${player}, Score - ${score}`);

      // Send a success message back to the client
      res.json({ message: 'Score saved successfully!' });
  } else {
      res.status(400).json({ message: 'Player score data missing' });
  }

    //playerScore.push({player, score});

    //res.send(`${player}'s score has been added!`)
  })

  app.get('/', function(req, res) {
    res.render('displayGame');
  });

  app.get('/', (req, res) => {
    res.render('playerDetails');
  });

  app.post('/submit', (req, res) => {
    const name = req.body.name;
    const score = req.body.score;
  
    res.send(`${name}, your score is (${score}).`);
  });


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
