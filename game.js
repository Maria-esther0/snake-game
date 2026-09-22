
function startGame() {
	startButton.style.display = "none";

	//reglé le problem de undefined ?
	food = createFood();
	poisons = spawnPoisons(3);

	timer = setInterval(draw_evtg, 150);//lance le jeu
}
startButton.addEventListener("click", startGame);


function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Dessin de la grille
	ctx.strokeStyle = "#2f352f80";
	//ctx.strokeStyle = #ff0005ff

	//"F00"
	//"FF 00 00"

	for (let x = 0; x <= canvas.width; x += GRIDSIZE) {
		ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
	}
	for (let y = 0; y <= canvas.height; y += GRIDSIZE) {
		ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
	}

	// serpent
	ctx.fillStyle = "green";
	for (let i = 0; i < snake.length; i++) {
		ctx.fillRect(snake[i].x, snake[i].y, GRIDSIZE, GRIDSIZE);
	}

	// pomme
	ctx.fillStyle = "red";
	ctx.fillRect(food.x, food.y, GRIDSIZE, GRIDSIZE);

	// poisons
	ctx.fillStyle = "black";
	for (let p = 0; p < poisons.length; p++) {
		for (let i = 0; i < poisons[p].length; i++) {
			ctx.fillRect(poisons[p][i].x, poisons[p][i].y, GRIDSIZE, GRIDSIZE);
		}
	}
}

function updatePosition() {
	let newHead = { x: snake[0].x, y: snake[0].y };
	if (direction == "RIGHT") newHead.x += GRIDSIZE;
	else if (direction == "LEFT") newHead.x -= GRIDSIZE;
	else if (direction == "UP") newHead.y -= GRIDSIZE;
	else if (direction == "DOWN") newHead.y += GRIDSIZE;

	return newHead;
}

function draw_evtg() {
	render();

	let newHead = updatePosition();

	//gerer nourriture
	if (newHead.x === food.x && newHead.y === food.y) {
		score++;
		scoreDisplay.innerText = score;
		food = createFood();
		poisons = spawnPoisons(3);
	} else {
		snake.pop();
	}
	snake.unshift(newHead);

	let lossMessage = checkGameOver(newHead);
	if (lossMessage) {
		clearInterval(timer);
		setTimeout(() => {
			alert(lossMessage);
			resetGame();
		}, 100);
	}
}

document.addEventListener("keydown", function (event) {
	if (timer === null)
		startGame();

	if ((event.key === "ArrowUp" || event.key.toLowerCase() === "w") && direction !== "DOWN")
		direction = "UP";
	else if ((event.key === "ArrowDown" || event.key.toLowerCase() === "s") && direction !== "UP")
		direction = "DOWN";
	else if ((event.key === "ArrowLeft" || event.key.toLowerCase() === "a") && direction !== "RIGHT")
		direction = "LEFT";
	else if ((event.key === "ArrowRight" || event.key.toLowerCase() === "d") && direction !== "LEFT")
		direction = "RIGHT";
});

draw_evtg(); //comme ça la map est pas vide avant de start game

//moins de delais
//plusieurs pommes
//separer les fonctions
//function draw_evtg()
//fix poisons, serpent meurt pas
