let LivingCreature = require('./LivingCreature')

module.exports = class Fly extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index)
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
    
    
    move() {
        // var emptyCells1 = super.chooseCell(0);
        // var emptyCells2 = super.chooseCell(1);
        // var emptyCells = emptyCells1.concat(emptyCells2)
        
        var emptyCells = super.chooseCell(1)
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.y = newY;
            this.x = newX;
        }

    }

    death() {
        matrix[this.y][this.x] = 6;
        for (var i in flyArr) {
            if (this.x == flyArr[i].x && this.y == flyArr[i].y) {
                flyArr.splice(i, 1);
                break;
            }
        }
    }    
    snap() {

        var emptyCells = this.chooseCell(4);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            for (var i in cavalierArr) {
                if (newX == cavalierArr[i].x && newY == cavalierArr[i].y) {
                    cavalierArr.splice(i, 1);
                    break;
                }
            }    
              this.death()
        }
  
        else {
            this.move()
        }

    }
}