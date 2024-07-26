let currentPrice;
let minPrice;
let maxPrice;
let decrementPerTick = 1;
let clockInterval;

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const restartButton = document.getElementById('restartButton');
const clockContainer = document.getElementById('clockContainer');
const priceDisplay = document.getElementById('price');
const message = document.getElementById('message');
const messageText = document.getElementById('messageText');
const finalPriceContainer = document.getElementById('finalPriceContainer');
const finalPrice = document.getElementById('finalPrice');
const hourHand = document.getElementById('hourHand');

function updateClock() {
    if (currentPrice > minPrice) {
        currentPrice -= decrementPerTick;
        priceDisplay.innerText = `Price: $${currentPrice}`;
        let rotation = ((currentPrice / maxPrice) * 360) % 360;
        hourHand.setAttribute('transform', `rotate(${rotation}, 50, 50)`);
    }
    if (currentPrice <= minPrice) {
        clearInterval(clockInterval);
        priceDisplay.innerText = `Price: $${minPrice}`;
        stopButton.disabled = true;
        messageText.innerText = 'Sorry, the auction is no longer available.';
        finalPriceContainer.style.display = 'none';
        message.classList.remove('hidden');
        message.classList.add('sorry');
    }
}

startButton.addEventListener('click', () => {
    maxPrice = parseInt(document.getElementById('maxPriceInput').value);
    minPrice = parseInt(document.getElementById('minPriceInput').value);
    currentPrice = maxPrice;
    priceDisplay.innerText = `Price: $${currentPrice}`;
    clockContainer.classList.remove('hidden');
    stopButton.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    startButton.classList.add('hidden');
    clockInterval = setInterval(updateClock, 100);
});

stopButton.addEventListener('click', () => {
    if (currentPrice > minPrice) {
        clearInterval(clockInterval);
        finalPrice.innerText = currentPrice;
        messageText.innerText = 'Congratulations!';
        finalPriceContainer.style.display = 'inline';
        message.classList.remove('hidden');
        message.classList.remove('sorry');
    } else {
        alert('The auction has ended, the sofa is no longer available at this price.');
    }
});

restartButton.addEventListener('click', () => {
    clearInterval(clockInterval);
    startButton.classList.remove('hidden');
    clockContainer.classList.add('hidden');
    stopButton.classList.add('hidden');
    restartButton.classList.add('hidden');
    message.classList.add('hidden');
    message.classList.remove('sorry');
});
