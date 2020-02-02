let LivingCreature = require('./LivingCreature')

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 8;
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
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            var grEater = new GrassEater(newX, newY, 2);
            grassEaterArr.push(grEater)
            matrix[newY][newX] = this.index;
        }
    }
    move() {
        // var newCell = Math.floor(Math.random() * super.chooseCell(0).length);


        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        this.energy--;
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.y = newY;
            this.x = newX;
        }
        if (this.energy == 0) {
            this.death();
        }
    }
    eat() {
        //var grass = Math.floor(Math.random() * super.chooseCell(1).length);

        var emptyCells = super.chooseCell(1);
        var grass = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (grass) {
            var newX = grass[0];
            var newY = grass[1];
            matrix[newY][newX] = 2;
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            for (var i in grassArr) {
                if (newX === grassArr[i].x && newY === grassArr[i].y) {
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
        } else {
            this.move()
        }
        this.acted = true;
    }
}