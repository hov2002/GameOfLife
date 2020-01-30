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
    // death() {
    //     matrix[this.y][this.x] = 0;
    //     for (var i in cavalierArr) {
    //         if (this.x == cavalierArr[i].x && this.y == cavalierArr[i].y) {
    //             cavalierArr.splice(i, 1);
    //             break;
    //         }
    //     }
    // }
    // mul() {
    //     var newCell = Math.floor(Math.random() * Math.floor(this.chooseCell(0)));
    //     if (newCell) {
    //         var newX = newCell[0];
    //         var newY = newCell[1];
    //         var pred = new Cavalier(newX, newY, this.index);
    //         cavalierArr.push(pred)
    //         matrix[newY][newX] = this.index;
    //     }
    // }
    // move() {
    //     var newCell = Math.floor(Math.random() * Math.floor(this.chooseCell(0)));
    //     this.energy--;
    //     if (newCell) {
    //         var newX = newCell[0];
    //         var newY = newCell[1];
    //         matrix[this.y][this.x] = 0;
    //         matrix[newY][newX] = this.index;
    //         this.y = newY;
    //         this.x = newX;
    //     }
    // }
    eat() {
        var pred = Math.floor(Math.random() * Math.floor(this.chooseCell(3)));
        // if (predatorArr.length <= 0) {
        //     this.death()
        // }
        // else {
            if (pred) {
                var newX = pred[0];
                var newY = pred[1];
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
            //}
            // else {
            //     this.move()
            // }
        }
    }


}
