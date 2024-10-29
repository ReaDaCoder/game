const express = require('express');
const path = require('path');

const fs = require('node:fs');
//const uuid = require('uuid/v1');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

const app = express();
const port = 3001;
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log('Views directory:', path.join(__dirname, 'views'));


let playerScore =[

]
// let player = window.sharedInput;

app.get("/userScore", (req, res) => {
  res.send(playerScore);
    res.send("Hello from Express!");
  });

  app.post('/userScore', (req, res) =>{
    const {player, score} = req.body;

    playerScore.push({player, score});

    res.send(`${player}'s score has been added!`)
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
