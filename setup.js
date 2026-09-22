function createFood() {
	let x = Math.floor(Math.random() * (canvas.width / GRIDSIZE)) * GRIDSIZE;
	let y = Math.floor(Math.random() * (canvas.height / GRIDSIZE)) * GRIDSIZE;
	//check si la pomme est dans dans la meme position que le serpent
	for (let i = 0; i < snake.length; i++) {
		if (snake[i].x === x && snake[i].y === y) {
			return createFood(); //si oui, on relance
		}
	}
	return { x: x, y: y };
}

function createPoison() {
	let x = Math.floor(Math.random() * (canvas.width / GRIDSIZE)) * GRIDSIZE;
	let y = Math.floor(Math.random() * (canvas.height / GRIDSIZE)) * GRIDSIZE;

	for (let i = 0; i < snake.length; i++) {
		if (snake[i].x === x && snake[i].y === y) {
			return createPoison();
		}
	}
	if (x === food.x && y === food.y) //check si pomme et poison sont pas au meme endroit
		return createPoison();

	let poisonBody = [];
	for (let i = 0; i < 1; i++) {
		poisonBody.push({ x: x, y: y + (i * GRIDSIZE) });
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
