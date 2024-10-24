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
			activeTile.setAttribute("data-revealed", "true");

			activeBoard = null;
			awaitingEndOfMove = false;
			revealedCount += 2;

			if (revealedCount === tileCount) {
				alert("You won!.");
			}

			return;
		}

		awaitingEndOfMove = true;

		setTimeout(() => {
			activeBoard.textContent = "?"; 
			element.textContent = "?"; 

			awaitingEndOfMove = false;
			activeTile = null;
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


// let counter = 0;
// const timer = setInterval(() => {
// 	counter++;
// 	console.log(counter);
//     console.log('Interval executed every 1 second');
// document.querySelector('.timer').innerHTML = counter;
// }, 1000)
