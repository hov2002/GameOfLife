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
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        var newCell =  Math.random() * ( Math.floor(Math.random() * this.chooseCell(1).length) -  Math.floor(Math.random() * this.chooseCell(0).length) +  Math.floor(Math.random() * this.chooseCell(2).length));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.y = newY;
            this.x = newX;
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

        var newCell =  Math.floor(Math.random() * this.chooseCell(2).length);
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