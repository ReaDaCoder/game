const gameBoard = document.querySelector(".game-board");
const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const alphabetsPicklist = [...alphabets, ...alphabets];
const tileCount = alphabetsPicklist.length;


let revealedCount = 0;
let activeBoard = null;
let awaitingEndOfMove = false;

function buildTile(alphabet) {
	const element = document.createElement("div");

	element.classList.add("tile");
	element.setAttribute("data-alphabet", alphabet);
	element.setAttribute("data-revealed", "false");
	element.textContent = "?"; 
	element.style.display = "flex";
	element.style.justifyContent = "center";

	element.addEventListener("click", () => {
		const revealed = element.getAttribute("data-revealed");

		if (
			awaitingEndOfMove
			|| revealed === "true"
			|| element === activeBoard
		) {
			return;
		}

		element.textContent = alphabet;

		if (!activeBoard) {
			activeBoard = element;

			return;
		}

		const alphabetToMatch = activeBoard.getAttribute("data-alphabet");

		if (alphabetToMatch === alphabet) {
			element.setAttribute("data-revealed", "true");
			activeBoard.setAttribute("data-revealed", "true");

			activeBoard = null;
			awaitingEndOfMove = false;
			revealedCount += 2;

			if (revealedCount === tileCount) {
				alert("You won!.");
				let player = prompt("Enter your name?");
				window.sharedInput = player;
			}

			return;
		}

		awaitingEndOfMove = true;

		setTimeout(() => {
			activeBoard.textContent = "?"; 
			element.textContent = "?"; 

			awaitingEndOfMove = false;
			activeBoard = null;
		}, 1000);
	});

	return element;
}


for (let i = 0; i < tileCount; i++) {
	const randomIndex = Math.floor(Math.random() * alphabetsPicklist.length);
	const alphabet = alphabetsPicklist[randomIndex];
	const tile = buildTile(alphabet);

	alphabetsPicklist.splice(randomIndex, 1);
	gameBoard.appendChild(tile);
}



// import axios from 'axios';
 
// axios.post('http://localhost:3001/userScore',{
//      playerScore: 
//         {
//             player:'',
//             score:0,
//         }
    
// })

// Prompt for score
// const promptForScore = () => {
//     const username = prompt('Enter your username:');
//     if (username) {
//         saveScore(username, elapsedTime);
//     }
// };

// Save score
const saveScore = (username, time) => {
    fetch('/api/game/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, time }),
    })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error('Error:', error));
};


function start(){
let counter = 0;
const timer = setInterval(() => {
	counter++;
	console.log(counter);
    console.log('Interval executed every 1 second');
document.querySelector('.timer').innerHTML = counter;
}, 1000)

}

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", start);


// if(counter === 60){
	
// }