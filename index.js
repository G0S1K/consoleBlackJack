import CARDS from "./const.js";

// const getButton = document.getElementById("get");
// const foldButton = document.getElementById("fold");
// const croupierSpan = document.getElementById("croupier");
// const playerSpan = document.getElementById("player");

let countPlayer = 0;
let cardNamesPlayer = "";
let cardNamesCroupier = "";
let countCroupier = 0;
let move = 1;

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const chackIsAceForPlayer = () => {
	let count;
	let countCards;

	cardNamesPlayer.split(" ").forEach((item) => {
		if (item === "Ace") count++;
	});

	if (count !== 0) countCards += countPlayer + count * 10;

	if (countCards < 22) countPlayer = countCards;
};

const moveCroupier = (card) => {
	cardNamesCroupier += CARDS[card].name;
	countCroupier += CARDS[card].value;
};

const movePlayer = (card) => {
	cardNamesPlayer += CARDS[card].name;
	countPlayer += CARDS[card].value;
};

const checkCountForCroupier = () => {
	if (
		countCroupier === 17 ||
		(countCroupier > 17 && countCroupier < 22) ||
		countCroupier > 21
	) {
		return false;
	} else {
		let count = 0;
		let countCards = countCroupier;
		cardNamesCroupier.split(" ").forEach((item) => {
			if (item === "Ace") count++;
		});

		if (count !== 0) countCards += countCards + count * 10;

		if (
			countCards === 17 ||
			(countCards > 17 && countCards < 22) ||
			countCards > 21
		) {
			return false;
		}
		countCroupier = countCards;
		return true;
	}
};

do {
	if (move === 1) {
		moveCroupier(randomIntFromInterval(0, 13));
		moveCroupier(randomIntFromInterval(0, 13));
		movePlayer(randomIntFromInterval(0, 13));
		move++;
		console.log("Player: " + cardNamesPlayer);
		console.log("Croupier: " + cardNamesCroupier);
		continue;
	}

	movePlayer(randomIntFromInterval(0, 13));

	console.log("Player: " + cardNamesPlayer);
	console.log("Croupier: " + cardNamesCroupier);

	move++;
} while (confirm("берете?"));

chackIsAceForPlayer();

while (checkCountForCroupier()) {
	moveCroupier(randomIntFromInterval(0, 13));
	console.log("Player: " + cardNamesPlayer);
	console.log("Croupier: " + cardNamesCroupier);
}

console.log(countPlayer);
console.log(countCroupier);

if (
	(countPlayer === 21 && countCroupier === 21) ||
	(countPlayer > 21 && countCroupier > 21)
) {
	console.log("Ничья");
} else if (
	(countPlayer === 21 || countPlayer > countCroupier) &&
	countCroupier < 22 &&
	countPlayer < 22
) {
	console.log("Вы выиграли");
} else console.log("Вы проиграли");
