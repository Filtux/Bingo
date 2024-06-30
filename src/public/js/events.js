// src/js/events.js

import { callNextNumberApi, initializeGameApi, resetGameApi, fetchNumbersApi } from './api.js';
import { updateUpcomingNumbers, updateCalledNumbers, updateStatus, disableNextNumberButton, enableNextNumberButton } from './ui.js';

export function setupEventListeners() {
    document.querySelector('#nextNumberBtn').addEventListener('click', callNextNumber);
    document.querySelector('#setSectionBtn').addEventListener('click', setSection);
    document.querySelector('.button-reset').addEventListener('click', resetGame);
    document.querySelector('button[onclick="initializeGame()"]').addEventListener('click', initializeGame);
}

let totalBalls = 75;
let ballsDrawn = 0;
let ballsDrawnInSection = 0;
let sectionLimit = 0;

async function initializeGame() {
    console.log('Initializing game');
    totalBalls = parseInt(document.querySelector('#totalBalls').value);
    ballsDrawn = 0;
    ballsDrawnInSection = 0;
    sectionLimit = 0; // Default to no sections
    updateStatus(totalBalls, ballsDrawn, ballsDrawnInSection);
    enableNextNumberButton();

    try {
        const data = await initializeGameApi(totalBalls);
        updateUpcomingNumbers(data.numbers, data.calledNumbers);
        updateCalledNumbers(data.calledNumbers);
    } catch (error) {
        console.error('Error initializing game:', error);
    }
}

async function callNextNumber() {
    console.log('Calling next number');
    
    // Check if all numbers have been drawn
    if (ballsDrawn >= totalBalls) {
        return; // Do nothing
    }

    // Check if the section limit has been reached
    if (sectionLimit > 0 && ballsDrawnInSection >= sectionLimit) {
        disableNextNumberButton();
        return; // Do nothing
    }

    try {
        const data = await callNextNumberApi();
        updateUpcomingNumbers(data.numbers, data.calledNumbers);
        updateCalledNumbers(data.calledNumbers);

        ballsDrawn++;
        ballsDrawnInSection++;
        if (sectionLimit > 0 && ballsDrawnInSection >= sectionLimit) {
            disableNextNumberButton();
        }
        updateStatus(totalBalls, ballsDrawn, ballsDrawnInSection);
    } catch (error) {
        console.error('Error calling next number:', error);
    }
}

function setSection() {
    console.log('Setting section');
    sectionLimit = parseInt(document.querySelector('#sectionBalls').value);
    ballsDrawnInSection = 0; // Reset the section count
    enableNextNumberButton();
    updateStatus(totalBalls, ballsDrawn, ballsDrawnInSection);
}

async function resetGame() {
    console.log('Resetting game');
    try {
        const data = await resetGameApi();
        updateUpcomingNumbers(data.numbers, data.calledNumbers);
        updateCalledNumbers(data.calledNumbers);

        ballsDrawn = 0;
        ballsDrawnInSection = 0;
        sectionLimit = 0; // Reset to no sections
        updateStatus(totalBalls, ballsDrawn, ballsDrawnInSection);
        enableNextNumberButton();
    } catch (error) {
        console.error('Error resetting game:', error);
    }
}

export async function fetchNumbers() {
    console.log('Fetching numbers');
    try {
        const data = await fetchNumbersApi();
        updateUpcomingNumbers(data.numbers, data.calledNumbers);
        updateCalledNumbers(data.calledNumbers);
    } catch (error) {
        console.error('Error fetching numbers:', error);
    }
}
