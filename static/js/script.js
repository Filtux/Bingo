let numbersToBeCalled = [];
let numbersCalled = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeBingo(75);  // Set up the game with 75 balls
    document.querySelector('#nextNumberBtn').addEventListener('click', callNextNumber); // Changed to querySelector
});


function initializeBingo(totalBalls) {
    numbersToBeCalled = Array.from({ length: totalBalls }, (_, i) => i + 1);
    numbersCalled = [];
    createGrid(totalBalls);
    shuffleArray(numbersToBeCalled);
}

function createGrid(totalBalls) {
    totalBalls = parseInt(document.querySelector('#totalBalls').value); // Retrieve totalBalls from input
    numbersToBeCalled = Array.from({ length: totalBalls }, (_, i) => i + 1);
    const grid = document.querySelector('#bingoGrid'); // Changed to querySelector
    grid.innerHTML = '';  // Clear existing content
    for (let i = 1; i <= totalBalls; i++) {
        const cell = document.createElement('div');
        cell.classList.add('bingo-cell');
        cell.setAttribute('id', `cell-${i}`); // Set unique ID for each cell
        const content = document.createElement('div');
        content.className = 'content';
        content.textContent = i;
        cell.appendChild(content);
        grid.appendChild(cell);
    }
    shuffleArray(numbersToBeCalled)
    updateDisplay();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function resetGame() {
    numbersToBeCalled = Array.from({ length: totalBalls }, (_, i) => i + 1); // Reset numbers to be called
    numbersCalled = []; // Clear called numbers
    createGrid(totalBalls); // Recreate the grid with 75 cells
    updateDisplay();
}

function updateDisplay() {
    const display = document.querySelector('.number-display'); // Changed to querySelector
    display.textContent = numbersToBeCalled.length > 0 ? numbersToBeCalled[0] : 'All numbers called!';
}

function callNextNumber() {
    if (numbersToBeCalled.length > 0) {
        let nextNumber = numbersToBeCalled.shift();  // Remove the first number from the array
        numbersCalled.push(nextNumber);  // Add it to the called numbers array
        updateUI(nextNumber);  // Update the UI to show the number has been called
        updateDisplay();
    } else {
        alert("All numbers have been called!");
    }
}

function updateUI(number) {
    const cell = document.querySelector(`#cell-${number}`);
    if (cell) {
        cell.classList.add('selected');
    }
}

document.querySelector('#bingoGrid').addEventListener('click', function(event) {
    if (event.target.classList.contains('bingo-cell')) {
        event.target.classList.toggle('selected');
    }
});
