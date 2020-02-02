let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature {

    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  //      var newCell = Math.floor(Math.random() * super.chooseCell(0).length) ;
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], 1);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}
