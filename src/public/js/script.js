let numbersToBeCalled = [];
let numbersCalled = [];
let totalBalls = 0;

document.addEventListener('DOMContentLoaded', function() {
    const socket = io();

    socket.on('gameStateUpdated', (data) => {
        numbersToBeCalled = data.numbers;
        numbersCalled = data.calledNumbers;
        if (totalBalls !== data.numbers.length) {
            totalBalls = numbersToBeCalled.length; // Update totalBalls if it changes
            createGrid(totalBalls);
        }
        highlightCalledNumbers(numbersCalled);
    });

    fetchNumbers();
});

async function fetchNumbers() {
    try {
        const response = await fetch('/api/numbers');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        numbersToBeCalled = data.numbers;
        numbersCalled = data.calledNumbers;
        if (totalBalls === 0) {
            totalBalls = numbersToBeCalled.length;
            createGrid(totalBalls);
        }
        highlightCalledNumbers(numbersCalled);
    } catch (error) {
        console.error('Error fetching numbers:', error);
    }
}

function createGrid(totalBalls) {
    const grid = document.querySelector('#bingoGrid');
    grid.innerHTML = '';
    for (let i = 1; i <= totalBalls; i++) {
        const cell = document.createElement('div');
        cell.classList.add('bingo-cell');
        cell.setAttribute('id', `cell-${i}`);
        const content = document.createElement('div');
        content.className = 'content';
        content.textContent = i;
        cell.appendChild(content);
        grid.appendChild(cell);
    }
}

function highlightCalledNumbers(calledNumbers) {
    const cells = document.querySelectorAll('.bingo-cell');
    cells.forEach(cell => {
        const number = parseInt(cell.textContent);
        if (calledNumbers.includes(number)) {
            cell.classList.add('selected');
        } else {
            cell.classList.remove('selected');
        }
    });
}