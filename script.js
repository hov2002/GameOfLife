var m = 100;
var n = 40;
var side = 18;
var matrix = [];
var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var cavalierArr = [];
var flyArr = [];

function setup() {
	frameRate(5);
	createCanvas(m * side, n * side);
	background('#acacac');


	for (var i = 0; i < n; i++) {
		matrix[i] = [];
		for (var j = 0; j < m; j++) {
			matrix[i][j] = 0;
		}
	}
	console.log(matrix)

	var numbersGrass = 2000;
	var numbersGrassEater = 200;
	var numbersPredator = 150;
	var numbersCavalier = 16;
	var numbersFly = 300;

	while (numbersGrass > 0) {
		y = int(random(0, n));
		x = int(random(0, m));
		var rect = matrix[y][x]
		if (rect == 0) {
			matrix[y][x] = 1;
			numbersGrass--;
		}
	}
	while (numbersGrassEater > 0) {
		y = int(random(0, n));
		x = int(random(0, m));
		var rect = matrix[y][x]
		if (rect == 0) {
			matrix[y][x] = 2;
			numbersGrassEater--;
		}
	}
	while (numbersPredator > 0) {
		y = int(random(0, n));
		x = int(random(0, m));
		var rect = matrix[y][x]
		if (rect == 0) {
			matrix[y][x] = 3;
			numbersPredator--;
		}
	}
	while (numbersCavalier > 0) {
		y = int(random(0, n));
		x = int(random(0, m));
		var rect = matrix[y][x]
		if (rect == 0) {
			matrix[y][x] = 4;
			numbersCavalier--;
		}
	}
	while (numbersFly > 0) {
		y = int(random(0, n));
		x = int(random(0, m));
		var rect = matrix[y][x]
		if (rect == 0) {
			matrix[y][x] = 5;
			numbersFly--;
		}
	}




	for (var y = 0; y < matrix.length; ++y) {
		for (var x = 0; x < matrix[y].length; ++x) {
			if (matrix[y][x] == 1) {
				var gr = new Grass(x, y);
				grassArr.push(gr);
			}
			else if (matrix[y][x] == 2) {
				var grEater = new GrassEater(x, y, 2);
				grassEaterArr.push(grEater)

			}
			else if (matrix[y][x] == 3) {
				var pred = new Predator(x, y, 3);
				predatorArr.push(pred)

			}
			else if (matrix[y][x] == 4) {
				var cav = new Cavalier(x, y, 4);
				cavalierArr.push(cav)

			}
			else if (matrix[y][x] == 5) {
				var fl = new Fly(x, y, 5);
				flyArr.push(fl)

			}
		}
	}
}




console.log(grassArr);
console.log(grassEaterArr);
console.log(predatorArr)





function draw() {

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

	for (var i in grassArr) {
		grassArr[i].mul();
	}
	for (var j in grassEaterArr) {
		grassEaterArr[j].eat()
	}
	for (var k in predatorArr) {
		predatorArr[k].eat()
	}
	for (var m in cavalierArr) {
		cavalierArr[m].eat()
	}
	for (var n in flyArr) {
		flyArr[n].snap()
	}



	if (grassArr.length < 100) {
		for (var i = 0; i < 200; i++) {
			y = int(random(0, n));
			x = int(random(0, m));
			var cell = matrix[y][x]
			if (cell == 0) {
				var newGr = new Grass(y, x, 1);
				grassArr.push(newGr);
				matrix[y][x] = 1
			}
		}
	}
}

