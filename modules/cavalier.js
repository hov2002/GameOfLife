let LivingCreature = require('./LivingCreature')

module.exports = class Cavalier extends LivingCreature{

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 2],
            [this.x + 1, this.y + 2]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    death() {
        matrix[this.y][this.x] = 0;
        for (var i in cavalierArr) {
            if (this.x == cavalierArr[i].x && this.y == cavalierArr[i].y) {
                cavalierArr.splice(i, 1);
                break;
            }
        }
    }
    mul() {
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

     //   var newCell =  Math.floor(Math.random() * super.chooseCell(0).length);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            var pred = new Cavalier(newX, newY, this.index);
            cavalierArr.push(pred)
            matrix[newY][newX] = this.index;
        }
    }
    move() {
        var emptyCells = this.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    //    var newCell =  Math.floor(Math.random() * super.chooseCell(0).length);
        this.energy--;
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.y = newY;
            this.x = newX;
        }
    }
    eat() {
        var emptyCells = this.chooseCell(3);
		var pred = emptyCells[Math.floor(Math.random() * emptyCells.length)]
 //       var pred =  Math.floor(Math.random() * super.chooseCell(3).length);
        if (predatorArr.length <= 0) {
            this.death()
        }
        else {
            if (pred) {
                var newX = pred[0];
                var newY = pred[1];
                matrix[newY][newX] = 4
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                for (var i in predatorArr) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
                this.energy++;
                if (this.energy >= 15) {
                    this.mul();
                    this.energy = 10;
                }
            }
            else {
                this.move()
            }
        }
    }
}
