var socket = io();
var side = 40;
var m = 20;
var n = 20;
var weath

function setup() {
	createCanvas(m * side, n * side);
	background('#acacac');
	imgGrassWi = loadImage('images/grass/grassWinter.jpg');
	imgGrassSp = loadImage('images/grass/grassSpring.jpg');
	imgGrassSu = loadImage('images/grass/grassSummer.jpg');
	imgGrassAu = loadImage('images/grass/grassAutumn.jpg');

	imgGrassEaterWi = loadImage('images/lamb/lamb.png');
	imgGrassEaterSp = loadImage('images/lamb/lamb.png');
	imgGrassEaterSu = loadImage('images/lamb/lamb.png');
	imgGrassEaterAu = loadImage('images/lamb/lamb.png');

	imgPredatorWi = loadImage('images/walf/walf.png');
	imgPredatorSp = loadImage('images/walf/walf.png');
	imgPredatorSu = loadImage('images/walf/walf.png');
	imgPredatorAu = loadImage('images/walf/walf.png');
	
	imgCavalierWi = loadImage('images/cava/cava.png');
	imgCavalierSp = loadImage('images/cava/cava.png');
	imgCavalierSu = loadImage('images/cava/cava.png');
	imgCavalierAu = loadImage('images/cava/cava.png');
	
	imgflyWi = loadImage('images/bee/bee.png');
	imgflySp = loadImage('images/bee/bee.png');
	imgflySu = loadImage('images/bee/bee.png');
	imgflyAu = loadImage('images/bee/bee.png');

	gerez = loadImage('images/gerezman.png');
}
socket.on("weather", function (data) {
    weath = data;
})
function nkarel(matrix) {
	noStroke()
	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] == 1) {
				if(weath == "summer") {
					image(imgGrassSu, x * side, y * side, side, side);;
				}else if (weath == "autumn") {
					image(imgGrassAu, x * side, y * side, side, side);;
				}else if (weath == "winter") {
					image(imgGrassWi, x * side, y * side, side, side);;
				}else if (weath == "spring") {
					image(imgGrassSp, x * side, y * side, side, side);;
				}
			} else if (matrix[y][x] == 2) {
				if(weath == "summer") {
					image(imgGrassEaterSu, x * side, y * side, side, side);;
				}else if (weath == "autumn") {
					image(imgGrassEaterAu, x * side, y * side, side, side);;
				}else if (weath == "winter") {
					image(imgGrassEaterWi, x * side, y * side, side, side);;
				}else if (weath == "spring") {
					image(imgGrassEaterSp, x * side, y * side, side, side);;
				}
			} else if (matrix[y][x] == 3) {
				if(weath == "summer") {
					image(imgPredatorSu, x * side, y * side, side, side);;
				}else if (weath == "autumn") {
					image(imgPredatorAu, x * side, y * side, side, side);;
				}else if (weath == "winter") {
					image(imgPredatorWi, x * side, y * side, side, side);;
				}else if (weath == "spring") {
					image(imgPredatorSp, x * side, y * side, side, side);;
				}
			} else if (matrix[y][x] == 4) {
				if(weath == "summer") {
					image(imgCavalierSu, x * side, y * side, side, side);;
				}else if (weath == "autumn") {
					image(imgCavalierAu, x * side, y * side, side, side);;
				}else if (weath == "winter") {
					image(imgCavalierWi, x * side, y * side, side, side);;
				}else if (weath == "spring") {
					image(imgCavalierSp, x * side, y * side, side, side);;
				}
			} else if (matrix[y][x] == 5) {
				if(weath == "summer") {
					image(imgflySu, x * side, y * side, side, side);;
				}else if (weath == "autumn") {
					image(imgflyAu, x * side, y * side, side, side);;
				}else if (weath == "winter") {
					image(imgflyWi, x * side, y * side, side, side);;
				}else if (weath == "spring") {
					image(imgflySp, x * side, y * side, side, side);;
				}
			} else if (matrix[y][x] == 5) {
				image(gerez, x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 0) {
				fill("#acacac");
				rect(x * side, y * side, side, side);
			}
		}
	}
}
socket.on("send matrix", nkarel)


function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addPredator() {
    socket.emit("add predator")
}
function addCavalier(){
    socket.emit("add cavalier")
}
function addFly(){
    socket.emit("add fly")
}
