require('colors'); 

class GameRules {
    constructor(moves) {
        this.moves = moves;
        this.moveCount = moves.length;
    }

    determineWinner(playerMove, computerMove) {
        if (playerMove === computerMove) return 0;
        const half = Math.floor(this.moveCount / 2);
        const playerIndex = this.moves.indexOf(playerMove);
        const computerIndex = this.moves.indexOf(computerMove);
        const difference = (computerIndex - playerIndex + this.moveCount) % this.moveCount;
        return difference <= half ? -1 : 1;
    }

    displayMoves() {
        console.log("Available moves:".green);
        this.moves.forEach((move, index) => console.log(`${(index + 1).toString().yellow} - ${move}`.cyan));
        console.log("0 - exit".red);
        console.log("? - help".magenta);
    }
}

module.exports = GameRules;
