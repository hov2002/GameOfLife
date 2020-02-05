var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs")
app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html')
})
server.listen(3000)

weath = "winter";
Grass = require("./modules/Grass")
GrassEater = require("./modules/GrassEater")
Predator = require("./modules/Predator")
Cavalier = require("./modules/Cavalier")
Fly = require("./modules/Fly")
matrix = [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
cavalierArr = [];
flyArr = [];

var m = 10;
var n = 10;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
for (var i = 0; i < n; i++) {
    matrix[i] = [];
    for (var j = 0; j < m; j++) {
        matrix[i][j] = 0;
    }
}
var numbersGrass = 50;
var numbersGrassEater = 5;
var numbersPredator = 1;
var numbersCavalier = 1;
var numbersFly = 1;

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

function createObject() {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            var obj = matrix[y][x]
            if (obj == 1) {
                obj = 1
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (obj == 2) {
                obj = 2
                var grEater = new GrassEater(x, y, 2);
                grassEaterArr.push(grEater)
            }
            else if (obj == 3) {
                obj = 3
                var pred = new Predator(x, y, 3);
                predatorArr.push(pred)
            }
            else if (obj == 4) {
                obj = 4
                var cav = new Cavalier(x, y, 4);
                cavalierArr.push(cav)
            }
            else if (obj == 5) {
                obj = 5
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
    io.sockets.emit("send matrix", matrix)
}

setInterval(game, 1000)



//functions





function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

io.on('connection', function (socket) {
    createObject();
   // socket.on('kill', kill)
});

var statistics = {};
setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.cavalier = cavalierArr.length;
    statistics.fly = flyArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)