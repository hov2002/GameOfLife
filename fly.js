let LivingCreature = require('./LivingCreature')

module.exports = class Fly extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 30;
        this.multiply = 0

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y - 0],
            [this.x - 1, this.y - 0],
            [this.x, this.y - 0],
            [this.x + 1, this.y - 0],
            [this.x + 2, this.y - 0],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }
    
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


    move() {
        var newCell1 =  this.chooseCell(0)
        var newCell2 = this.chooseCell(1)
        var newCell3 = newCell1.concat(newCell2)
        var newCell = Math.floor(Math.random() * newCell3.length)

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.y = newY;
            this.x = newX;
        }else {
            this.death()
        }
    }

    death() {
        matrix[this.y][this.x] = 0;
        for (var i in flyArr) {
            if (this.x == flyArr[i].x && this.y == flyArr[i].y) {
                flyArr.splice(i, 1);
                break;
            }
        }
    }      
    snap() {
        this.energy--
        if (this.energy == 0) {
            this.death()
        }

        var newCell1 =  this.chooseCell(2)
        var newCell2 = this.chooseCell(3)
        var newCell3 = newCell1.concat(newCell2)
        var newCell = Math.floor(Math.random() * newCell3.length)

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 0;
        }
        else {
            this.move()
        }

    }
}