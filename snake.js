const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 20;
let snake = [
	{ x: 120, y: 120 }
];
let direction = "RIGHT";
let a;
let food = createFood();
//let poison = createPoison();
let poisons = spawnPoisons(3);
let score = 0;
const scoreDisplay = document.getElementById("scoreValue");
const startButton = document.getElementById("startButton");
const levelMenu = document.getElementById("levelMenu");

//fct pour verifier que la tete touche pas le corps
function collision(head, array) {
	for (let i = 1; i < array.length; i++) {
		if (head.x === array[i].x && head.y === array[i].y)
			return true;
	}
	return false;
}

function startGame() {
	startButton.style.display = "none";
	a = setInterval(draw, 100);//lance le jeu
}
startButton.addEventListener("click", startGame);
draw(); //comme ça la map est pas vide avant de start game

function createFood() {
	let x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
	let y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
	//check si la pomme est dans dans la meme position que le serpent
	for (let i = 0; i < snake.length; i++) {
		if (snake[i].x === x && snake[i].y === y) {
			return createFood(); //si oui, on relance
		}
	}
	return { x: x, y: y };
}

function createPoison() {
	let x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
	let y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;

	for (let i = 0; i < snake.length; i++) {
		if (snake[i].x === x && snake[i].y === y) {
			return createPoison();
		}
	}
	if (x === food.x && y === food.y) //check si pomme et poison sont pas au meme endroit
		return createPoison

	let poisonBody = [];
	for (let i = 0; i < 1; i++) {
		poisonBody.push({ x: x, y: y + (i * gridSize) });
	}
	return poisonBody;
}

function spawnPoisons(nbr) {
	let allPoisons = [];
	for (let i = 0; i < nbr; i++) {
		allPoisons.push(createPoison());
	}
	return allPoisons;
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = "#2f352fff";
	ctx.lineWidth = 1;

	for (let x = 0; x <= canvas.width; x += gridSize) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, canvas.height);
		ctx.stroke();
	}
	for (let y = 0; y <= canvas.height; y += gridSize) {
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(canvas.width, y);
		ctx.stroke();
	}
	//serpent
	ctx.fillStyle = "green";
	for (let i = 0; i < snake.length; i++) {
		ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
	}
	//pomme
	ctx.fillStyle = "red";
	ctx.fillRect(food.x, food.y, gridSize, gridSize);
	//poison
	ctx.fillStyle = "black";
	for (let p = 0; p < poisons.length; p++) {
		for (let i = 0; i < poisons[p].length; i++) {
			ctx.fillRect(poisons[p][i].x, poisons[p][i].y, gridSize, gridSize);
		}
	}
	//ctx.fillRect(poisons[0].x, poisons[0].y, gridSize, gridSize);
	let newHead = { x: snake[0].x, y: snake[0].y };

	if (direction == "RIGHT") newHead.x += gridSize;
	else if (direction == "LEFT") newHead.x -= gridSize;
	else if (direction == "UP") newHead.y -= gridSize;
	else if (direction == "DOWN") newHead.y += gridSize;

	if (newHead.x === food.x && newHead.y === food.y) {
		score++;
		scoreDisplay.innerText = score; //mise a jour du text
		food = createFood();
		poisons = spawnPoisons(3);
	} else {
		snake.pop(); //
	}
	snake.unshift(newHead);

	for (let p = 0; p < poisons.length; p++) {
		if (newHead.x === poisons[p][0].x && newHead.y === poisons[p][0].y) {
			clearInterval(a);
			setTimeout(() => {
				alert("Game over! Cause of death: Poison");
				resetGame();
			}, 100);
			return; //la fonction draw s'arrete car on a perdu
		}
	}

	if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 ||
		newHead.y >= canvas.height || collision(newHead, snake)) {
		clearInterval(a);
		setTimeout(() => {
			alert("Game over! Cause of death: Collision");
			snake = [{ x: 120, y: 120 }];
			direction = "RIGHT";
			score = 0;
			scoreDisplay.innerText = score;
			startButton.style.display = "block"; //le bouton revient
		}, 100);
	}
}

function resetGame() {
	snake = [{ x: 120, y: 120 }];
	direction = "RIGHT";
	score = 0;
	scoreDisplay.innerText = score;
	food = createFood();
	poisons = createPoison();
	startButton.style.display = "block";
	location.reload();
}

document.addEventListener("keydown", function (event) {
	if ((event.key === "ArrowUp" || event.key.toLowerCase() === "w") && direction !== "DOWN")
		direction = "UP";
	else if ((event.key === "ArrowDown" || event.key.toLowerCase() === "s") && direction !== "UP")
		direction = "DOWN";
	else if ((event.key === "ArrowLeft" || event.key.toLowerCase() === "a") && direction !== "RIGHT")
		direction = "LEFT";
	else if ((event.key === "ArrowRight" || event.key.toLowerCase() === "d") && direction !== "LEFT")
		direction = "RIGHT";
});

