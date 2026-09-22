//fct pour verifier que la tete touche pas le corps
function collision(head, array) {
	for (let i = 1; i < array.length; i++) {
		if (head.x === array[i].x && head.y === array[i].y)
			return true;
	}
	return false;
}

function resetGame() {
	snake = [{ x: 120, y: 120 }];
	direction = "RIGHT";
	score = 0;
	scoreDisplay.innerText = score;
	food = createFood();
	poisons = createPoison();
	startButton.style.display = "block";
	//location.reload();
}

function checkGameOver(newHead) {
	// collision des poison
	for (let p = 0; p < poisons.length; p++) {
		if (newHead.x === poisons[p][0].x && newHeadge.y === poisons[p][0].y) {
			return "Game over! Cause of death: Poison";
		}
	}

	//autres collisions
	if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 ||
		newHead.y >= canvas.height || collision(newHead, snake)) {
		return "Game over! Cause of death: Collision";
	}

	return null; // Pas de collision
}

