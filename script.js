var socket = io();
var side = 18;
var m = 100;
var n = 40;

function setup() {
	createCanvas(m * side, n * side);
	background('#acacac');
}

function nkarel(matrix) {
	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {

			if (matrix[y][x] == 1) {
				fill("green");
				rect(x * side, y * side, side, side);
			} else if (matrix[y][x] == 2) {
				fill("yellow");
				rect(x * side, y * side, side, side);
			} else if (matrix[y][x] == 3) {
				fill("red");
				rect(x * side, y * side, side, side);
			} else if (matrix[y][x] == 4) {
				fill("black");
				rect(x * side, y * side, side, side);
			} else if (matrix[y][x] == 5) {
				fill("darkslateblue");
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 0) {
				fill("#acacac");
				rect(x * side, y * side, side, side);
			}
		}
	}

}

socket.on("send matrix", nkarel)