let LivingCreature = require('./LivingCreature')

module.exports = class Predator extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 25;

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
    death() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
    mul() {
        var newCell =  Math.floor(Math.random() * this.chooseCell(0).length);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            var pred = new Predator(newX, newY, this.index);
            predatorArr.push(pred)
            matrix[newY][newX] = this.index;
        }
    }
    move() {
        var newCell =  Math.floor(Math.random() * this.chooseCell(0).length);
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
        var grassit =  Math.floor(Math.random() * this.chooseCell(2).length);
        if (grassit) {
            var newX = grassit[0];
            var newY = grassit[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.energy++;
            if (this.energy >= 30) {
                this.mul();
                this.energy = 25;
            }
        }
        else {
            this.move()
        }
    }
}