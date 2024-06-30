document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#nextNumberBtn').addEventListener('click', callNextNumber);
    document.querySelector('.button-reset').addEventListener('click', resetGame);
    document.querySelector('button[onclick="initializeGame()"]').addEventListener('click', initializeGame);

    const socket = io();

    socket.on('gameStateUpdated', (data) => {
        updateUpcomingNumbers(data.numbers, data.calledNumbers);
        updateCalledNumbers(data.calledNumbers);
    });

    fetchNumbers();
});

async function initializeGame() {
    const boardSize = parseInt(document.querySelector('#totalBalls').value);
    try {
        const response = await fetch('/api/initialize-game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ boardSize })
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        updateUpcomingNumbers(data.numbers, data.calledNumbers);
        updateCalledNumbers(data.calledNumbers);
    } catch (error) {
        console.error('Error initializing game:', error);
    }
}

async function callNextNumber() {
    try {
        const response = await fetch('/api/call-number', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        updateUpcomingNumbers(data.numbers, data.calledNumbers);
        updateCalledNumbers(data.calledNumbers);
    } catch (error) {
        console.error('Error calling next number:', error);
    }
}

async function resetGame() {
    try {
        const response = await fetch('/api/reset-game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        updateUpcomingNumbers(data.numbers, data.calledNumbers);
        updateCalledNumbers(data.calledNumbers);
    } catch (error) {
        console.error('Error resetting game:', error);
    }
}

function updateUpcomingNumbers(numbers, calledNumbers) {
    const upcomingNumbers = numbers.slice(calledNumbers.length);
    const list = document.querySelector('#upcomingNumbers');
    list.innerHTML = '';
    upcomingNumbers.forEach(number => {
        const listItem = document.createElement('li');
        listItem.textContent = number;
        list.appendChild(listItem);
    });
}

function updateCalledNumbers(calledNumbers) {
    const list = document.querySelector('#calledNumbers');
    list.innerHTML = '';
    calledNumbers.forEach(number => {
        const listItem = document.createElement('li');
        listItem.textContent = number;
        listItem.classList.add('called');
        list.appendChild(listItem);
    });
}

async function fetchNumbers() {
    try {
        const response = await fetch('/api/numbers');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        updateUpcomingNumbers(data.numbers, data.calledNumbers);
        updateCalledNumbers(data.calledNumbers);
    } catch (error) {
        console.error('Error fetching numbers:', error);
    }
}
