function validateArguments(args) {
    if (args.length < 3 || args.length % 2 === 0) {
        console.error("Error: You must provide an odd number of moves (at least 3).".red);
        process.exit(1);
    }
    const uniqueArgs = new Set(args);
    if (uniqueArgs.size !== args.length) {
        console.error("Error: Moves should be unique.".red);
        process.exit(1);
    }
}

module.exports = validateArguments;
