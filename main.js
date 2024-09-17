const prompt = require('prompt-sync')(); 
const KeyGenerator = require('./lib/keyGenerator');
const HMACGenerator = require('./lib/hmacGenerator');
const GameRules = require('./lib/gameRules');
const HelpTable = require('./lib/helpTable');
const validateArguments = require('./validate');

// Command-line input processing
const args = process.argv.slice(2);
validateArguments(args);

function playGame(moves) {
    const key = KeyGenerator.generateKey();
    const gameRules = new GameRules(moves);
    const computerMove = moves[Math.floor(Math.random() * moves.length)];
    const hmac = HMACGenerator.generateHMAC(key, computerMove);

    console.log(`HMAC: ${hmac}`.blue);
    gameRules.displayMoves();

    let playerMove;
    while (true) {
        const input = prompt("Enter your move: ").trim();
        if (input === '0') {
            console.log("Goodbye!".green);
            return;
        } else if (input === '?') {
            const helpTable = new HelpTable(moves);
            helpTable.generateTable();
            gameRules.displayMoves();
        } else if (!isNaN(input) && parseInt(input) > 0 && parseInt(input) <= moves.length) {
            playerMove = moves[parseInt(input) - 1];
            break;
        } else {
            console.log("Invalid input. Please try again.".red);
            gameRules.displayMoves();
        }
    }

    console.log(`Your move: ${playerMove}`.cyan);
    console.log(`Computer move: ${computerMove}`.cyan);

    const result = gameRules.determineWinner(playerMove, computerMove);
    if (result === 0) {
        console.log("It's a draw!".yellow);
    } else if (result === 1) {
        console.log("You win!".green);
    } else {
        console.log("You lose!".red);
    }

    console.log(`HMAC key: ${key}`.magenta);
}

playGame(args);
