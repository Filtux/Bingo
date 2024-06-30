// src/js/api.js

export async function initializeGameApi(totalBalls) {
    try {
        const response = await fetch('/api/initialize-game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ boardSize: totalBalls })
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error initializing game:', error);
        throw error;
    }
}

export async function callNextNumberApi() {
    try {
        const response = await fetch('/api/call-number', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error calling next number:', error);
        throw error;
    }
}

export async function resetGameApi() {
    try {
        const response = await fetch('/api/reset-game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error resetting game:', error);
        throw error;
    }
}

export async function fetchNumbersApi() {
    try {
        const response = await fetch('/api/numbers');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching numbers:', error);
        throw error;
    }
}
