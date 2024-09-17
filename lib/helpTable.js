require('colors');

class HelpTable {
    constructor(moves) {
        this.moves = moves;
    }

    generateTable() {
        const tableWidth = 12; // Cell width for uniformity

        // Helper function to format the text in a cell with fixed width
        const formatCell = (text) => {
            const paddedText = text.padEnd(tableWidth, ' '); // Add padding to each cell
            return paddedText;
        };

        // Helper function to create horizontal separator line
        const createLine = (columns) => {
            return '+'.concat('-'.repeat(tableWidth).concat('+').repeat(columns));
        };

        // Print the top border of the table
        console.log(createLine(this.moves.length + 1)); // +1 for the extra header column

        // Print the header row
        let headerRow = '|'.grey + formatCell(' ').grey; // Empty top-left cell
        this.moves.forEach(move => {
            headerRow += formatCell(move).yellow + '|'.grey;
        });
        console.log(headerRow);
        console.log(createLine(this.moves.length + 1)); // Header separator

        // Printing the rows of the table
        for (let i = 0; i < this.moves.length; i++) {
            let row = '|'.grey + formatCell(this.moves[i]).cyan + '|'.grey; // Row label
            for (let j = 0; j < this.moves.length; j++) {
                let cellText;
                if (i === j) {
                    cellText = 'Draw'.blue;
                } else {
                    const half = Math.floor(this.moves.length / 2);
                    const difference = (j - i + this.moves.length) % this.moves.length;
                    cellText = difference <= half ? 'Win'.green : 'Lose'.red;
                }
                row += formatCell(cellText) + '|'.grey; // Append formatted cell
            }
            console.log(row); // Printing row
            console.log(createLine(this.moves.length + 1)); // Separator after each row
        }
    }
}

module.exports = HelpTable;



