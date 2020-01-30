var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html')
})

server.listen(3000)

matrix = [];

var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var cavalierArr = [];
var flyArr = [];

var m = 100;
var n = 40;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

for (var i = 0; i < n; i++) {
    matrix[i] = [];
    for (var j = 0; j < m; j++) {
        matrix[i][j] = 0;
    }
}
var numbersGrass = 2000;
var numbersGrassEater = 200;
var numbersPredator = 150;
var numbersCavalier = 16;
var numbersFly = 300;

while (numbersGrass > 0) {
    y = getRandomInt(n);
    x = getRandomInt(m);
    var rect = matrix[y][x]
    if (rect == 0) {
        matrix[y][x] = 1;
        numbersGrass--;
    }
}
while (numbersGrassEater > 0) {
    y = getRandomInt(n);
    x = getRandomInt(m);
    var rect = matrix[y][x]
    if (rect == 0) {
        matrix[y][x] = 2;
        numbersGrassEater--;
    }
}
while (numbersPredator > 0) {
    y = getRandomInt(n);
    x = getRandomInt(m);
    var rect = matrix[y][x]
    if (rect == 0) {
        matrix[y][x] = 3;
        numbersPredator--;
    }
}
while (numbersCavalier > 0) {
    y = getRandomInt(n);
    x = getRandomInt(m);
    var rect = matrix[y][x]
    if (rect == 0) {
        matrix[y][x] = 4;
        numbersCavalier--;
    }
}
while (numbersFly > 0) {
    y = getRandomInt(n);
    x = getRandomInt(m);
    var rect = matrix[y][x]
    if (rect == 0) {
        matrix[y][x] = 5;
        numbersFly--;
    }
}

io.sockets.emit("send matrix", matrix)


Grass = require("./Grass")
GrassEater = require("./GrassEater")
Predator = require("./Predator")
Cavalier = require("./Cavalier")
Fly = require("./Fly")

function createObject(matrix) {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            var obj = matrix[y][x]
            if (obj == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (obj == 2) {
                var grEater = new GrassEater(x, y, 2);
                grassEaterArr.push(grEater)

            }
            else if (obj == 3) {
                var pred = new Predator(x, y, 3);
                predatorArr.push(pred)

            }
            else if (obj == 4) {
                var cav = new Cavalier(x, y, 4);
                cavalierArr.push(cav)

            }
            else if (obj == 5) {
                var fl = new Fly(x, y, 5);
                flyArr.push(fl)
            }
        }
    }
    io.sockets.emit("send matrix", matrix)
}

function game() {
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


    // if (grassArr.length < 100) {
    //     for (var i = 0; i < 200; i++) {
    //         y = getRandomInt(n);
    //         x = getRandomInt(m);
    //         var cell = matrix[y][x]
    //         if (cell == 0) {
    //             var newGr = new Grass(y, x, 1);
    //             grassArr.push(newGr);
    //             matrix[y][x] = 1
    //         }
    //     }
    // }
    io.sockets.emit("send matrix", matrix)
}

setInterval(game, 1000)

io.on('connection', function(){
    createObject(matrix)
})