const quotes = [
    "The best way to predict the future is to invent it. – Alan Kay",
    "Do what you can, with what you have, where you are. – Theodore Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "Keep your face always toward the sunshine—and shadows will fall behind you. – Walt Whitman"
];

function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteElement = document.getElementById('quote');
    quoteElement.style.opacity = 0;

    setTimeout(() => {
        quoteElement.innerText = quotes[randomIndex];
        quoteElement.style.opacity = 1;
    }, 300);
}
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Add this to an event listener if you want a button for toggling
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

function shareQuote() {
    const quoteText = document.getElementById('quote').innerText;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText)}`;
    window.open(shareUrl, '_blank');
}