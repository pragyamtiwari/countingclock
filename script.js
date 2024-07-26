let currentPrice = 100;
const minPrice = 50;
const maxPrice = 100;
const decrementPerTick = 1;
let clockInterval;

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const clockContainer = document.getElementById('clockContainer');
const priceDisplay = document.getElementById('price');
const message = document.getElementById('message');
const messageText = document.getElementById('messageText');
const finalPriceContainer = document.getElementById('finalPriceContainer');
const finalPrice = document.getElementById('finalPrice');
const hourHand = document.getElementById('hourHand');

function updateClock() {
    if (currentPrice > 0) {
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
    clockContainer.classList.remove('hidden');
    stopButton.classList.remove('hidden');
    startButton.classList.add('hidden');
    clockInterval = setInterval(updateClock, 100); // Adjust the speed as needed
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
