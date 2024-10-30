const gameBoard = document.querySelector(".game-board");
const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const alphabetsPicklist = [...alphabets, ...alphabets];
const tileCount = alphabetsPicklist.length;

let revealedCount = 0;
let activeBoard = null;
let awaitingEndOfMove = false;
let timeScore = 0;

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
				let score = prompt("Time?");
				if(player){
					scoreBoard(player, score);

					axios.post('http://localhost:3001/api/game/scores', {
						playerScore: {
							player: player,   // or simply `player` if ES6 shorthand is okay
							score: score      // or simply `score`
						}
					})
					.then(response => console.log('Server response:', response.data.message))
					.catch(error => console.error('Error:', error));
					
				}
				//window.sharedInput = player;
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


// axios.post('http://localhost:3001/db',{
//      playerScore: 
//         {
//             player:'',
//             score:0,
//         }
    
// })




function start(){
let counter = 0;
const timer = setInterval(() => {
	counter++;
	console.log(counter);
    console.log('Interval executed every 1 second');
document.querySelector('.timer').innerHTML = counter;
if(revealedCount === tileCount){
	clearInterval(timer);
	}
}, 1000)
}

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", start);


// if(counter === 60){
	
// }s