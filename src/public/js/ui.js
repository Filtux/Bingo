// src/js/ui.js

export function updateUpcomingNumbers(numbers, calledNumbers) {
    console.log('Updating upcoming numbers');
    const upcomingNumbers = numbers.slice(calledNumbers.length);
    const list = document.querySelector('#upcomingNumbers');
    list.innerHTML = '';
    upcomingNumbers.forEach(number => {
        const listItem = document.createElement('li');
        listItem.textContent = number;
        list.appendChild(listItem);
    });
}

export function updateCalledNumbers(calledNumbers) {
    console.log('Updating called numbers');
    const list = document.querySelector('#calledNumbers');
    list.innerHTML = '';
    calledNumbers.forEach(number => {
        const listItem = document.createElement('li');
        listItem.textContent = number;
        listItem.classList.add('called');
        list.appendChild(listItem);
    });
}

export function updateStatus(totalBalls, ballsDrawn, ballsDrawnInSection) {
    console.log('Updating status');
    const ballsRemaining = totalBalls - ballsDrawn;
    document.querySelector('#ballsRemaining').textContent = ballsRemaining >= 0 ? ballsRemaining : 0;
    document.querySelector('#ballsDrawn').textContent = ballsDrawn;
    document.querySelector('#ballsDrawnInSection').textContent = ballsDrawnInSection;
}

export function disableNextNumberButton() {
    document.querySelector('#nextNumberBtn').disabled = true;
}

export function enableNextNumberButton() {
    document.querySelector('#nextNumberBtn').disabled = false;
}
