const fs = require('fs');
const path = require('path');
const gameStatePath = path.join(__dirname, '../../gameState.json');

let gameState = {
    numbers: [],
    calledNumbers: []
};

function saveGameState() {
    fs.writeFileSync(gameStatePath, JSON.stringify(gameState, null, 2)); // Pretty-print JSON with 2-space indentation
}

function loadGameState() {
    if (fs.existsSync(gameStatePath)) {
        try {
            const data = fs.readFileSync(gameStatePath, 'utf8');
            if (data) {
                gameState = JSON.parse(data);
            } else {
                saveGameState(); // Initialize the file if it's empty
            }
        } catch (error) {
            console.error('Error reading gameState.json:', error);
            saveGameState(); // Initialize the file if it's invalid
        }
    } else {
        saveGameState(); // Initialize the file if it doesn't exist
    }
}

loadGameState();

exports.initializeGame = (req, res) => {
    const { boardSize } = req.body;
    gameState.numbers = Array.from({ length: boardSize }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    gameState.calledNumbers = [];
    saveGameState();
    const io = req.app.get('io');
    io.emit('gameStateUpdated', gameState); // Emit event
    res.json(gameState); // Use res.json to ensure the response is in JSON format
};

exports.getNumbers = (req, res) => {
    res.json(gameState); // Use res.json
};

exports.callNumber = (req, res) => {
    if (gameState.numbers.length > 0) {
        const nextNumber = gameState.numbers[gameState.calledNumbers.length];
        gameState.calledNumbers.push(nextNumber);
        saveGameState();
        const io = req.app.get('io');
        io.emit('gameStateUpdated', gameState); // Emit event
    }
    res.json(gameState); // Use res.json
};

exports.getCalledNumbers = (req, res) => {
    res.json(gameState.calledNumbers); // Use res.json
};

exports.getUpcomingNumbers = (req, res) => {
    const upcomingNumbers = gameState.numbers.slice(gameState.calledNumbers.length);
    res.json(upcomingNumbers); // Use res.json
};

exports.resetGame = (req, res) => {
    gameState.numbers = [];
    gameState.calledNumbers = [];
    saveGameState();
    const io = req.app.get('io');
    io.emit('gameStateUpdated', gameState); // Emit event
    res.json(gameState); // Use res.json
};
