const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const GRIDSIZE = 20;
let snake = [
	{ x: 120, y: 120 }
];
let direction = "RIGHT";
let timer = null;
//let food = createFood();
let food = null;
//let poison = createPoison();
//let poisons = spawnPoisons(3);
let poisons = [];
let score = 0;
const scoreDisplay = document.getElementById("scoreValue");
const startButton = document.getElementById("startButton");
const levelMenu = document.getElementById("levelMenu");
