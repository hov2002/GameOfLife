var socket = io();
var side = 50;
// var m = 100;
// var n = 40;
var m = 10;
var n = 10;

function setup() {
	createCanvas(m * side, n * side);
	background('#acacac');
	imgGrass = loadImage('images/grass.jpg');
	imgGrassEater = loadImage('images/lamb.png');
	imgPredator = loadImage('images/walf.png');
	imgCavalier = loadImage('images/cava.png');
	imgfly = loadImage('images/bee.png');
	gerez = loadImage('images/gerezman.png');
}
function nkarel(matrix) {
	noStroke()
	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] == 1) {
				image(imgGrass, x * side, y * side, side, side);
			} else if (matrix[y][x] == 2) {
				image(imgGrassEater, x * side, y * side, side, side);
			} else if (matrix[y][x] == 3) {
				image(imgPredator, x * side, y * side, side, side);
			} else if (matrix[y][x] == 4) {
				image(imgCavalier, x * side, y * side, side, side);
			} else if (matrix[y][x] == 5) {
				image(imgfly, x * side, y * side, side, side);
			} else if (matrix[y][x] == 5) {
				image(gerez, x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 0) {
				fill("#acacac");
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 6) {
				fill("#lightblue");
				rect(x * side, y * side, side, side);
			}
		}
	}
}

socket.on("send matrix", nkarel)

