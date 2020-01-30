let LivingCreature = require('./LivingCreature')

module.exports = class GrassEater extends LivingCreature{
    constructor(x, y, index) {
    super(x, y, index)
    this.energy = 8;
    }
    getNewCoordinates() {
        this.directions = [

            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    death() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }

    }
    mul() {
        var newCell = Math.floor(Math.random() * Math.floor(this.chooseCell(0)));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            var grEater = new GrassEater(newX, newY, 2);
            grassEaterArr.push(grEater)
            matrix[newY][newX] = this.index;
        }
    }
    move() {
        var newCell = Math.floor(Math.random() * Math.floor(this.chooseCell(0)));
        this.energy--;
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
        }
        if (this.energy == 0) {
            this.death();
        }
    }
    eat() {
        var grass = Math.floor(Math.random() * Math.floor(this.chooseCell(1)));
        if (grass) {
            var newX = grass[0];
            var newY = grass[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.energy++;
            if (this.energy >= 15) {
                this.mul();
                this.energy = 6;
            }
        }
        else {
            this.move()
        }
        this.acted = true;
    }
}






