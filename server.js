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

grassArr = [];
grassEaterArr = [];
predatorArr = [];
cavalierArr = [];
flyArr = [];

// var m = 100;
// var n = 40;
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
var numbersGrass = 50;//2000
var numbersGrassEater = 5;//200
var numbersPredator = 0;//150
var numbersCavalier = 1;
var numbersFly = 1;//300

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

// matrix = [[0, 1, 0,0, 1, 0, 0],
// [0, 1, 0,0, 1, 1, 0],
// [0, 1, 0,0, 1, 1, 0],
// [0, 1, 0,0, 1, 1, 0],
// [0, 1, 0,0, 1, 1, 0],
// ]

io.sockets.emit("send matrix", matrix)


Grass = require("./modules/Grass")
GrassEater = require("./modules/GrassEater")
Predator = require("./modules/Predator")
Cavalier = require("./modules/Cavalier")
Fly = require("./modules/Fly")




function createObject(matrix) {
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
io.on('connection', function () {
    createObject(matrix);
});
setInterval(game, 1000)



var Snowflake = (function() {

    var flakes;
    var flakesTotal = 250;
    var wind = 0;
    var mouseX;
    var mouseY;

    function Snowflake(size, x, y, vx, vy) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.hit = false;
        this.melt = false;
        this.div = document.createElement('div');
        this.div.classList.add('snowflake');
        this.div.style.width = this.size + 'px';
        this.div.style.height = this.size + 'px';
    }

    Snowflake.prototype.move = function() {
        if (this.hit) {
            if (Math.random() > 0.995) this.melt = true;
        } else {
            this.x += this.vx + Math.min(Math.max(wind, -10), 10);
            this.y += this.vy;
        }

        // Wrap the snowflake to within the bounds of the page
        if (this.x > window.innerWidth + this.size) {
            this.x -= window.innerWidth + this.size;
        }

        if (this.x < -this.size) {
            this.x += window.innerWidth + this.size;
        }

        if (this.y > window.innerHeight + this.size) {
            this.x = Math.random() * window.innerWidth;
            this.y -= window.innerHeight + this.size * 2;
            this.melt = false;
        }

        var dx = mouseX - this.x;
        var dy = mouseY - this.y;
        this.hit = !this.melt && this.y < mouseY && dx * dx + dy * dy < 2400;
    };

    Snowflake.prototype.draw = function() {
        this.div.style.transform =
        this.div.style.MozTransform =
        this.div.style.webkitTransform =
            'translate3d(' + this.x + 'px' + ',' + this.y + 'px,0)';
    };

    function update() {
        for (var i = flakes.length; i--; ) {
            var flake = flakes[i];
            flake.move();
            flake.draw();
        }
        requestAnimationFrame(update);
    }

    Snowflake.init = function(container) {
        flakes = [];

        for (var i = flakesTotal; i--; ) {
            var size = (Math.random() + 0.2) * 12 + 1;
            var flake = new Snowflake(
                size,
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight,
                Math.random() - 0.5,
                size * 0.3
            );
            container.appendChild(flake.div);
            flakes.push(flake);
        }
    
    container.onmousemove = function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        wind = (mouseX - window.innerWidth / 2) / window.innerWidth * 6;
    };

      container.ontouchstart = function(event) {
          mouseX = event.targetTouches[0].clientX;
          mouseY = event.targetTouches[0].clientY;
          event.preventDefault();
    };

    window.ondeviceorientation = function(event) {
        if (event) {
            wind = event.gamma / 10;
        }
    };
    
    update();
    };

    // return Snowflake;   
    io.sockets.emit("send matrix", matrix);


}());

function kill() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 6;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
// io.on('connection', function (socket) {
//     socket.on("snow", Snowflake);
// });



io.on('connection', function (socket) {
//    createObject();
    socket.on("kill", kill);
});