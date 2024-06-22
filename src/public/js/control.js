document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#nextNumberBtn').addEventListener('click', callNextNumber);
    document.querySelector('.button-reset').addEventListener('click', resetGame);
    document.querySelector('button[onclick="initializeGame()"]').addEventListener('click', initializeGame);
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
        console.log('Game initialized:', data);
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
        console.log('Next number called:', data);
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
        console.log('Game reset:', data);
    } catch (error) {
        console.error('Error resetting game:', error);
    }
}
