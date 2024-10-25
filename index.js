const express = require('express');
const fs = require('node:fs');
//const uuid = require('uuid/v1');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();


const app = express();
const port = 3001;

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


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
